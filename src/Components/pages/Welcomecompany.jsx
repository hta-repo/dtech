import React from 'react'
 
 import logo from "./logo.png";
import building from "./building.png";
export default function Welcomecompany() {
  return (
    <div>
         <section   className="text-gray-600 body-font bg-11 lg:h-[100vh] bg-banner ">
        <div   className="container px-5 py-4 mx-auto">
          <div   className="flex flex-wrap -mx-4 -mb-10 text-center lg:gap-8">
            <div   className="lg:w-[44%] md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-1  lg-w-[43%] lg:h-[92vh] bg-white">
              <h1
                  className="  text-[#005125] text-lg   lg:mt-[3rem] mont-serif relative lg:bottom-11"
                style={{ Letterspacing: "2%", fontSize: "28px" }}
              >
                Welcome to 10X Raabit !
              </h1>

              <div   className="flex flex-col justify-center lg:gap-[14px] lg:mt-[-2.9rem]">
                <h1     className="sm:text-3xl text-2xl  title-font mb-4  text-[#005125] mont-serif font-bold mt-[2rem]">
                  Tagline / Slogan for Website
                </h1>
                <div   className="lg:w-[64vh] lg:mx-auto">
                  <p     className="leading-relaxed text-lg lg:text-[14px]  text-[#005125] mont-serif ">
                    Register now to become part of a dynamic network of
                    companies, engage with communities and partake in ongoing
                    events
                  </p>
                </div>
              </div>
              {/* buttons below  */}

              <div   className="container mx-auto flex justify-center align-middle flex-col lg:gap-8 lg:mt-[2rem]" style={{alignItems:"center"}}>
                <img
                    className="rounded-lg  mx-auto object-cover lg:h-[7rem] w-[auto]"
                  src={building}
                  alt=''
                />

                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                    className="mont-serif lg:w-[48%] text-black  bg-[#dcdcdc52] border-0 lg:p-[14px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg"
                >
                  Register as a Company
                </button>
              </div>

              <div
                  className="forgot-password flex flex-col gap-3 justify-center  lg:mt-[4rem]"
                style={{ alignItems: "center" }}
              >
                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                    className=" mont-serif text-black button-1 border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[56%]"
                >
                 Proceed
                </button>

                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                    className="mont-serif lg:w-[56%] text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg"
                >
                  Continue as Guest
                </button>
              </div>
            </div>

            {/* flex-2  */}
            <div   className="sm:w-1/2  px-4 bg-[#00000012] lg:p-[14px]">
              <div   className="flex flex-row justify-end gap-2">
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
                <h1     className="text-white text-lg font-semibold lg:mt-20   relative lg:bottom-11 mont-serif">
                  {" "}
                  10X Raabit
                </h1>

                <div   className="container mx-auto">
                  <img
                      className="rounded-lg shadow-lg mx-auto object-cover lg:h-[15rem] w-[auto]"
                    src={logo}
                    alt="ExampleImage"
                  />
                </div>
              </div>

              <div
                  className="forgot-password flex flex-col gap-3 justify-center  lg:mt-[8.9rem]"
                style={{ alignItems: "center" }}
              >
                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                    className=" lg:w-[278px]  mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg "
                >
                  App store
                </button>

                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                    className=" lg:w-[278px]   mont-serif  text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg"
                >
                  Google play
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
