import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../Carousel";

//  Api
import { GetMyEvents, GetUpcomingEvents, GetPastEvents } from "../../services/events.services";

// Redux
import { useSelector } from "react-redux";

export default function Eventstock() {
  const navigate = useNavigate();
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [upcomEvents, setUpcomEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loadEvents, setLoadEvents] = useState(false);
  const [loadUpcomingEvents, setLoadUpcomingEvents] = useState(false);
  const [loadPastEvents, setLoadPastEvents] = useState(false);

  const getEvents = useCallback(() => {
    (async () => {
      setLoadEvents(true)
      const response = await GetMyEvents("?page=1&limit=10");
      if (response.status) {
        setEvents(response.data.data)
      }
      setLoadEvents(false)
    })();
  }, []);

  const getUpcomEvents = useCallback(() => {
    (async () => {
      setLoadUpcomingEvents(true)
      const response = await GetUpcomingEvents("?page=1&limit=10");
      if (response.status) {
        setUpcomEvents(response.data.data)
      }
      setLoadUpcomingEvents(false)
    })();
  }, []);

  const getPastEvents = useCallback(() => {
    (async () => {
      setLoadPastEvents(true)
      const response = await GetPastEvents("?page=1&limit=10");
      if (response.status) {
        setPastEvents(response.data.data)
      }
      setLoadPastEvents(false)
    })();
  }, []);

  useEffect(() => {
    getEvents();
    getUpcomEvents();
    getPastEvents();
  }, [getEvents, getUpcomEvents, getPastEvents])

  return (
    <main className=" main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center sticky">
          <h1 className="text-center mont-serif font-bold text-2xl text-[#005125]	xs:p-[22px] xs:mt-[6px] ">
            Events
          </h1>
        </div>
        {loggedUserInfo?.is_lg_admin === 1 && (
          <div className="event-shadow xs:h-[20.3rem]">
            <div className="lg:w-[145vh] lg:mx-auto xs:ml-[1rem]">
              <Carousel title="My Events" id="m_id" carouselArray={events} loadSpinner={loadEvents} myEvents={true} />
              <button className="btn-create float-right mont-serif text-black lg:mt-[17px] lg:mb-[24px] xs:mr-[1rem]" onClick={() => navigate(`/create-event`)}>
                Create Event
              </button>
            </div>
          </div>
        )}
        <div className="lg:w-[145vh] lg:mx-auto">
          <Carousel title="Upcomming Events" id="up_id" carouselArray={upcomEvents} loadSpinner={loadUpcomingEvents} />
        </div>
        <div className="lg:w-[145vh] lg:mx-auto mb-12">
          <Carousel title="Gallery" id="g_id" carouselArray={pastEvents} loadSpinner={loadPastEvents} gallery={true} />
        </div>
      </div>
    </main>
  );
}
