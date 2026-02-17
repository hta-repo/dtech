import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchThisWeekEvents } from "../../../utils/LeagueUtils";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [companyId, setCompanyId] = useState("1");
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchData = async () => {
    try {
      const fetchedEvents = await fetchThisWeekEvents(companyId);
      console.log("Fetched league Data:", fetchedEvents);
      setEventsData(fetchedEvents);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [companyId]);

  const contextValue = {
    companyId,
    setCompanyId,
    eventsData,
    setEventsData,
    selectedEvent,
    setSelectedEvent,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
