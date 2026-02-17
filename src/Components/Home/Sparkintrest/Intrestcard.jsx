import React from "react";
// import React, { useState } from "react";
// import IntrestA from "./IntrestA";
// import IntrestB from "./IntrestB";
// import IntrestC from "./IntrestC";

function Intrestcard() {
  // const [activeComponent, setActiveComponent] = useState("IntrestA");

  // const handleNextClick = () => {
  //   if (activeComponent === "IntrestA") {
  //     setActiveComponent("IntrestB");
  //   } else if (activeComponent === "IntrestB") {
  //     setActiveComponent("IntrestC");
  //     let hide = document.getElementById("skip");
  //     hide.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       document.getElementById("intrest").style.display = "none";
  //     });
  //   }
  // };

  return (
    <>
      <div
        // id="intrest"
        // className="p-6 h-max intrest mt-3 lg:w-[99%] xs:min-h-max"
      // className=" h-[242px] xs:h-max  xxl:h-[221px] intrest mt-3 lg:w-[99%] xs:min-h-max  lg:mx-auto "
      >
        {/* <div className="flex lg:flex-row xs:flex-col lg:gap-[3rem] items-center  xxl:gap-[1rem]"> */}
        {/* {activeComponent === "IntrestA" && <IntrestA />}
        {activeComponent === "IntrestB" && <IntrestB />}
        {activeComponent === "IntrestC" && <IntrestC />}
        {(activeComponent === "IntrestB" ||
          activeComponent === "IntrestC") && (
            <div className="hidden">
              {activeComponent === <IntrestA />}
              {activeComponent === "IntrestB" && <IntrestA />}
              {activeComponent === "IntrestC" && <IntrestB />}
            </div>
          )} */}

        {/* <div
            className="flex flex-col gap-2 relative top-[1rem] xs:mb-[3rem] ms:mt-[1rem]"
            id="button"
            onClick={handleNextClick}
          >
            <button className=" xs:w-[11rem]  xxl:w-[11rem] lg:w-[17rem] p-[7px] bg-default border-md">
              Skip
            </button>
            <button
              className="next xs:w-[11rem] xxl:w-[11rem]  lg:w-[17rem] p-[7px]"
              onClick={handleNextClick}
              id="skip"
            >
              Next
            </button>
          </div> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default Intrestcard;
