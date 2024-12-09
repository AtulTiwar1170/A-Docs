import React, { useState, useRef } from "react";
import { Document, Page } from "react-pdf";

function DocumentViewer() {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const pdfRef = useRef(null);

    const onFileChange = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            setFile(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const onDocumentLoad = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handlePrint = () => {
        pdfRef.current.print();
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <Document
                file={file}
                onLoadError={() => alert("Error loading file.")}
                onLoadSuccess={onDocumentLoad}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} ref={pdfRef} />
                ))}
            </Document>
            <div>
                <button onClick={handlePreviousPage}>Previous</button>
                <span>
                    {pageNumber} of {numPages}
                </span>
                <button onClick={handleNextPage}>Next</button>
                <button onClick={handlePrint}>Print</button>
            </div>
        </div>
    );
}

export default DocumentViewer;