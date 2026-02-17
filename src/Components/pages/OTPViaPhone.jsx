import React from "react";

import logo from "./logo.png";
import { Link } from "react-router-dom";
export default function OTPViaPhone() {
  return (
    <>
      {/* forgot password scrren for mobile no  dcreen no 2  */}

      <section className="text-gray-600 body-font bg-11 h-[100vh] bg-banner">
        <div className="lg:container px-5 py-4 lg:mx-auto">
          <div className="flex flex-wrap -mx-4 -mb-8 text-center lg:gap-8">
            <div className="xs:relative xs:top-[6rem] lg:w-[44%] md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-1  lg-w-[43%] lg:h-[92vh] bg-white">
              <h2 className="text-black text-lg font-semibold mb-2 lg:mt-[5rem] mont-serif relative lg:bottom-11">
                FORGOT PASSOWORD ?
              </h2>

              <div
                className="forgot-password flex flex-col gap-3 lg:gap-5 justify-center lg-mt-[15px] "
                style={{ alignItems: "center" }}
              >
                <Link to="/otp-via-email">
                  <button
                    className=" mont-serif text-black button-1 border-0 py-1 px-8 focus:outline-none  text-lg lg:w-[18rem] xs:w-[15rem]"
                    style={{ borderRadius: "11px", fontSize: "14px" }}
                  >
                    Get code via email
                  </button>
                </Link>
                <button
                  className="lg:w-[48%] text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg mont-serif xs:w-[15rem] button-1-hover"
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                >
                  Get code via SMS
                </button>
              </div>

              {/* phone input  */}
              <div className="relative lg:mt-[3rem] lg:top-[19px] xs:mt-9 xs:mb-6">
                <p className="relative float-left text-black mont-serif">
                  Enter your phone number
                </p>

                <input
                  type="text"
                  className="w-full   text-black mont-serif  border-b-2 bg-transparent
                  
                  
               text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* email input end  */}

              <div
                className="forgot-password flex flex-col gap-3 justify-center  lg:mt-28"
                style={{ alignItems: "center" }}
              >
                <Link to="/otp">
                  <button
                    style={{ borderRadius: "11px", fontSize: "14px" }}
                    className="xs:w-[15rem]  mont-serif text-black button-1 border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[18rem]"
                  >
                    Get code
                  </button>
                </Link>
                <Link to="/">
                  <button
                    style={{ borderRadius: "11px", fontSize: "14px" }}
                    className="mont-serif lg:w-[18rem] text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md xs:w-[15rem] shadow-lg button-1-hover"
                  >
                    Go back
                  </button>
                </Link>
              </div>
            </div>

            {/* flex-2  */}
            <div className="xs:hidden lg:block sm:w-1/2  px-4 bg-[#00000012] lg:p-[14px]">
              <div className="flex flex-row justify-end gap-2">
                <button
                  style={{ borderRadius: "6px", fontSize: "14px" }}
                  className="mont-serif border  text-white   lg:w-[9rem] lg:p-[2px] focus:outline-none text-lg drop-shadow-md shadow-lg"
                >
                  Contact us
                </button>
                {/*  */}
                <button
                  style={{ borderRadius: "6px", fontSize: "14px" }}
                  className="mont-serif bg-green-800  text-white border-0  lg:w-[9rem] lg:p-[2px] rounded text-lg drop-shadow-md shadow-lg"
                >
                  Login
                </button>
              </div>

              <div
                className="flex flex-col justofy-center align-middle"
                style={{ alignItems: "center" }}
              >
                <h1 className="text-white text-lg font-semibold lg:mt-20   relative lg:bottom-11 mont-serif">
                  {" "}
                  10X Raabit
                </h1>

                <div className="container mx-auto">
                  <img
                    className="rounded-lg shadow-lg mx-auto object-cover lg:h-[15rem] w-[auto]"
                    src={logo}
                    alt=""
                  />
                </div>
              </div>

              <div
                className="forgot-password flex flex-col gap-3 justify-center  lg:mt-[6rem]"
                style={{ alignItems: "center" }}
              >
                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                  className=" lg:w-[278px]  mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg button-1-hover"
                >
                  App store
                </button>

                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                  className=" lg:w-[278px]  mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg button-1-hover"
                >
                  Google play
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
