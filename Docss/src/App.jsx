import TextEditor from "./TextEditor"
import {
  BrowserRouter as Router,
  Route,

} from "react-router-dom"
import { Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"


import { v4 as uuidV4 } from "uuid"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/document/${uuidV4()}`} replace />} >
        </Route>
        <Route path="/document/:id" element={ <TextEditor /> }>
        </Route>
      </Routes>
    </Router>
  )
}

export default App


