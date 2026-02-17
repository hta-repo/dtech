import React from "react";
import guest from "../../../assets/guest.png";
import { Link } from "react-router-dom";

export default function GuestMain() {
  return (
    <>
      <div className="h-screen bg-banner bg-11">
        <div className="py-5 bg-white lg:w-[95%] lg:mx-auto xs:relative xs:top-[3rem] xs:bottom-[2rem] rounded-md relative lg:top-6 fade-in-left">
          <div className="--contet-text">
            <h4 className="text-[#005125] mont-serif text-center lg:text-[25px] font-semibold relative lg:top-[1.5rem] xs:top-[2rem] xs:text-[20px]">
              Welcome to 10X Raabit
            </h4>
            <p className="mont-serif text-[#005125] text-center lg:mt-[65px] text-[16px] font-semibold xs:mt-[2rem] xs:relative xs:top-[2rem]">
              In order to get the full experience of the app , kindly registerd
              as member and make payment
            </p>
          </div>

          <div className="--img lg:mt-4 fade-in-right">
            <img src={guest} className="mx-auto lg:h-[270px] xs:relative xs:top-[2rem]" alt="" />
          </div>
          <div className="--button-action--path xs:mt-[6rem]">
            <div
              className="forgot-password flex flex-col gap-3 justify-center lg:mt-[4rem] xs:mt-4"
              style={{ alignItems: "center" }}
            >
              <Link to="/guest-register">
                <button
                  className="xs:w-[15rem] mont-serif text-black button-1 border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[21rem]"
                  style={{ borderRadius: 11, fontSize: 14 }}
                >
                  Proceed to Registration
                </button>
              </Link>
              <Link to="/register-as">
                <button
                  className="xs:w-[15rem] border-green-700 mont-serif text-black  border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[21rem]"
                  style={{
                    borderRadius: 11,
                    fontSize: 14,
                    border: "1px solid",
                  }}
                >
                  Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
