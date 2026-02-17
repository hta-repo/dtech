import React, { useState, useEffect, useCallback } from "react";
import building from '../assets/welcomepage/building.png'
import { AiTwotoneBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

// Material ui
import Badge from '@mui/material/Badge';

// APi
import { GetNotifications } from "../services/notifications.services";

import moment from 'moment';

function Searchtab() {
  const navigate = useNavigate();
  const [myMessages, setMyMessages] = useState([]);

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setisNotificationOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const togglenotification = () => {
    setisNotificationOpen(!isNotificationOpen);
  };

  const getAllNotifi = useCallback(() => {
    (async () => {
      const status = "?all=1";
      const paginate = "&page=" + 1 + "&limit=" + 15;

      const response = await GetNotifications({ status, paginate });
      if (response.status) {
        setMyMessages(response.data.data)
      }
    })();
  }, []);

  useEffect(() => {
    getAllNotifi();
  }, [getAllNotifi]);

  return (
    <>
      <div className=" xs:w-[9vh] xs:mx-auto header-content flex items-center flex-row">
        <form action="#" className="lg:ml-[16rem]">
          <div className="hidden md:flex relative lg:w-[136vh]">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              {/* <svg
                onClick={toggleDropdown}
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg> */}
              {/* {isDropdownOpen && (
                <div className="absolute mt-2 w-[50rem] bg-white rounded-md drop-filter lg:left-[50px] lg:top-[3rem] scale-up-ver-top z-10	">
                  <div className="py-1">
                    <div className="flex flex-row items-center lg:gap-[35rem] lg:mt-[6px]">
                      <h1 className="mont-serif text-[20px] font-semibold ml-4 text-[#007033] ">
                        Skills in Demand
                      </h1>
                      <RxCross1
                        className="lg:text-[20px] cursor-pointer"
                        onClick={toggleDropdown}
                      />
                    </div>
                    <div className="flex-wrap justify-start mt-[13px] gap-3 lg:w-[max-content]">
                      <div className=" xs:flex-wrap lg:flex gap-2 ml-[2rem]">
                        <button className="filled-true p-[3px] lg:lg:w-[84px] xs:w-[6rem] mont-serif text-white ">
                          no.1
                        </button>
                        <button className=" xs:ml-[4px] bg-default  p-[3px] lg:w-[185px] xs:w-[10rem] mont-serif ">
                          Second Option
                        </button>
                        <button className="  xs:ml-[4px] bg-default  p-[3px] lg:w-[142px] mont-serif   xs:w-[6rem] ">
                          # three
                        </button>
                        <button className=" xs:mt-[6px]  bg-default  p-[3px] lg:w-[176px] mont-serif  xs:w-[8rem]">
                          next choice
                        </button>
                      </div>
                    </div>
                    <div className="flex-wrap justify-start mt-3 gap-3 lg:w-[max-content]">
                      <div className=" xs:flex-wrap lg:flex gap-2 ml-[2rem]">
                        <button className="filled-true p-[3px] lg:lg:w-[84px] xs:w-[6rem] mont-serif text-white ">
                          no.1
                        </button>
                        <button className=" xs:ml-[4px] bg-default  p-[3px] lg:w-[185px] xs:w-[10rem] mont-serif ">
                          Second Option
                        </button>
                        <button className="  xs:ml-[4px] bg-default  p-[3px] lg:w-[142px] mont-serif   xs:w-[6rem] ">
                          # three
                        </button>
                        <button className=" xs:mt-[6px]  bg-default  p-[3px] lg:w-[176px] mont-serif  xs:w-[8rem]">
                          next choice
                        </button>
                      </div>
                    </div>
                    <hr className="relative lg:top-[1rem]" />
                    <h1 className="mont-serif text-[20px] font-semibold ml-4 text-[#007033] mt-6 ">
                      Popular Company Research
                    </h1>
                    <div className="flex-wrap justify-start mt-[13px] gap-3 lg:w-[max-content]">
                      <div className=" xs:flex-wrap lg:flex gap-2 ml-[2rem]">
                        <button className="filled-true p-[3px] lg:lg:w-[84px] xs:w-[6rem] mont-serif text-white ">
                          no.1
                        </button>
                        <button className=" xs:ml-[4px] bg-default  p-[3px] lg:w-[185px] xs:w-[10rem] mont-serif ">
                          Second Option
                        </button>
                        <button className="  xs:ml-[4px] bg-default  p-[3px] lg:w-[142px] mont-serif   xs:w-[6rem] ">
                          # three
                        </button>
                        <button className=" xs:mt-[6px]  bg-default  p-[3px] lg:w-[176px] mont-serif  xs:w-[8rem]">
                          next choice
                        </button>
                      </div>
                    </div>
                    <div className="flex-wrap justify-start mt-3 gap-3 lg:w-[max-content] lg:mb-8">
                      <div className=" xs:flex-wrap lg:flex gap-2 ml-[2rem]">
                        <button className="filled-true p-[3px] lg:lg:w-[84px] xs:w-[6rem] mont-serif text-white ">
                          no.1
                        </button>
                        <button className=" xs:ml-[4px] bg-default p-[3px] lg:w-[185px] xs:w-[10rem] mont-serif">
                          Second Option
                        </button>
                        <button className="  xs:ml-[4px] bg-default p-[3px] lg:w-[142px] mont-serif xs:w-[6rem]">
                          # three
                        </button>
                        <button className=" xs:mt-[6px] bg-default p-[3px] lg:w-[176px] mont-seri  xs:w-[8rem]">
                          next choice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
            {/* <input
              onFocus={toggleDropdown}
              id="search"
              type="text"
              name="search"
              className=" mont-serif text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg w-full h-10 focus:outline-none "
              placeholder="Search by company member , company or chapter"
            /> */}
          </div>
          <div className="flex md:hidden">
            <a
              href="#/"
              className="flex items-center justify-center h-10 w-10 border-transparent"
            >
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </a>
          </div>
        </form>
        <div
          className="flex justify-center mx-auto m-auto lg:gap-[2rem]"
          style={{ alignItems: "center" }}
        >
          {/* <AiOutlineMail style={{ fontSize: "20px", cursor: "pointer" }} /> */}
          <FaUserAlt className="cursor-pointer" onClick={() => navigate('/settings')} />
          <Badge color="success" badgeContent={myMessages?.length}>
            <AiTwotoneBell onClick={togglenotification} style={{ fontSize: "20px", cursor: "pointer" }} />
          </Badge>
          {isNotificationOpen && (
            <div className="absolute mt-2 w-[30rem] overflow-y-auto h-[65vh] bg-white rounded-md drop-filter right-8 lg:top-[3rem] scale-up-ver-top z-10	">
              <div className="py-1">
                <div className="flex flex-row items-center lg:gap-[18rem] lg:mt-[6px]">
                  <h1 className="mont-serif text-[20px] font-semibold ml-4 text-[#007033]">
                    Notifications
                  </h1>
                  <RxCross1
                    className="lg:text-[20px] cursor-pointer"
                    onClick={togglenotification}
                  />
                </div>
                <hr className="mt-1" />
                <div className="grid grid-cols-12 gap-[1rem] p-6">
                  {myMessages?.map((item) => (
                    <>
                      <div className="col-span-2 xs:col-span-2">
                        <div className="image-grid lg:w-[44px] mt-[10px]">
                          <img src={building} className="lg:h-[37px]" alt="building" />
                        </div>
                      </div>
                      <div className="col-span-10 xs:col-span-10">
                        <div className="grid grid-cols-12">
                          <div className="col-span-9 xs:col-span-7">
                            <span className="font-semibold">{JSON.parse(item.data).title} </span>
                          </div>
                          <div className="col-span-3 xs:col-span-5">
                            <span className="mont-serif lg:text-[12px]">
                              {moment(new Date(item.created_at)).fromNow()}.
                            </span>
                          </div>
                          <div className="col-span-12 xs:col-span-12 pt-[5px]">
                            <span className="lg:text-[14px]"> {JSON.parse(item.data).body}.</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Searchtab;
