import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Carousel from "../Carousel";

import { AiOutlineEdit } from "react-icons/ai";

// Api
import { GetEventDetail, GetUpcomingEvents, RegisterForEvents } from '../../services/events.services'

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

import moment from 'moment';

//  Redux
import { useSelector } from "react-redux";

export default function Eventdetails() {
  const { id } = useParams();
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [upcomEvents, setUpcomEvents] = useState([]);
  const [registerEvent, setRegisterEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadUpcomingEvents, setLoadUpcomingEvents] = useState(false);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const getDetail = useCallback(() => {
    (async () => {
      const response = await GetEventDetail(id);
      setDetail(response.data)
    })();
  }, [id]);

  const getUpcomEvents = useCallback(() => {
    (async () => {
      setLoadUpcomingEvents(true)
      const response = await GetUpcomingEvents("?page=1&limit=20");
      if (response.status) {
        setUpcomEvents(response.data.data)
      }
      setLoadUpcomingEvents(false)
    })();
  }, []);

  useEffect(() => {
    if (id) {
      getDetail();
    }
    getUpcomEvents();
  }, [id, getDetail, getUpcomEvents])

  useEffect(() => {
    if (registerEvent) {
      (async () => {
        const formData = new FormData();
        formData.append("event_id", id);
        setLoading(true)
        try {
          const response = await RegisterForEvents(formData);
          if (response.status) {
            getDetail()
            setError(true)
            setVariant('success')
            setMessage([response.message])
            setLoading(false)
            setRegisterEvent(false)
          }
        } catch (error) {
          setError(true)
          setVariant('error')
          const err = error.response.data.errors;
          setMessage(err)
          setLoading(false)
          setRegisterEvent(false)
        }
      })();
    }
  }, [registerEvent, id, getDetail])

  return (
    <>
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div className="main-content flex flex-col flex-grow">
          <div className="lg:p-10 bg-about text-center">
            <span className="text-center mont-serif font-semibold text-2xl text-[#005125]	xs:p-[22px] xs:mt-[6px] ">
              Event Detail
            </span>
            {detail?.created_by === loggedUserInfo?.id && (
              <span className="float-right cursor-pointer" onClick={() => navigate('/edit-event/' + id)}>
                <AiOutlineEdit style={{ fontSize: "30px" }} />
              </span>
            )}
          </div>
          <section className=" body-font mt-8">
            <div className="container mx-auto flex flex-col justify-center items-center">
              <img
                className="lg:w-[818px] lg:h-[457px] md:w-3/6 w-5/6 mb-10  object-center rounded"
                src={process.env.REACT_APP_API_IMAGE_URL + detail.cover}
                alt={detail.cover}
              />
              <div className="lg:w-[86%] lg:mx-auto">
                <h1 className="text-2xl title-font mb-4 text-[#005125] tracking-tight text-left mont-serif font-semibold flex flex-col">
                  {detail.name}
                </h1>

                <p className=" text-[#424242] mb-2 leading-relaxed mont-serif">
                  {detail.description}
                </p>
                {/* <h1 className="text-2xl title-font mb-4 text-[#005125] tracking-tight text-left mt-9  mont-serif font-semibold">
                  Event Details
                </h1> */}
                <div>
                  <ul className="flex flex-col text-[#424242] list-disc mt-[2rem] list-none">
                    {detail.location && (
                      <li className="list-dic text-[#424242] mont-serif">
                        <span className="text-lg text-[#005125] mont-serif font-bold">Location:   </span>
                        {detail.location}
                      </li>
                    )}
                    <li className="list-dic text-[#424242] mont-serif mt-2">
                      <span className="text-lg text-[#005125] mont-serif font-bold">No. of attendees:   </span>
                      {detail.attendees}
                    </li>
                    <li className="list-dic text-[#424242] mont-serif mt-2">
                      <span className="text-lg text-[#005125] mont-serif font-bold">Start Date:   </span>
                      {moment(detail.start_date).format("DD MMM, YYYY")},  {moment(detail.start_date + ' ' + detail.start_time).format("hh:mm A")}
                    </li>
                    <li className="list-dic text-[#424242] mont-serif mt-2">
                      <span className="text-lg text-[#005125] mont-serif font-bold">End Date:   </span>
                      {moment(detail.end_date).format("DD MMM, YYYY")},  {moment(detail.end_date + ' ' + detail.end_time).format("hh:mm A")}
                    </li>
                  </ul>
                </div>
                <div className="lg:mt-[2rem] flex flex-col justify-center items-center gap-2">
                  {state === null && (
                    <>
                      {detail.registered === 0 && (
                        <button onClick={() => setRegisterEvent(true)} className="btn-create float-right mont-serif text-[#005125]">
                          {loading ? <Spinner /> : 'Register now'}
                        </button>
                      )}
                    </>
                  )}
                  <button onClick={() => navigate(`/event`)} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black button-1-hover">
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </section>
          <div className="lg:mb-9 lg:w-[145vh] lg:relative lg:mx-auto">
            <Carousel title="Others Upcomming Events" id="other_id" carouselArray={upcomEvents} loadSpinner={loadUpcomingEvents} />
          </div>
        </div>
      </main>
      {error && message?.length > 0 && message?.map((msg) => (
        <MessageAlerts message={msg} variant={variant} setError={setError} />
      ))
      }
    </>
  );
}
