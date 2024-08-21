import React, { useCallback, useEffect, useState } from 'react'
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import "./Editor.css"
import { io } from "socket.io-client";
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';


const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTION = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

const TextEditor = () => {
    const { id: documentId } = useParams()
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const [expiryTime, setExpiryTime] = useState(0);




    useEffect(() => {
        const s = io("http://localhost:3000")
        setSocket(s);
        return () => {
            s.disconnect()
        }
    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return
        socket.once("load-document", document => {
            quill.setContents(document)
            quill.enable()
        })
        socket.emit("get-document", documentId);
    }, [socket, quill, documentId])

    useEffect(() => {
        if (socket == null || quill == null) return
        const handler = (delta) => {
            quill.updateContents(delta)
        }
        socket.on('receive-changes', handler);
        return () => {
            socket.off('receive-changes', handler);
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents());
        }, SAVE_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [socket, quill])


    useEffect(() => {
        if (socket == null || quill == null) return
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit('send-changes', delta)
        }
        quill.on('text-change', handler);
        return () => {
            quill.off('text-change', handler);
        }
    }, [socket, quill])


    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
        wrapper.innerHTML = ""
        const textEditor = document.createElement("div")
        wrapper.append(textEditor)
        const q = new Quill(textEditor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTION },
        })
        q.disable()
        q.setText("Loading...")
        setQuill(q);
    }, []);

    const handleDownload = () => {
        const data = quill.editor.delta.ops['0'].insert;
        const blob = new Blob([data], { type: 'text/plain' });
        saveAs(blob, 'documents.docs');
    }
    const handleShare = () => {
        setExpiryTime(new Date().getTime() + 60 * 60 * 1000)

        const genirateTocken = () => {
            const token = btoa(JSON.stringify({ exp: expiryTime }));
            return token;
        }
        const createShareLink = () => {
            const token = genirateTocken();
            const link = `${window.location.href}?token=${token}`;
            return link;
            
        }
        if (navigator.share) {
            const shareLink = createShareLink()
            navigator.share({
                url: shareLink,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            console.log('Web Share API not supported');
        }
    };
    const printPage = () => {
        window.print();
    }

    return (
        <>
            <div className="container" ref={wrapperRef}></div>
            <div className='download'>
                <button className='btn' onClick={handleDownload} >Save</button>
                <button className='btn' onClick={handleShare} >Give access</button>
                <button className='btn' onClick={printPage} >Print</button>
            </div>
        </>

    )
}

export default TextEditor