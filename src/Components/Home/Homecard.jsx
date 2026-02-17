import React from "react";

// import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

export default function Homecard(props) {
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlelistener = () => {
    navigate(`/members`);
  };
  const league = () => {
    navigate(`/league`);
  };
  const event = () => {
    navigate(`/event`);
  };
  const formupload = () => {
    navigate(`/formuploads`);
  };
  const navigateleader = () => {
    navigate(`/leaderboard`);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loggedUserInfo?.is_lg_admin === 1 && (
          <div onClick={navigateleader}>
            <div className="h-[8.5rem] rounded-[20px] overflow-hidden text-center relative bg-home transform hover:scale-105 duration-500 ease-in-out cursor-pointer">
              <img
                src={props.bg}
                className="bg-grid absolute z-40 opacity-[0.3] h-[100%] w-[100%]"
                alt=""
              />
              <h5 className="text font-extrabold relative lg:top-[90px] xs:mt-[5rem] text-center">
                Leaderboard
              </h5>
            </div>
          </div>
        )}

        <div onClick={handlelistener}>
          <div className="h-[8.5rem] rounded-[20px] overflow-hidden text-center relative bg-home transform hover:scale-105 duration-500 ease-in-out cursor-pointer">
            <img
              src={props.bg}
              className="bg-grid absolute z-40 opacity-[0.3] h-[100%] w-[100%]"
              alt=""
            />

            <h5 className="text font-extrabold relative lg:top-[91px] xs:mt-[5rem] text-center">
              Members
            </h5>
          </div>
        </div>

        <div onClick={event}>
          <div className="h-[8.5rem] rounded-[20px] overflow-hidden text-center relative bg-home transform hover:scale-105 duration-500 ease-in-out cursor-pointer">
            <img
              src={props.bg}
              className="bg-grid absolute z-40 opacity-[0.3] h-[100%] w-[100%]"
              alt=""
            />
            <h5 className="text font-extrabold relative lg:top-[91px] xs:mt-[5rem] text-center">
              Events
            </h5>
          </div>
        </div>

        <div onClick={league}>
          <div className="h-[8.5rem] rounded-[20px] overflow-hidden text-center relative bg-home transform hover:scale-105 duration-500 ease-in-out cursor-pointer">
            <img
              src={props.bg}
              className="bg-grid absolute z-40 opacity-[0.3] h-[100%] w-[100%]"
              alt=""
            />
            <h5 className="text font-extrabold relative lg:top-[91px] xs:mt-[5rem] text-center">
              Leagues
            </h5>
          </div>
        </div>

        <div onClick={formupload}>
          <div className="h-[8.5rem] rounded-[20px] overflow-hidden text-center relative bg-home transform hover:scale-105 duration-500 ease-in-out cursor-pointer">
            <img
              src={props.bg}
              className="bg-grid absolute z-40 opacity-[0.3] h-[100%] w-[100%]"
              alt=""
            />

            <h5 className="text font-extrabold relative lg:top-[91px] xs:mt-[5rem] text-center">
              Form Uploads
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
