import React, { useEffect, useState, useCallback } from "react";

import { StatsforLeagueAdmin } from "../../../services/stats.services";

import moment from 'moment';

export default function LeagueCount() {
  const [leaguesStats, setLeaguesStats] = useState({});
  const [datePeriod, setDatePeriod] = useState('3');

  const getLeagueStates = useCallback(() => {
    (async () => {
      const d2 = moment(new Date()).subtract(datePeriod, 'months');
      const d3 = moment(d2, 'YYYY-MM-DD')
      const dateFrom = d3.format('YYYY-MM-DD')


      const d = moment(new Date(), 'YYYY-MM-DD')
      const dateTo = d.format('YYYY-MM-DD')

      const data = "?date_from=" + dateFrom + "&date_to=" + dateTo;

      const response = await StatsforLeagueAdmin(data);
      setLeaguesStats(response.data)
    })();
  }, [datePeriod]);

  useEffect(() => {
    getLeagueStates();
  }, [getLeagueStates])

  return (
    <div className="w-[95%] mx-auto">
      <div className="mb-[1.5rem]">
        <div className="flex flex-row justify-center">
          <select
            className="lg:text-[14px] border rounded-md border-[#007033] focus:border-indigo-500 outline-none p-2 mt-2 w-[50%]"
            name="datePeriod"
            value={datePeriod}
            onChange={e => {
              setDatePeriod(e.target.value);
            }}
          >
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
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
