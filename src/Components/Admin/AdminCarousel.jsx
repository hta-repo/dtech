import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

//  Loader
import Spinner from "../Spinner/Spinner";

// Component
import { DetailPopUp } from "./DetailPopUp"

function AdminCarousel(props) {
  const navigate = useNavigate();
  const [data, setData] = useState(props.carouselArray)
  const [isModalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState({});
  const [approvedDetailObject, setApprovedDetailObject] = useState({});

  const scrollLeft = () => {
    document.getElementById(props.id).scrollLeft -= 400;
  };
  const scrollRight = () => {
    document.getElementById(props.id).scrollLeft += 400;
  };

  useEffect(() => {
    setData(props.carouselArray)
  }, [props.carouselArray])

  useEffect(() => {
    if (approvedDetailObject && Object.entries(approvedDetailObject).length > 0) {
      const updatedArray = data.filter((item) => item.id !== approvedDetailObject.id);
      setData(updatedArray);
    }
  }, [approvedDetailObject])

  return (
    <>
      <div className="relative fade-in-left">
        <div className="flex justify-between">
          <h1 className="text-2xl text-green-700 mont-serif">
            {" "}
            {props.title}
          </h1>
          <div className="mont-serif text-black">
            <button className="btn-table" onClick={() => {
              if (props.isPending) {
                navigate('/admin/pending-event')
              }
              else {
                navigate('/admin/approved-event')
              }
            }}>View all events</button>
          </div>
        </div>
        {props.loadSpinner ? (
          <Spinner />
        ) : (
          <>
            {data.length > 0 ? (
              <>
                <div className="absolute w-full flex flex-row justify-end lg:justify-between right-0 lg:top-[3.2rem] z-10 xs:top-[20px]">
                  <button
                    onClick={scrollLeft}
                    className="lg:w-[1px] relative lg:top-[56px] lg:right-[37px] lg:h-[4rem] p-2 m-2 rounded-full carousel-bg"
                  >
                    <FiChevronLeft className="relative lg:right-[7px] text-white" />
                  </button>
                  <button
                    onClick={scrollRight}
                    className="lg:w-[1px] relative lg:top-[56px] lg:left-[37px] lg:h-[4rem] p-2 m-2 rounded-full carousel-bg"
                  >
                    <FiChevronRight className="relative lg:right-[7px] text-white" />
                  </button>
                </div>
                <div
                  id={props.id}
                  className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth scrollbar-hide lg:h-[auto]-m-4 mt-1"
                >
                  {data.map((item) => (
                    <div className="carousel-card lg:ml-[-18px] cursor-pointer" key={item.id}
                      onClick={() => {
                        setDetail(item)
                        setModalOpen(true)
                      }}
                    >
                      <div className="p-4 lg:w-[265px] xxl:w-[227px] xs:w-[14rem] drop-shadow-xl">
                        <div className="lg:h-max xs:h-max bg-opacity-75 shadow-inner rounded-lg overflow-hidden text-center relative intrest-card">
                          <img
                            src={process.env.REACT_APP_API_IMAGE_URL + item.cover}
                            className="lg:mt-[-2px] xs:relative lg:relative" style={{ height: "22vh", width: "100%", objectFit: "cover" }}
                            alt={item.cover}
                          />
                          <h5 className="xs:p-[3px] text-[17px] text-[#005125] mont-serif font-extrabold relative lg:top-[74] lg:p-[3px] text-center text-bg bg-text lg:m-auto"
                            style={{
                              width: "100%",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              padding: "5px 10px",
                            }}
                          >
                            <span>{item.name}</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="m-[2rem]">No Events Found</p>
            )}

          </>
        )}
      </div>
      {isModalOpen && (
        <DetailPopUp isModalOpen={isModalOpen} setModalOpen={setModalOpen} detail={detail} setApprovedDetailObject={setApprovedDetailObject} />
      )}
    </>
  );
}

export default AdminCarousel;