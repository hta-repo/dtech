
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MeetingCaurosel from "../MeetingCaurosel";

//  Api
import { get_upcoming_meetings, get_my_meetings, get_past_meetings } from "../../services/meetings.services";

// Redux
import { useSelector } from "react-redux";

export default function Meetingstock() {
  const navigate = useNavigate();
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const [upcomMeetings, setUpcomMeetings] = useState([]);
  const [myMeetings, setMyMeetings] = useState([]);
  const [pastMeetings, setPastMeetings] = useState([]);
  const [loadMyMeetings, setLoadMyMeetings] = useState(false);
  const [loadUpcomingMeetings, setLoadUpcomingMeetings] = useState(false);
  const [loadPastMeetings, setLoadPastMeetings] = useState(false);

  const getMyMeetings = useCallback(() => {
    (async () => {
      setLoadMyMeetings(true)
      const response = await get_my_meetings("?page=1&limit=10");
      if (response.status) {
        setMyMeetings(response.data.data)
      }
      setLoadMyMeetings(false)
    })();
  }, []);

  const getUpcommingMeetings = useCallback(() => {
    (async () => {
      setLoadUpcomingMeetings(true)
      const response = await get_upcoming_meetings("?page=1&limit=10");
      if (response.status) {
        setUpcomMeetings(response.data.data)
      }
      setLoadUpcomingMeetings(false)
    })();
  }, []);

  const getPastgMeetings = useCallback(() => {
    (async () => {
      setLoadPastMeetings(true)
      const response = await get_past_meetings("?page=1&limit=10");
      if (response.status) {
        setPastMeetings(response.data.data)
      }
      setLoadPastMeetings(false)
    })();
  }, []);

  useEffect(() => {
    getMyMeetings();
    getUpcommingMeetings();
    getPastgMeetings();
  }, [getMyMeetings, getUpcommingMeetings, getPastgMeetings])

  return (
    <main className=" main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center sticky">
          <h1 className="text-center mont-serif font-bold text-2xl text-[#005125]	xs:p-[22px] xs:mt-[6px] ">
            Meetings
          </h1>
        </div>
        {loggedUserInfo?.is_lg_admin === 1 && (
          <div className="event-shadow xs:h-[20.3rem]">
            <div className="lg:w-[145vh] lg:mx-auto xs:ml-[1rem]">
              <MeetingCaurosel title="My Meetings" id="mee_id" carouselArray={myMeetings} loadSpinner={loadMyMeetings} myEvents={true} />
              <button className="btn-create float-right mont-serif text-black lg:mt-[17px] lg:mb-[24px] xs:mr-[1rem]" onClick={() => navigate(`/create-meeting`)}>
                Create Meeting
              </button>
            </div>
          </div>
        )}
        <div className="lg:w-[145vh] lg:mx-auto">
          <MeetingCaurosel title="Upcoming Meetings" id="upcom_id" carouselArray={upcomMeetings} loadSpinner={loadUpcomingMeetings} />
        </div>
        <div className="lg:w-[145vh] lg:mx-auto mb-[5rem]">
          <MeetingCaurosel title="Previously Attended by You" id="past_id" carouselArray={pastMeetings} loadSpinner={loadPastMeetings} />
        </div>
      </div>
    </main>
  );
}
