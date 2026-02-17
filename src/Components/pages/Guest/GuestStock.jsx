import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

// Component
import GuestRegister from "./GuestRegister";
import GuestLogin from "./GuestLogin";

export default function GuestStock() {
    const { code } = useParams();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <>
            <div className="guest-layout h-screen bg-banner bg-11">
                <div className="content-started lg:py-3 bg-white lg:w-[80%] lg:mx-auto rounded-md relative lg:top-8 fade-in-left xs:top-[2rem] xs:text-[20px]">
                    <div className="content-form">
                        {/* <h4 className="text-[#005125] mont-serif text-center lg:text-[25px] font-semibold relative lg:top-[1.5rem] xs:text-[20px] xs:top-[1rem]">
                        Welcome to 10X Raabit
                        </h4> */}
                        <Tabs className="">
                            <TabList className="xs:sticky xs:top-0 xs:bg-white flex justify-center lg:gap-[18rem] shadow-md p-2 xs:gap-[2rem]">
                                <Tab
                                    className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ${activeTab === 0 ? 'border-b-4 transition-all duration-500' : ''
                                        } focus:outline-none`}
                                    onClick={() => handleTabClick(0)}
                                >
                                    Login
                                </Tab>
                                <Tab
                                    className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ${activeTab === 1 ? 'border-b-4 transition-all duration-500' : ''
                                        } focus:outline-none`}
                                    onClick={() => handleTabClick(1)}
                                >
                                    Register
                                </Tab>
                            </TabList>

                            <TabPanel>
                                <GuestLogin refCode={code} />
                            </TabPanel>
                            <TabPanel>
                                <GuestRegister refCode={code} />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    )
}
