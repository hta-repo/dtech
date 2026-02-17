import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import SideMobile from "../Components/SideMobile";
import Footer from "../Components/Footer";
import Searchtab from "../Components/Searchtab";

function UserStructure({ currentToken }) {

  return (
    <>
      <div className="sm:hidden lg:block">
        <Sidebar firebaseToken={currentToken} />
      </div>

      <div className="lg:hidden sm:block">
        <SideMobile firebaseToken={currentToken} />
      </div>

      <header className="xs:hidden lg:block header bg-white shadow py-4 px-4 ">
        <Searchtab />
      </header>

      <Outlet />

      <Footer />
    </>
  )
}

export default UserStructure