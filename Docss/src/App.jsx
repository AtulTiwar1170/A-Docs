import TextEditor from "./pages/TextEditor";
import {
  BrowserRouter as Router,Routes, Route,
} from "react-router-dom";

import { Navigate } from "react-router-dom";


import { v4 as uuidV4 } from "uuid";
import DocumentView from "./pages/DocumentView";
import Home from "./pages/Home";

function App() {
  return (

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/editor"
            element={<Navigate to={`/document/${uuidV4()}`} replace />}
          ></Route>
          <Route path="/document/:id" element={<TextEditor />}></Route>
          <Route path="/document-view" element={<DocumentView />} />
        </Routes>


  );
}

export default App;
