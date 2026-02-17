import React from "react";
import imga from "./graphimage/ladder.png";
import imgb from "./graphimage/trophy.png";
import imgc from "./graphimage/pied.png";

function Leaderboardgraph() {
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-1">
        <div   className="col-span-1">
          <img src={imga} alt="FirstImage" className="tilt-in-fwd-tl xs:w-[80%] xs:mx-auto" />
        </div>

        <div className="col-span-2 grid grid-rows-2">
          <div>
            <img
              src={imgb}
              alt="SecondImage"
                className="rounded-md shadow-md drop-shadow-sm fade-in-top xs:mx-auto"
            />
          </div>
          <div>
            <img
              src={imgc}
              alt="ThirdImage"
                className="rounded-md shadow-md drop-shadow-sm fade-in-right xs:w-[84%] xl:w-[49%] xl:mt-[11px] xs:mx-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Leaderboardgraph;
