import React, { useState } from "react";
import logo from "./logo.png";
import building from "./building.png";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/welcomepage/logo-1.png";

export default function RegisterAs() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);

    const registerButton = document.getElementById("registerButton");
    const proceedButton = document.getElementById("proceedButton");

    registerButton.classList.add("button-1");
    proceedButton.classList.add("button-1");
  };

  const handleRoute = () => {
    if (!isRegistered) {
      alert("Please register as a member first.");
    } else {
      navigate("/registration");
    }
  };

  const routelogin = () => {
    navigate(`/`);
  };

  return (
    <section className="text-gray-600 body-font bg-11 bg-banner ">
      <div className="flex flex-row gap-[7rem] items-center lg:hidden">
        <img src={Logo} className="mt-4 ml-1" alt="" />
        <div className="flex fle-row gap-[5px]">
          <button
            onClick={routelogin}
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
          <div className="fade-in-left lg:w-[44%] md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-1 lg-w-[43%] bg-white">
            <h1
              className="  text-[#005125] text-lg   lg:mt-[3rem] mont-serif relative lg:bottom-11"
              style={{ Letterspacing: "2%", fontSize: "28px" }}
            >
              Welcome to 10X Raabit !
            </h1>

            <div className="flex flex-col justify-center lg:gap-[14px] lg:mt-[-2.9rem]">
              <h1 className="sm:text-3xl text-2xl  title-font mb-4  text-[#005125] mont-serif font-bold mt-[2rem]">
                Tagline / Slogan for Website
              </h1>
              <div className="lg:w-[64vh] lg:mx-auto">
                <p className="leading-relaxed text-lg lg:text-[14px]  text-[#005125] mont-serif ">
                  Register now to become part of a dynamic network of
                  companies, engage with communities and partake
                </p>
              </div>
            </div>
            {/* buttons below  */}

            <div
              className="container mx-auto flex justify-center align-middle flex-col lg:gap-8 lg:mt-[2rem]"
              style={{ alignItems: "center" }}
            >
              <img
                className="rounded-lg  mx-auto object-cover lg:h-[6rem] w-[auto]"
                src={building}
                alt=""
              />

              <button
                id="registerButton"
                style={{ borderRadius: "11px", fontSize: "14px" }}
                className={`mont-serif  xs:w-[15rem]  xs:p-[7px]   lg:w-[48%] text-black border-0 lg:p-[14px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg button-1-hover ${isRegistered ? "button-1" : ""
                  }`}
                onClick={handleRegister}
              >
                Register as a member
              </button>
            </div>

            <div
              className="forgot-password flex flex-col gap-3 justify-center lg:mt-[3.5rem] xs:mt-7 xs:gap-4"
              style={{ alignItems: "center" }}
            >
              <button
                id="proceedButton"
                onClick={handleRoute}
                style={{ borderRadius: "11px", fontSize: "14px" }}
                className={` shadow-md  xs:p-[7px]   xs:w-[15rem] mont-serif text-black border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[56%] ${isRegistered ? "button-1" : ""
                  }`}
              >
                Proceed
              </button>
              <Link to="/a">

                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                  className="mont-serif   xs:p-[7px]  xs:w-[15rem] lg:w-[21rem] text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg button-1-hover"
                >
                  Continue as Guest
                </button>
              </Link>
            </div>
          </div>

          {/* flex-2  */}
          <div className="sm:w-1/2 px-4 lg:p-[14px] xs:hidden lg:block">
            <div className="flex flex-row justify-end gap-2">
              {/* <button
                style={{ borderRadius: "6px", fontSize: "14px" }}
                className="mont-serif border  text-white   lg:w-[9rem] lg:p-[2px] focus:outline-none text-lg drop-shadow-md shadow-lg"
              >
                Contact us
              </button> */}
              {/*  */}
              <button
                onClick={routelogin}
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
              <h1 className="text-white text-lg font-semibold lg:mt-20 relative lg:bottom-11 mont-serif">
                {" "}
                10X Raabit
              </h1>

              <div className="container mx-auto">
                <img
                  className="rounded-lg shadow-lg mx-auto object-cover lg:h-[15rem] w-[auto]"
                  src={logo}
                  alt="ExampleImage"
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
  );
}
