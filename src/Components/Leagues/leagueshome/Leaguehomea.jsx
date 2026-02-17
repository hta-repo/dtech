import React from "react";
import { useNavigate } from "react-router-dom";
import LeagueCount from "./LeagueCount";

// Redux
import { useSelector } from "react-redux";

export default function Leaguehomea(props) {
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleroute = () => {
    navigate(`/leagueleads`);
  };
  const handleroater = () => {
    navigate(`/leagueroast`);
  };
  const handlemeeting = () => {
    navigate(`/meetings`);
  };
  const handleslip = () => {
    navigate(`/leagueslips`);
  };

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow mb-[5rem]">
        <div className="lg:p-10 bg-about text-center duration-500 ease-in-out cursor-pointer">
          <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]	xs:p-[21px] xs:mt-[7px] ">
            League
          </h1>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-6 xs:col-span-12">
            <div className="w-[95%] mx-auto mt-[4rem]">
              <div className="grid grid-cols-12 lg:gap-[15px] xs:gap-[0px]">
                <div className="col-span-6 xs:col-span-12 py-[4px]">
                  <div className="w-[100%] lg:h-[200px] xs:h-[110px] image-grid rounded-md hover:scale-105 duration-500 ease-in-out cursor-pointer"
                    onClick={handleroute}
                  >
                    <h1 className="relative flex text-[#005125] mont-serif font-bold text-[20px] lg:h-[200px] xs:h-[110px] items-end justify-center bottom-[15px]">
                      League Leads
                    </h1>
                  </div>
                </div>
                <div className="col-span-6 xs:col-span-12 py-[4px]">
                  <div className="w-[100%] lg:h-[200px] xs:h-[110px] image-grid rounded-md hover:scale-105 duration-500 ease-in-out cursor-pointer"
                    onClick={handleroater}
                  >
                    <h1 className="relative flex text-[#005125] mont-serif font-bold text-[20px] lg:h-[200px] xs:h-[110px] items-end justify-center bottom-[15px]">
                      Roster
                    </h1>
                  </div>
                </div>
                <div className="col-span-6 xs:col-span-12 py-[4px]">
                  <div className="w-[100%] lg:h-[200px] xs:h-[110px] image-grid rounded-md hover:scale-105 duration-500 ease-in-out cursor-pointer"
                    onClick={handlemeeting}
                  >
                    <h1 className="relative flex text-[#005125] mont-serif font-bold text-[20px] lg:h-[200px] xs:h-[110px] items-end justify-center bottom-[15px]">
                      League Meetings
                    </h1>
                  </div>
                </div>
                <div className="col-span-6 xs:col-span-12 py-[4px]">
                  <div className="w-[100%] lg:h-[200px] xs:h-[110px] image-grid rounded-md hover:scale-105 duration-500 ease-in-out cursor-pointer"
                    onClick={handleslip}
                  >
                    <h1 className="relative flex text-[#005125] mont-serif font-bold text-[20px] lg:h-[200px] xs:h-[110px] items-end justify-center bottom-[15px]">
                      Slips
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="lg:hidden xs:block border-dashed border-[1.1px] border-[#a5a0a0] w-[100%] relative top-[-34px]" />
          <div className="col-span-6 xs:col-span-12">
            {loggedUserInfo?.is_lg_admin === 1 && (
              <div className="grid-content shadow-md drop-shadow league-shadow py-[2rem]">
                <LeagueCount />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
