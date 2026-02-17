import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// FlatPickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

import moment from 'moment';

// APi
import { CreateEvent } from "../../../services/events.services";

//  Loader
import Spinner from "../../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../../MessageAlerts";

export default function Neweventform() {
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  // const startTimeInputRef = useRef(null);
  // const endTimeInputRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const startTimePicker = flatpickr(startTimeInputRef.current, {
  //     enableTime: true,
  //     noCalendar: true,
  //     dateFormat: 'H:i', // 24-hour time format
  //     minTime: '00:00',
  //     maxTime: '23:59',
  //   });

  //   const endTimePicker = flatpickr(endTimeInputRef.current, {
  //     enableTime: true,
  //     noCalendar: true,
  //     dateFormat: 'H:i',
  //     minTime: '00:00',
  //     maxTime: '23:59',
  //   });

  //   // Get the current time
  //   const now = new Date();

  //   // Add event listener for start time changes
  //   startTimePicker.config.onChange.push(selectedDates => {
  //     const selectedStart = selectedDates[0];
  //     const selectedEnd = endTimePicker.selectedDates[0];

  //     if (selectedEnd && selectedStart >= selectedEnd) {
  //       // Set the end time to be half an hour ahead of the start time
  //       const newEndTime = new Date(selectedStart.getTime() + 30 * 60000);
  //       endTimePicker.setDate(newEndTime);
  //     }

  //     // Ensure that the start time is not earlier than the current time
  //     if (selectedStart < now) {
  //       startTimePicker.setDate(now);
  //     }
  //   });

  //   // Add event listener for end time changes
  //   endTimePicker.config.onChange.push(selectedDates => {
  //     const selectedEnd = selectedDates[0];
  //     const selectedStart = startTimePicker.selectedDates[0];

  //     if (selectedStart && selectedEnd <= selectedStart) {
  //       // Set the start time to be half an hour before the end time
  //       const newStartTime = new Date(selectedEnd.getTime() - 30 * 60000);
  //       startTimePicker.setDate(newStartTime);
  //     }
  //   });
  // }, []);



  function PreviewImage(event) {
    let output = document.getElementById('uploadPreview');
    let file = event.target.files[0];

    if (file) {
      let reader = new FileReader();

      reader.onload = function (e) {
        output.style.backgroundImage = `url('${e.target.result}')`;
        output.style.backgroundSize = `cover`;
        output.style.backgroundRepeat = `no-repeat`;
        output.style.backgroundPosition = `center center`;
      };

      reader.readAsDataURL(file);
    } else {
      output.style.backgroundImage = 'none';
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      event_type: "",
      description: "",
      start_date: "",
      end_date: "",
      start_time: '09:00',
      end_time: '18:00',
      all_day: "",
      cover: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("This field is required"),
      event_type: yup.string().required("This field is required"),
      description: yup.string().required("This field is required"),
      start_date: yup.string().required('This field is required'),
      end_date: yup.string().required('This field is required'),
      start_time: yup.string().required('This field is required'),
      end_time: yup.string().required('This field is required'),
      cover: yup.string().required('This field is required'),
      all_day: yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {

      const s_Date = moment(values.start_date, 'YYYY-MM-DD HH:mm:ss');
      const e_Date = moment(values.end_date, 'YYYY-MM-DD HH:mm:ss');

      values.start_date = s_Date.format('YYYY-MM-DD')
      values.end_date = e_Date.format('YYYY-MM-DD')

      if (values.all_day === true) {
        values.start_time = "09:00"
        values.end_time = "18:00"
      }
      values.all_day = values.all_day === true ? 1 : 0;

      (async () => {
        setLoading(true)
        try {
          const response = await CreateEvent(values);
          if (response.status) {
            setError(true)
            setVariant('success')
            setMessage([response.message])
            setLoading(false)
            resetForm()
            navigate(`/approval-pending`);
          }
        } catch (error) {
          setError(true)
          setVariant('error')
          const err = error.response.data.errors;
          setMessage(err)
          setLoading(false)
        }
      })();
    },
  });

  useEffect(() => {
    flatpickr(startDateInputRef.current, {
      dateFormat: 'Y-m-d',
      minDate: 'today',
      onClose(selectedDates) {
        if (selectedDates.length > 0) {
          const selectedStartDate = selectedDates[0];
          endDatePicker.set('minDate', selectedStartDate);
          formik.setFieldValue('start_date', selectedStartDate);
        }
      },
    });

    const endDatePicker = flatpickr(endDateInputRef.current, {
      dateFormat: 'Y-m-d',
      minDate: 'today',
      onClose(selectedDates) {
        if (selectedDates.length > 0) {
          const selectedEndDate = selectedDates[0];
          formik.setFieldValue('end_date', selectedEndDate);
        }
      },
    });
  }, []);

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center">
          <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]	 ">
            New Event
          </h1>
        </div>
        <div className='mb-8'>
          <div className="lg:w-[50%] xs:w-[80%] mx-auto mb-4 xs:mt-8">
            <form onSubmit={formik.handleSubmit} className="lg:pt-[2rem]">
              <div className="mb-4">
                <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="name">
                  Event Title
                </label>
                <input
                  className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={e => {
                    formik.setFieldValue("name", e.target.value);
                  }}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="mb-4 lg:mt-[2rem]">
                <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="event_type">
                  Event Type
                </label>
                <input
                  className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  name="event_type"
                  value={formik.values.event_type}
                  onChange={e => {
                    formik.setFieldValue("event_type", e.target.value);
                  }}
                />
                {formik.touched.event_type && formik.errors.event_type ? (
                  <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.event_type}</div>
                ) : null}
              </div>
              <div className="mb-4 lg:mt-[2rem]">
                <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="description">
                  Add a short description
                </label>
                <textarea
                  className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md"
                  rows="8"
                  name="description"
                  value={formik.values.description}
                  onChange={e => {
                    formik.setFieldValue("description", e.target.value);
                  }}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.description}</div>
                ) : null}
              </div>
              <div className="flex lg:flex-row xs:flex-column gap-10">
                <div className="mb-4">
                  <label className="block text-[#005125] font-bold mb-2 mont-serif">Start Date</label>
                  <input
                    type="text"
                    ref={startDateInputRef}
                    placeholder="Start Date"
                    className="mont-serif appearance-none border border-[#007033] focus:border-[#007033] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[19vw]"
                  />
                  {formik.touched.start_date && formik.errors.start_date ? (
                    <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.start_date}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="block text-[#005125] font-bold mb-2 mont-serif">End Date</label>
                  <input
                    type="text"
                    ref={endDateInputRef}
                    placeholder="End Date"
                    className="mont-serif appearance-none border border-[#007033] focus:border-[#007033] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[19vw]"
                  />
                  {formik.touched.end_date && formik.errors.end_date ? (
                    <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.end_date}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-row gap-6 my-5">
                <div className="lg:w-[90%]">
                  <label htmlFor="checkbox1" className="block text-[#005125] font-bold mb-2 mont-serif">
                    All day event
                  </label>
                </div>
                <div className="slides">
                  <label className="switch">
                    <input
                      type="checkbox"
                      value={formik.values.all_day}
                      onChange={e => {
                        formik.setFieldValue("all_day", e.target.checked);
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              <hr className="border-b border-[#007033] w-full mb-8" />
              <div className="flex lg:flex-row xs:flex-column gap-10">
                <div className="mb-4">
                  <label className="block text-[#005125] font-bold mb-2 mont-serif">Start Time</label>
                  <input
                    type="time"
                    id="start_time"
                    name="start_time"
                    value={formik.values.all_day === true ? "09:00" : formik.values.start_time}
                    disabled={formik.values.all_day === true}
                    onChange={e => {
                      const newStartTime = e.target.value;
                      const currentEndTime = formik.values.end_time;

                      if (newStartTime > currentEndTime) {
                        formik.setFieldValue("end_time", newStartTime);
                      }
                      formik.setFieldValue("start_time", newStartTime);
                    }}
                    className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[19vw]"
                  />
                  {formik.touched.start_time && formik.errors.start_time ? (
                    <div className="text-red-500 text-sm text-left relative mt-2">
                      {formik.errors.start_time}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="block text-[#005125] font-bold mb-2 mont-serif">End Time</label>
                  <input
                    type="time"
                    id="end_time"
                    name="end_time"
                    value={formik.values.all_day === true ? "18:00" : formik.values.end_time}
                    disabled={formik.values.all_day === true}
                    onChange={e => {
                      const newEndTime = e.target.value;
                      const currentStartTime = formik.values.start_time;

                      if (newEndTime < currentStartTime) {
                        formik.setFieldValue("start_time", newEndTime);
                      }
                      formik.setFieldValue("end_time", newEndTime);
                    }}
                    className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[19vw]"
                  />
                  {formik.touched.end_time && formik.errors.end_time ? (
                    <div className="text-red-500 text-sm text-left relative mt-2">
                      {formik.errors.end_time}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* <div className="flex lg:flex-row xs:flex-column gap-10">
                <div className="mb-4">
                  <label className="block text-[#005125] font-bold mb-2 mont-serif">Start Time</label>
                  <input type="time" id="appt" name="appt"
                    value={formik.values.all_day === true ? "09:00" : formik.values.start_time}
                    disabled={formik.values.all_day === true}
                    onChange={e => {
                      formik.setFieldValue("start_time", e.target.value);
                    }}
                    className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[19vw]"
                  />
                  {formik.touched.start_time && formik.errors.start_time ? (
                    <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.start_time}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="block text-[#005125] font-bold mb-2 mont-serif">End Time</label>
                  <input type="time" id="appt" name="appt"
                    value={formik.values.all_day === true ? "18:00" : formik.values.end_time}
                    disabled={formik.values.all_day === true}
                    onChange={e => {
                      formik.setFieldValue("end_time", e.target.value);
                    }}
                    className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[19vw]"
                  />
                  {formik.touched.end_time && formik.errors.end_time ? (
                    <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.end_time}</div>
                  ) : null}
                </div>
              </div> */}
              <div className="flex flex-row gap-6 my-5">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                    <div id="uploadPreview" className="m-3 w-full h-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      </div>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={(event) => {
                      PreviewImage(event)
                      formik.setFieldValue("cover", event.target.files[0]);
                    }} />
                  </label>
                </div>
              </div>
              {formik.touched.cover && formik.errors.cover ? (
                <div className="text-red-500 text-sm text-left relative mt-1">
                  {formik.errors.cover}
                </div>
              ) : null}
              <div className="flex flex-col justify-center items-center gap-2 mt-[2rem] mb-4">
                <button type="submit" className="btn-create mont-serif text-black">
                  {loading ? <Spinner /> : 'Create Event'}
                </button>
                <button onClick={() => navigate('/event')} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black">
                  Cancel
                </button>
              </div>
            </form>
          </div>
          {error && message?.length > 0 && message?.map((msg) => (
            <MessageAlerts message={msg} variant={variant} setError={setError} />
          ))
          }
        </div>
      </div>
    </main>
  )
}
