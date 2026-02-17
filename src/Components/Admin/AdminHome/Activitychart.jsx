import React, { useEffect, useState, useCallback } from "react";
import { Chart } from "react-google-charts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

import { GetLeadActivity, GetCBRLeagueWise } from "../../../services/cencom/cencomGeneral.services";

import Spinner from "../../Spinner/Spinner"
import moment from 'moment'

export function Activitychart() {
  const chartOptions = {
    colors: ['#25CDA5', '#F39B65'],
    // chartArea: { width: "95%", height: "95%" },
    // width: "400px",
    // height: "300px",
  };

  const [leadActivity, setLeadActivity] = useState([]);

  const getActivity = useCallback(() => {
    (async () => {
      const response = await GetLeadActivity();
      const originalData = response.data;
      const chartData = [["Date", "Lead", "CBR"],];

      originalData.forEach(item => {
        chartData.push([moment(item.date).format('DD MMM'), item.lead, item.cbr]);
      });
      setLeadActivity(chartData)
    })();
  }, []);

  useEffect(() => {
    getActivity();
  }, [getActivity]);

  return (
    <>
      <h3 className="text mt-3">
        Leads Activity
      </h3>
      {leadActivity?.length > 0 ? (
        <div className="mt-[2rem]">
          <Chart
            chartType="Bar"
            width="100%"
            height="350px"
            options={chartOptions}
            data={leadActivity}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export function MonthlyCBRChart() {
  const [cbrLeagueActivity, setCBRLeagueActivity] = useState([]);

  const getCBRLeagueActivity = useCallback(() => {
    (async () => {
      const response = await GetCBRLeagueWise();
      const originalData = response.data;

      const chartData = originalData.map(item => ({
        league: item.league,
        amount: item.amount,
      }));

      setCBRLeagueActivity(chartData)
    })();
  }, []);

  useEffect(() => {
    getCBRLeagueActivity();
  }, [getCBRLeagueActivity]);

  return (
    <>
      <h3 className="text">
        Monthly CBR
      </h3>
      {cbrLeagueActivity?.length > 0 ? (
        <div>
          <BarChart width={560} height={500} data={cbrLeagueActivity}>
            <XAxis dataKey="league" angle={-45} textAnchor="end" minTickGap={-100} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="amount" fill="#25CDA5" />
          </BarChart>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}
