import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Routes, Route } from "react-router-dom";
import logout from "../assets/welcomepage/Logout.png"
import "../css/welcomepage.css"


import Sidebar from "./Sidebar";
import Homepage from "./Home/Homepage";
import Aboutus from "./Aboutus";

function HomeLayout() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      {/* modal logout content  */}
      {isModalOpen && (
        <div className=" fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[608px] h-full scale-in-center"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white flex flex-col items-center">
                <span onClick={toggleModal} className="relative left-[15rem] mt-[15px] text-[29px] cursor-pointer text-black" ><RxCross1 /></span>
                <div className="img">
                  <img src={logout} className="mx-auto h-[11rem] relative left-[12px]" alt="" />
                </div>
                <div className=" mont-serif text-2xl text-[#005125] text-center font-semibold  leading-relaxed mt-3">
                  Are You Sure You Want to logout
                  <br />
                  <span className="text-center"> From All devices</span>
                </div>
              </div>
              <div className=" lg:p-[40px] flex flex-col justify-center items-center bg-white mx-auto gap-2 ">
                <button

                  className="text-black mont-serif logout p-[6px] w-[16rem]"
                >
                  {" "}
                  Logout
                </button>
                <button
                  onClick={toggleModal}
                  className="text-black mont-serif cancel rounded-md p-[6px] w-[16rem]"
                >
                  {" "}
                  Cancel
                </button>
              </div>

              {/* <div className="bg-profile px-4 py-3 text-right">
                <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" >
                  <i className="fas fa-times" /> Cancel
                </button>
                <button type="button" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2">
                  <i className="fas fa-plus" /> Create
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
      {/* contrnt end  */}
      <div className="home-layout-a">
        <Sidebar toggleModal={toggleModal} />

        <div className="routes">

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/k" element={<Aboutus />} />
          </Routes>

        </div>
      </div>
    </>
  )
}

export default HomeLayout
