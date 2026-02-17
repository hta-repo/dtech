import React, { useEffect, useState, useCallback } from "react";

import { GetCencomStatsbyLeagueID } from "../../../services/cencom/cencomGeneral.services";
import GeneralService from "../../../services/general.services";
export default function AdminCount() {
  const [leaguesStats, setLeaguesStats] = useState({});
  const [leagueID, setLeagueID] = useState('1');
  const [leagues, setLeagues] = useState([]);

  const getLeagues = useCallback(() => {
    (async () => {
      const response = await GeneralService.getAllLeagues();
      setLeagues(response.data.data)
    })();
  }, []);

  const getLeagueStates = useCallback(() => {
    (async () => {
      const data = "?league_id=" + leagueID;

      const response = await GetCencomStatsbyLeagueID(data);
      setLeaguesStats(response.data)
    })();
  }, [leagueID]);

  useEffect(() => {
    getLeagues();
  }, [getLeagues])

  useEffect(() => {
    getLeagueStates();
  }, [getLeagueStates])

  return (
    <div className="w-[95%] mx-auto pt-[8rem]">
      <div className="mb-[3rem]">
        <div className="flex flex-row justify-center">
          <select
            className="lg:text-[14px] border rounded-md border-[#007033] focus:border-indigo-500 outline-none p-2 mt-2 w-[50%]"
            name="datePeriod"
            value={leagueID}
            onChange={e => {
              setLeagueID(e.target.value);
            }}
          >
            <option value="">Select</option>
            {leagues?.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem]">
        <div className="col-span-4 xs:col-span-6 py-[12px]">
          <div className="content-league xs:h-[71px] lg:h-[74px] lg:w-[77px] xs:w-[5rem] shadow-xl mx-auto">
            <p className="text-center lg:p-[21px] xs:mt-[21px] font-bold">{leaguesStats?.average_confirmed_attendance}</p>
          </div>
          <div className="p text-center mt-2 text-[15px]">
            Avg. Attendance
          </div>
        </div>
        <div className="col-span-4 xs:col-span-6 py-[12px]">
          <div className="content-league xs:h-[71px] lg:h-[74px] lg:w-[77px] xs:w-[5rem] shadow-xl mx-auto">
            <p className="text-center lg:p-[21px] xs:mt-[21px] font-bold">{leaguesStats?.cbr_given}</p>
          </div>
          <div className="p text-center mt-2 text-[15px]">
            CBR Given
          </div>
        </div>
        <div className="col-span-4 xs:col-span-6 py-[12px]">
          <div className="content-league xs:h-[71px] lg:h-[74px] lg:w-[77px] xs:w-[5rem] shadow-xl mx-auto">
            <p className="text-center lg:p-[21px] xs:mt-[21px] font-bold">{leaguesStats?.total_events}</p>
          </div>
          <div className="p text-center mt-2 text-[15px]">
            Total Events
          </div>
        </div>
        <div className="col-span-4 xs:col-span-6 py-[12px]">
          <div className="content-league xs:h-[71px] lg:h-[74px] lg:w-[77px] xs:w-[5rem] shadow-xl mx-auto">
            <p className="text-center lg:p-[21px] xs:mt-[21px] font-bold">{leaguesStats?.league_leads_given}</p>
          </div>
          <div className="p text-center mt-2 text-[15px]">
            Leads Given
          </div>
        </div>
        <div className="col-span-4 xs:col-span-6 py-[12px]">
          <div className="content-league xs:h-[71px] lg:h-[74px] lg:w-[77px] xs:w-[5rem] shadow-xl mx-auto">
            <p className="text-center lg:p-[21px] xs:mt-[21px] font-bold">{leaguesStats?.league_leads_received}</p>
          </div>
          <div className="p text-center mt-2 text-[15px]">
            Leads Received
          </div>
        </div>
        <div className="col-span-4 xs:col-span-6 py-[12px]">
          <div className="content-league xs:h-[71px] lg:h-[74px] lg:w-[77px] xs:w-[5rem] shadow-xl mx-auto">
            <p className="text-center lg:p-[21px] xs:mt-[21px] font-bold">{leaguesStats?.one_to_one_meetings}</p>
          </div>
          <div className="p text-center mt-2 text-[15px]">
            1 to 1 Meeting
          </div>
        </div>
        <div className="col-span-4 xs:col-span-6 py-[12px]">
          <div className="content-league xs:h-[71px] lg:h-[74px] lg:w-[77px] xs:w-[5rem] shadow-xl mx-auto">
            <p className="text-center lg:p-[21px] xs:mt-[21px] font-bold">{leaguesStats?.total_meetings}</p>
          </div>
          <div className="p text-center mt-2 text-[15px]">
            Total Meeting
          </div>
        </div>
        <div className="col-span-4 xs:col-span-6 py-[12px]">
          <div className="content-league xs:h-[71px] lg:h-[74px] lg:w-[77px] xs:w-[5rem] shadow-xl mx-auto">
            <p className="text-center lg:p-[21px] xs:mt-[21px] font-bold">{leaguesStats?.visitors}</p>
          </div>
          <div className="p text-center mt-2 text-[15px]">
            Visitors
          </div>
        </div>
      </div>
    </div>
  );
}