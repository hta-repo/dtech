import React from 'react'
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import Adminnav from "../Components/Admin/Adminnav";
// import AdminFooter from "../Components/Admin/Adminfooter";
// import AdminSearchbar from "../Components/Admin/AdminSearchbar";

export default function Admin() {
  return (
    <>
      <div className="lg:block xs:hidden">
        <AdminSidebar />
      </div>
      <div className="xs:block lg:hidden">
        <Adminnav />
      </div>
      {/* <div className="hidden lg:block">
        <header className=" header bg-white shadow py-4 px-4 ">
          <AdminSearchbar />
        </header>
      </div> */}
      <Outlet />
      {/* <AdminFooter /> */}
    </>
  )
}
