import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Leagueleadgiventable, Leagueleadreceivetable } from "./Leagueleadtable";

function Leagueleads() {

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center">
          <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] ml-12 xs:p-[21px] xs:mt-[7px]">
            League Leads
          </h1>
        </div>
        <Tabs>
          <TabList className="flex justify-start xs:justify-center xs:gap-9 lg:gap-[5rem] shadow-md p-3">

            <Tab
              className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ml-8 ${activeTab === 0 ? 'border-b-4 transition-all duration-500' : ''
                } focus:outline-none`}
              onClick={() => handleTabClick(0)}
            >
              Given
            </Tab>
            <Tab
              className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ${activeTab === 1 ? 'border-b-4 transition-all duration-500' : ''
                } focus:outline-none`}
              onClick={() => handleTabClick(1)}
            >
              Received
            </Tab>
          </TabList>

          <TabPanel>
            <Leagueleadgiventable given={true} />
          </TabPanel>
          <TabPanel>
            <Leagueleadreceivetable given={false} />
          </TabPanel>

        </Tabs>
      </div>
    </main>
  )
}

export default Leagueleads
