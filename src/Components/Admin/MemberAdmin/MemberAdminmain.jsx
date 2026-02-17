import React from "react";
import MemberListing from "./MemberListing";
import MonthlyReport from "./MonthlyReport";

function MemberAdminmain() {
  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center">
          <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px] ">
            Members
          </h1>
        </div>
        <div className="grid grid-cols-12 gap-[2rem] p-6">
          <div className="col-span-7 xs:col-span-12">
            <MemberListing />
          </div>
          <div className="col-span-5 xs:col-span-12">
            <MonthlyReport />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MemberAdminmain;
