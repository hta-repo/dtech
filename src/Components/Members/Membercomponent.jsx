import React, { useEffect, useState, useCallback } from "react";

import MemberCaurosel from "../MemberCaurosel";
import Companylisting from "./Companylisting";
import image from "../../assets/welcomepage/building.png";

// Api
import { GetLeagueCompanies } from "../../services/companies.services"

export default function Membercomponent() {
  const [leagueCompanies, setLeagueCompanies] = useState([]);
  const [loadLeagueCompanies, setLoadLeagueCompanies] = useState(false);

  const getLeagueComp = useCallback(() => {
    (async () => {
      setLoadLeagueCompanies(true)
      const response = await GetLeagueCompanies("?page=1&limit=10");
      if (response.status) {
        setLeagueCompanies(response.data.data)
      }
      setLoadLeagueCompanies(false)
    })();
  }, []);

  useEffect(() => {
    getLeagueComp();
  }, [getLeagueComp])

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center">
          <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px] ">
            Members
          </h1>
        </div>
        <div className="xs:hidden block w-[145vh] xs:w-[45vh] lg:mx-auto mx-auto xs:mt-[24px]">
          <MemberCaurosel title="Companies" id="m_id" carouselArray={leagueCompanies} loadSpinner={loadLeagueCompanies} />
        </div>
        <Companylisting image={image} />
      </div>
    </main>
  );
}
