import React from "react";

import logo from "./logo.png";
import pending from "./timer.gif";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/welcomepage/logo-1.png";

export default function Pendingverification() {
  const navigate = useNavigate();
  const login = () => {
    navigate(`/`);
  };

  return (
    <>
      <section className="text-gray-600 body-font bg-11 bg-banner ">
        <div className="flex flex-row gap-[7rem] items-center lg:hidden">
          <img src={Logo} className="mt-4 ml-1" alt="" />
          <div className="flex flex-row gap-[5px]">
            <button
              onClick={login}
              style={{ borderRadius: "5px", fontSize: "14px" }}
              className="xs:w-[5rem] mont-serif text-black bg-white border-0  focus:outline-none rounded text-lg"
            >
              Login
            </button>
            <button
              style={{ borderRadius: "6px", fontSize: "14px" }}
              className="xs:w-[5rem] mont-serif text-black bg-white border-0  focus:outline-none rounded text-lg"
            >
              Contact us
            </button>
          </div>
        </div>
        <div className="lg:container px-5 py-7 lg:mx-auto">
          <div className="flex flex-wrap text-center lg:gap-8">
            <div className="lg:w-[44%] md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-1  lg-w-[43%] bg-white">
              <div className="flex flex-col justify-center lg:gap-[14px] lg:mt-[-2.9rem]">
                <h1
                  className="  text-[#005125] text-lg   lg:mt-[7rem] mont-serif relative lg:bottom-11"
                  style={{ Letterspacing: "2%", fontSize: "28px" }}
                >
                  Verification Pending
                </h1>
              </div>
              {/* buttons below  */}

              <div
                className="container mx-auto flex justify-center align-middle flex-col lg:gap-8 lg:mt-[1.5rem]"
                style={{ alignItems: "center" }}
              >
                <img
                  className="rounded-lg  mx-auto object-cover lg:h-[7rem] w-[auto]"
                  src={pending}
                  alt=""
                />

                <hr
                  className="border-dashed border-gainsboro"
                  style={{
                    border: "1px solid",
                    width: "109%",
                    borderStyle: "dashed",
                    borderColor: "gainsboro",
                  }}
                />

                <div>
                  <h1 className="sm:text-3xl text-2xl  title-font mb-4  text-[#005125] mont-serif font-bold mt-[17px]">
                    Thank you for your submission
                  </h1>
                </div>
                <div className="flex flex-col lg-mt-[-11px]">
                  <p className="text-green-700">
                    we have received your application
                  </p>
                  <p className="text-green-700">
                    Kindly wait for admin to approve your request
                  </p>
                </div>

                <Link to="/">
                  <button
                    style={{
                      borderRadius: "11px",
                      fontSize: "14px",
                      border: "1px solid",
                    }}
                    className="xs:mt-12 xs:w-[15rem] border-green-700 mont-serif text-black  border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[14rem] lg:mt-[15px] "
                  >
                    Go Back
                  </button>
                </Link>
              </div>
            </div>

            {/* flex-2  */}
            <div className="sm:w-1/2  px-4 bg-[#00000012] lg:p-[14px] xs:hidden">
              <div className="flex flex-row justify-end gap-2">
                <button
                  style={{ borderRadius: "6px", fontSize: "14px" }}
                  className="mont-serif border  text-white   lg:w-[9rem] lg:p-[2px] focus:outline-none text-lg drop-shadow-md shadow-lg"
                >
                  Contact us
                </button>
                {/*  */}
                <button onClick={login}
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
                    alt="   "
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
