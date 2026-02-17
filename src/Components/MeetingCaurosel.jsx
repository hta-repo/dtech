import React from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// Image
import Meeting from "../assets/meeting.png"

//  Loader
import Spinner from "./Spinner/Spinner";

function MeetingCaurosel(props) {
    const navigate = useNavigate();

    const scrollLeft = () => {
        document.getElementById(props.id).scrollLeft -= 400;
    };

    const scrollRight = () => {
        document.getElementById(props.id).scrollLeft += 400;
    };

    return (
        <div className="relative fade-in-left">
            <h1 className="text-2xl text-green-700 mont-serif lg:mt-[30px]">
                {" "}
                {props.title}
            </h1>
            {props.loadSpinner ? (
                <Spinner />
            ) : (
                <>
                    {props.carouselArray.length > 0 ? (
                        <>
                            <div className="absolute w-full flex flex-row justify-end lg:justify-between right-0 lg:top-[4.5rem] z-10 xs:top-[20px]">
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
                                {props.carouselArray.map((item) => (
                                    <div className="carousel-card lg:ml-[-18px] cursor-pointer" key={item.id}
                                        onClick={() => {
                                            navigate("/meeting-detail/" + item.id)
                                        }}
                                    >
                                        {props.myEvents && (
                                            <span className="relative left-[8rem] z-10 top-[2.7rem] bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                                {item.status === 0 ? "Pending" : item.status === 1 ? "Approved" : "Rejected"}
                                            </span>
                                        )}
                                        <div className="p-4 lg:w-[265px] xxl:w-[227px] xs:w-[14rem] drop-shadow-xl">
                                            <div className="lg:h-max xs:h-max bg-opacity-75 shadow-inner rounded-lg overflow-hidden text-center relative intrest-card">
                                                <img
                                                    src={Meeting}
                                                    className="lg:mt-[-2px] xs:relative lg:relative" style={{ width: "60%", margin: "15px auto" }}
                                                    alt={item.logo}
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
                        <p className="m-[2rem]">No Meetings Found</p>
                    )}
                </>
            )}
        </div>
    );
}

export default MeetingCaurosel;
