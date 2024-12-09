import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="sticky top-0 py-5 bg-[#F9F9FA] z-50 border-b-[2px]">
            <ul className="list-none flex justify-between items-center px-16 ">
                <li className="font-bold text-2xl font-serif ">A-Docs</li>
                <div className="flex gap-7">
                    <li className="text-md font-bold  hover:underline ">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-md font-bold  hover:underline ">
                        <Link to="/editor">Editor</Link>
                    </li>
                    <li className="text-md font-bold  hover:underline disabled:opacity-75 ">
                        <Link to="/document-view">Document View(optional)</Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
