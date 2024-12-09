import React from "react";

import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="bg-gradient-to-r from-black via-purple-500 to-black w-[100%] h-[38rem]">
        <div className="bg-gradient-to-t from-black via-transparent to-black  w-[100%] h-[38rem] flex items-center justify-center">
          <div className="space-y-7">
          <h1 className="font-bold Serif text-7xl text-white">Welcome to <br /> the A-Docs</h1>
          <p className=" text-2md font-serif text-white font-bold">This is a simple document editor with real-time collaboration capabilities.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
