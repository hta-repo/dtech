import React, { useState, useEffect, useCallback } from "react";

import { GetLeagueCompanies, GetLeagueMembers } from "../../../services/companies.services";
import { GetUpcomingEvents } from "../../../services/events.services";

import { RxCross1 } from "react-icons/rx";
import { FiRefreshCcw } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

// Component 
import IntrestA from "./IntrestA";

// Default Image
import DefaultImage from "../../../assets/defaultImage.png"

//  Redux
import { useSelector } from "react-redux";

export default function IntrestB(props) {
  const navigate = useNavigate();
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const [detailArray, setDetailArray] = useState([])
  const [detail, setDetail] = useState({})
  const [clickedRow, setClickedRow] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [back, setBack] = useState(false);
  const [idHide, setIdHide] = useState(false);

  const getLeagues = useCallback(() => {
    (async () => {
      const response = await GetLeagueCompanies("?page=1&limit=10");
      setDetailArray(response.data.data)
    })();
  }, []);

  const getEventsLeagues = useCallback(() => {
    (async () => {
      const response = await GetUpcomingEvents("?page=1&limit=10");
      setDetailArray(response.data.data)
    })();
  }, []);

  const getLeaguesMembers = useCallback(() => {
    (async () => {
      const response = await GetLeagueMembers("?page=1&limit=10");
      setDetailArray(response.data.data)
    })();
  }, []);

  useEffect(() => {
    if (props.value === "company") {
      getLeagues()
    }
    if (props.value === "league") {
      getEventsLeagues()
    }
    if (props.value === "members") {
      getLeaguesMembers()
    }
  }, [props, getLeagues, getEventsLeagues, getLeaguesMembers])

  const GetDetailed = (id, rowIndex, item) => {
    setClickedRow(rowIndex)
    setSelectedID(id)
    setDetail(item)
  };

  const GoToDetail = () => {
    if (props.value === "company") {
      navigate('/description/' + selectedID)
    }
    if (props.value === "league") {
      navigate('/event-detail/' + selectedID)
    }
    if (props.value === "members") {
      setModalOpen(true)
    }
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const EmptyValues = () => {
    setIdHide(true)
    const gamificationObject = {
      gamification: true
    }
    localStorage.setItem("gameObj", JSON.stringify(gamificationObject));
  };

  return (
    <>
      <div
        id="intrest"
        style={{ display: back || idHide ? "none" : "block" }}
        className="p-6 h-max intrest mt-3 lg:w-[100%] xs:min-h-max">
        <div className="intrest-card-d">
          <div className="flex flex-col lg:gap-2" style={{ display: back ? "none" : "block" }}>
            {/* <div className="text-y inline-flex flex-col"> */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-11">
                <h3 className="xs:text-[20px] lg:text-left text-black  mont-serif lg:text-2xl inline lg:mt-[16px]">
                  Q: Elaborate a bit more
                </h3>
              </div>
              <div className="col-span-1">
                <div className="pt-[5px]" onClick={() => setBack(true)}>
                  <FiRefreshCcw style={{ fontSize: "25px", cursor: "pointer" }} />
                </div>
              </div>
            </div>
            {/* <p className="xs:contents text-left text-[#676767] mont-serif inline relative top-[7px] left-[41px]">
            Choose as many as you like
          </p> */}
            {/* </div> */}
            <div className="flex lg:flex-row xs:flex-col lg:gap-[3rem] items-center xxl:gap-[1rem]">
              <div className="flex flex-row flex-wrap gap-2 mt-[2rem] w-full md:w-4/5 lg:w-4/5 xxl:w-4/5">
                {detailArray.map((item, index) => (
                  <button
                    className={`py-[5px] px-[30px] lg:min-w-[4rem] mont-serif text-white ${clickedRow === index
                      ? "filled-true"
                      : "bg-default"
                      }`}
                    key={index}
                    onClick={() => GetDetailed(item.id, index, item)}
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  className="filled-true py-[5px] px-[30px] lg:min-w-[4rem] mont-serif text-white"
                  onClick={() => {
                    if (props.value === "company") {
                      navigate('/members')
                    }
                    if (props.value === "league") {
                      navigate('/event')
                    }
                    if (props.value === "members") {
                      navigate('/members')
                    }
                  }
                  }
                >
                  More
                </button>
              </div>
              <div
                className="flex flex-col gap-2 relative top-[1rem] xs:mb-[3rem] ms:mt-[1rem]"
                id="button"
              >
                <button className=" xs:w-[11rem] xxl:w-[11rem] lg:w-[17rem] p-[7px] bg-default border-md"
                  onClick={EmptyValues}
                >
                  Skip
                </button>
                <button
                  className="next xs:w-[11rem] xxl:w-[11rem]  lg:w-[17rem] p-[7px]"
                  id="skip"
                  disabled={selectedID === null}
                  onClick={GoToDetail}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className=" fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[608px] h-full scale-in-center"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white flex flex-col items-center">
                <span
                  onClick={toggleModal}
                  className="relative left-[15rem] mt-[15px] text-[29px] cursor-pointer text-black"
                >
                  <RxCross1 />
                </span>
                <div className="img">
                  <img id="uploadPreview" src={detail?.avatar ? process.env.REACT_APP_API_IMAGE_URL + detail?.avatar : DefaultImage} style={{ width: "130px", height: "130px", borderRadius: "50%", }} alt="avatarImage" />
                </div>

                <div className=" mont-serif text-2xl text-[#005125] font-semibold mt-3">
                  {detail?.name}
                </div>
                <hr className="border-b border-[#007033] w-[20%]" />
                <div className="w-[70%] mx-auto my-[2rem]">
                  <div className="mont-serif text-lg text-[#005125] text-left font-semibold">
                    Contact
                  </div>
                  <div className="mb-2 mt-4">
                    <span className="text-sm text-black mont-serif font-bold">Phone number:   </span>
                    <span className="text-black">
                      {detail?.phone}
                    </span>
                  </div>
                  <div className="my-1">
                    <span className="text-sm text-black mont-serif font-bold">Email:   </span>
                    <span className="text-black">
                      {detail?.email}
                    </span>
                  </div>

                  <div className=" mont-serif text-lg text-[#005125] text-left font-semibold mt-3">
                    Company
                  </div>
                  <div className="mb-2 mt-4">
                    <span className="text-sm text-black mont-serif font-bold">Name:   </span>
                    <span className="text-black">
                      {detail.company?.name}
                    </span>
                  </div>
                  <div className="my-1">
                    <span className="text-sm text-black mont-serif font-bold">Designation:   </span>
                    <span className="text-black">
                      {detail.designation?.name}
                    </span>
                  </div>
                  <div className=" mont-serif text-lg text-[#005125] text-left font-semibold mt-3">
                    League
                  </div>
                  <div className="mb-2 mt-4">
                    <span className="text-sm text-black mont-serif font-bold">Name:   </span>
                    <span className="text-black">
                      {loggedUserInfo.league?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      )}
      {back && (
        <IntrestA />
      )}
    </>
  );
}
