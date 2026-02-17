
import React, { useEffect, useState, useCallback } from "react";
import { Chart } from "react-google-charts";

//  Api
import { GetMemeberCountLeagueList } from "../../../services/cencom/cencomGeneral.services";

import Spinner from "../../Spinner/Spinner"

function MonthlyReport() {
  const chartOptions = {
    legend: "none",
    pieSliceText: "label",
    pieStartAngle: 100,
    chartArea: { width: "95%", height: "95%" },
    width: "400px",
    height: "300px",
  };

  const [leagueStats, setLeagueStats] = useState([]);
  const [data, setData] = useState([]);

  const getLeagueStats = useCallback(() => {
    (async () => {
      const response = await GetMemeberCountLeagueList();
      setData(response.data)
      const originalData = response.data;
      const chartData = [["Task", "Hours per Day"]];

      originalData.forEach(item => {
        chartData.push([item.league, item.users]);
      });
      setLeagueStats(chartData)
    })();
  }, []);

  useEffect(() => {
    getLeagueStats();
  }, [getLeagueStats])

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="item-1">
          <div className="mt-[2rem]">
            {leagueStats?.length > 0 ? (
              <Chart
                chartType="PieChart"
                data={leagueStats}
                options={chartOptions}
              />
            ) : (
              <Spinner />
            )}
          </div>
        </div>

        <div className="item-2">
          {data?.map((item, index) => (
            <div className="grid grid-cols-12 py-[1px]" key={index}>
              <div className="col-span-2 xs:col-span-12"></div>
              <div className="col-span-6 xs:col-span-6">
                <p className="text text-green-700">{item.league}</p>
              </div>
              <div className="col-span-4 xs:col-span-4">
                <p className="text text-green-700">{item.users}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MonthlyReport;
