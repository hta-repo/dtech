import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Introdescription from "./Introdescription";
import MemberEvent from "./MemberEvent";
import Membertestimonial from "./Membertestimonial";

import { AiOutlineEdit } from "react-icons/ai";

// APi
import { GetCompanyDetail } from "../../services/companies.services";

//  Redux
import { useSelector } from "react-redux";

export default function Memberdecription() {
  const { id } = useParams();
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [detail, setDetail] = useState({});

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const getCompDetail = useCallback((id) => {
    (async () => {
      const response = await GetCompanyDetail(id);
      setDetail(response.data)
    })();
  }, []);

  useEffect(() => {
    if (id) {
      getCompDetail(id);
    }
  }, [id, getCompDetail])

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center">
          <span className="text-center mont-serif font-semibold text-2xl text-[#005125]	xs:p-[22px] xs:mt-[6px] ">
            {detail?.name}
          </span>
          {(loggedUserInfo.company?.id === detail?.id && (loggedUserInfo.designation?.id === 1 || loggedUserInfo.designation?.id === 2)) && (
            <span className="float-right cursor-pointer" onClick={() => navigate('/edit-company/' + id)}>
              <AiOutlineEdit style={{ fontSize: "30px" }} />
            </span>
          )}
        </div>
        {/* content static text */}
        <Tabs className="" >
          <TabList className="xs:sticky xs:top-0 xs:bg-white flex justify-center lg:gap-[18rem] shadow-md p-2 xs:gap-[2rem] ">
            <Tab
              className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ${activeTab === 0 ? 'border-b-4 transition-all duration-500' : ''
                } focus:outline-none`}
              onClick={() => handleTabClick(0)}
            >
              Description
            </Tab>
            <Tab
              className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ${activeTab === 1 ? 'border-b-4 transition-all duration-500' : ''
                } focus:outline-none`}
              onClick={() => handleTabClick(1)}
            >
              Testimonials
            </Tab>
            <Tab
              className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ${activeTab === 2 ? 'border-b-4 transition-all duration-500 ' : ''
                } focus:outline-none`}
              onClick={() => handleTabClick(2)}
            >
              Events
            </Tab>
          </TabList>

          <TabPanel>
            <Introdescription detail={detail} />
          </TabPanel>
          <TabPanel>
            <Membertestimonial />
          </TabPanel>
          <TabPanel>
            <MemberEvent />
          </TabPanel>
        </Tabs>
      </div>
    </main>
  );
}
