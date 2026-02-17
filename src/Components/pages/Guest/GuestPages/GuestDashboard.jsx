import React, { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

// Image
import Logout from "../../../Home/Logout.png";
import { RxExit, RxCross1 } from "react-icons/rx";

// Api
import { logout } from "../../../../services/user.services";

import { Tooltip } from 'react-tooltip'

//  Component
import GuestMeetingDetail from "./GuestMeetingDetail";
import GuestOnetoone from "./GuestOnetoone";
import Spinner from "../../../Spinner/Spinner";
import { useNavigate } from "react-router-dom";

export default function GuestDashboard({ firebaseToken }) {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handlelogout = () => {
        (async () => {
            setLoading(true)
            const formData = new FormData();
            formData.append("fcm_token", firebaseToken);

            const response = await logout(formData);
            if (response.data.status) {
                localStorage.removeItem("loggedUser");
                setLoading(false)
                document.location.reload(navigate("/"));
            }
        })();
    };

    return (
        <>
            {isModalOpen && (
                <div className=" fade-in-top fixed z-[99] overflow-y-auto top-0 w-full left-0">
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
                                    <img
                                        src={Logout}
                                        className="mx-auto h-[11rem] relative left-[12px]"
                                        alt="Logout"
                                    />
                                </div>
                                <div className=" mont-serif text-2xl text-[#005125] text-center font-semibold leading-relaxed mt-3">
                                    Are you sure you want to logout
                                </div>
                                <div className=" mont-serif text-2xl text-[#005125] text-center font-semibold leading-relaxed">
                                    from all accounts?
                                </div>
                            </div>
                            <div className=" lg:p-[40px] flex flex-col justify-center items-center bg-white mx-auto gap-2 ">
                                <button onClick={handlelogout} disabled={loading} className="btn-create mont-serif text-black"
                                    style={{ width: "250px" }}>
                                    {loading ? <Spinner /> : 'Logout'}
                                </button>
                                <button
                                    onClick={toggleModal}
                                    className="btn-dc border border-green-700 mont-serif text-black"
                                    style={{ width: "250px" }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full">
                <div className="lg:p-6 bg-about text-center">
                    <span className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[22px] xs:mt-[6px]">
                        Guest Dashboard
                    </span>
                    <Tooltip anchorSelect=".LogoutButton" place="top">
                        <span style={{ fontSize: '12px' }}>Logout</span>
                    </Tooltip>
                    <span className="LogoutButton float-right cursor-pointer text-lg font-semibold text-[#005125]" onClick={() => setModalOpen(true)}>
                        <RxExit style={{ fontSize: "27px" }} />
                    </span>
                </div>
                <Tabs className="">
                    <TabList className="xs:sticky xs:top-0 xs:bg-white flex justify-center lg:gap-[18rem] shadow-md p-2 xs:gap-[2rem]">
                        <Tab
                            className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ${activeTab === 0 ? 'border-b-4 transition-all duration-500' : ''
                                } focus:outline-none`}
                            onClick={() => handleTabClick(0)}
                        >
                            Meeting Detail
                        </Tab>
                        <Tab
                            className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ${activeTab === 1 ? 'border-b-4 transition-all duration-500' : ''
                                } focus:outline-none`}
                            onClick={() => handleTabClick(1)}
                        >
                            One-2-One
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <GuestMeetingDetail />
                    </TabPanel>
                    <TabPanel>
                        <GuestOnetoone />
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
}
