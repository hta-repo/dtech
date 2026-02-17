import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Onetoone from "./Onetoone";
import Recordcbr from "./Recordcbr";
import Leagueleadslip from "./Leagueleadslip";

function Slipshome() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center">
          <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]	xs:p-[20px] xs:mt-[6px] ">
            League Lead Slip
          </h1>
        </div>
        <Tabs>
          <TabList className="xs:gap-[1rem] flex justify-center lg:gap-[18rem] shadow-md p-2">
            <Tab
              className={`text-[#000000] mont-serif xs:text-[17px]  text-xl cursor-pointer mt-2 ${activeTab === 0
                ? "border-b-4 transition-all duration-500"
                : ""
                } focus:outline-none`}
              onClick={() => handleTabClick(0)}
            >
              League Lead
            </Tab>
            <Tab
              className={`text-[#000000] mont-serif xs:text-[17px] text-xl cursor-pointer mt-2 ${activeTab === 1
                ? "border-b-4 transition-all duration-500"
                : ""
                } focus:outline-none`}
              onClick={() => handleTabClick(1)}
            >
              One-2-One
            </Tab>
            <Tab
              className={`text-[#000000] mont-serif xs:text-[17px] text-xl cursor-pointer mt-2 ${activeTab === 2
                ? "border-b-4 transition-all duration-500 "
                : ""
                } focus:outline-none`}
              onClick={() => handleTabClick(2)}
            >
              Record CBR
            </Tab>
          </TabList>

          <TabPanel>
            <Leagueleadslip />
          </TabPanel>
          <TabPanel>
            <Onetoone />
          </TabPanel>
          <TabPanel>
            <Recordcbr />
          </TabPanel>
        </Tabs>
      </div>
    </main>
  );
}

export default Slipshome;
