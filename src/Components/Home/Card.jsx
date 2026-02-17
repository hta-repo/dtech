import React from "react";
import apple from "./apple.png";
function Card() {
  return (
    <>
      <div   className="p-4 lg:w-[256px]">
        <div   className="lg:h-[137px] bg-gray-900 bg-opacity-75 px-8 pt-[2rem] pb-24 rounded-lg overflow-hidden text-center relative intrest-card h-[137px] shadow-lg drop-shadow-md">
          <h5   className="text-[17px] text-[#005125] mont-serif font-extrabold relative lg:top-[80px] text-center text-bg bg-text right-[34px] w-[29vh]">
            <span> Apple</span>
          </h5>

          <img src={apple} alt="" style={{ marginTop: "-58px" }} />
        </div>
      </div>
    </>
  );
}

export default Card;
