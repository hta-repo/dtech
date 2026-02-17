import React from "react";
import Homecard from "./Homecard";
import { useNavigate } from "react-router-dom";
// import Carousel from "../Carousel";
import bg from "./bg.png";
// import Intrestcard from "./Sparkintrest/Intrestcard";
import IntrestA from "./Sparkintrest/IntrestA";

//  Redux
import { useSelector } from "react-redux";

const g_obj = JSON.parse(localStorage.getItem("gameObj"));
const val = g_obj ? g_obj?.gamification : '';

export default function Homepage() {
  const navigate = useNavigate();
  const { loggedUserInfo } = useSelector((state) => state.auth);

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow p-4">
        <div className="grid grid-cols-12">
          <div className="col-span-6 xs:col-span-12">
            <h1 className="font-bold text-2xl text-green-700 mont-serif xs:text-center mb-5">
              Welcome, {loggedUserInfo?.name}
            </h1>
          </div>
          <div className="col-span-6 xs:col-span-12">
            <div className="flex justify-end gap-4">
              <button className="next xs:w-[11rem] xxl:w-[11rem] lg:w-[17rem] p-[7px]"
                onClick={() => {
                  navigate("/vision")
                }}
              >
                Vision
              </button>
              <button className="next xs:w-[11rem] xxl:w-[11rem] lg:w-[17rem] p-[7px]"
                onClick={() => {
                  navigate("/community")
                }}
              >
                Community
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: val ? "none" : "block" }}>
          <IntrestA />
          {/* <Intrestcard /> */}
        </div>
        <div className="mt-[2rem]">
          <Homecard bg={bg} />
        </div>
        <div className="w-[145vh] xs:w-[45vh] mx-auto xs:mt-8">
          {/* <Carousel title="Based on your interest" id="based_interest" /> */}
        </div>
        <div className="w-[145vh] xs:w-[45vh] mx-auto xs:mt-8 mb-6">
          {/* <Carousel title="See what's Popular" id="whats_popular" /> */}
        </div>
      </div>
    </main>
  );

}
