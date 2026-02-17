import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
// import AttendedTable from "./CompanyEvent/AttendedTable";

import Carousel from "../Carousel";

// Api
import { GetCompanyEvents } from "../../services/companies.services"

export default function MemberEvent() {
  const { id } = useParams();
  const [leagueCompanies, setLeagueCompanies] = useState([]);
  const [loadLeagueCompanies, setLoadLeagueCompanies] = useState(false);

  const getLeagueComp = useCallback((id) => {
    (async () => {
      setLoadLeagueCompanies(true)
      const paginate = "?page=1&limit=10";

      const response = await GetCompanyEvents({ paginate, id });
      if (response.status) {
        setLeagueCompanies(response.data.data)
      }
      setLoadLeagueCompanies(false)
    })();
  }, []);

  useEffect(() => {
    if (id) {
      getLeagueComp(id);
    }
  }, [id, getLeagueComp])

  return (
    <>
      <div className="w-[145vh] xs:w-[45vh] mx-auto xs:mt-8">
        <Carousel title="Upcomming Events" id="up_mem_id" carouselArray={leagueCompanies} loadSpinner={loadLeagueCompanies} />
      </div>
      {/* <AttendedTable/> */}

      {/* <div className="w-[145vh] xs:w-[45vh] mx-auto xs:mt-8">
        <Carousel title="This week events" id="w_id" />
      </div>
      <div className="w-[145vh] xs:w-[45vh] mx-auto xs:mt-8 mb-10">
        <Carousel title="Three Weeks ago events" id="tw_id" />
      </div> */}
    </>
  );
}
