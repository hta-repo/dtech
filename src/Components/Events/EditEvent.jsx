import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

// FlatPickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

//  DatePicher
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

import moment from 'moment';

// APi
import { GetEventDetail, UpdateEvent } from "../../services/events.services";

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

export default function EditEvent() {
    const startDateInputRef = useRef(null);
    const endDateInputRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState({});

    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    // const handleStartDateChange = (date) => {
    //     setStartDate(date);
    // };

    // const handleEndDateChange = (date) => {
    //     setEndDate(date);
    // };

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

    function PreviousImage(url) {
        let output = document.getElementById('uploadPreview');

        if (url) {
            output.style.backgroundImage = `url('${process.env.REACT_APP_API_IMAGE_URL + url}')`;
            output.style.backgroundSize = 'cover';
            output.style.backgroundRepeat = 'no-repeat';
            output.style.backgroundPosition = 'center center';
        } else {
            output.style.backgroundImage = 'none';
        }
    }

    const getCompDetail = useCallback((id) => {
        (async () => {
            const response = await GetEventDetail(id);
            setDetail(response.data)
            PreviousImage(response.data.cover)
        })();
    }, []);

    useEffect(() => {
        if (id) {
            getCompDetail(id);
        }
    }, [id, getCompDetail])

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            event_type: "",
            description: "",
            start_date: "",
            start_time: "",
            end_date: "",
            end_time: "",
            all_day: "",
            cover: "",
        },
        validationSchema: yup.object({
            id: yup.string(),
            name: yup.string().required("This field is required"),
            event_type: yup.string().required("This field is required"),
            description: yup.string().required("This field is required"),
            start_date: yup.string().required("This field is required"),
            end_date: yup.string().required("This field is required"),
            start_time: yup.string().required("This field is required"),
            end_time: yup.string().required("This field is required"),
            all_day: yup.string(),
            cover: yup.string(),
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
            values.id = id;
            if (values.cover === "") {
                delete values.cover
            }

            (async () => {
                setLoading(true)
                try {
                    const response = await UpdateEvent(values);
                    if (response.status) {
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        setLoading(false)
                        resetForm()
                        navigate(`/event`);
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
        if (detail) {
            console.log(detail, 'detail')
            formik.setFieldValue("name", detail.name);
            formik.setFieldValue("event_type", detail.event_type);
            formik.setFieldValue("description", detail.description);
            formik.setFieldValue("all_day", detail.all_day === 1 ? true : false);
            formik.setFieldValue("start_time", detail.start_time);
            formik.setFieldValue("end_time", detail.end_time);

            const startDatePicker = flatpickr(startDateInputRef.current, {
                dateFormat: 'Y-m-d',
                minDate: 'today',
                defaultDate: detail.start_date,
                onClose(selectedDates) {
                    if (selectedDates.length > 0) {
                        const selectedStartDate = selectedDates[0];
                        formik.setFieldValue('start_date', selectedStartDate);

                        // Update minDate for the End Date picker
                        endDatePicker.set('minDate', selectedStartDate);

                        // Check if the Start Date is greater than the current End Date
                        const currentEndDate = endDatePicker.selectedDates[0];
                        if (currentEndDate && selectedStartDate > currentEndDate) {
                            // If Start Date is greater, set End Date to Start Date
                            endDatePicker.setDate(selectedStartDate);
                            formik.setFieldValue('end_date', selectedStartDate);
                        }
                    }
                },
            });

            // Initialize Flatpickr for End Date
            const endDatePicker = flatpickr(endDateInputRef.current, {
                dateFormat: 'Y-m-d',
                minDate: 'today',
                defaultDate: detail.end_date,
                onClose(selectedDates) {
                    if (selectedDates.length > 0) {
                        const selectedEndDate = selectedDates[0];
                        formik.setFieldValue('end_date', selectedEndDate);
                    }
                },
            });

            startDatePicker.close();
            endDatePicker.close();
        }
    }, [detail])

    return (
        <>
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <div className="main-content flex flex-col flex-grow">
                    <div className="lg:p-10 bg-about text-center">
                        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]">
                            Update Event
                        </h1>
                    </div>
                    <Tabs className="" >
                        <TabList className="xs:sticky xs:top-0 xs:bg-white flex justify-center lg:gap-[18rem] shadow-md p-2 xs:gap-[2rem]">
                            <Tab
                                className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ${activeTab === 0 ? 'border-b-4 transition-all duration-500' : ''
                                    } focus:outline-none`}
                                onClick={() => handleTabClick(0)}
                            >
                                Event Detail
                            </Tab>
                            <Tab
                                className={`text-[#000000] mont-serif text-xl cursor-pointer mt-2 ${activeTab === 1 ? 'border-b-4 transition-all duration-500' : ''
                                    } focus:outline-none`}
                                onClick={() => handleTabClick(1)}
                            >
                                Gallery
                            </Tab>
                        </TabList>

                        <TabPanel>
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

                                        {/* <div className="flex lg:flex-row xs:flex-column gap-10">
                                            <div className="mb-4">
                                                <label className="block text-[#005125] font-bold mb-2 mont-serif">Start Date</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={handleStartDateChange}
                                                    selectsStart
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    minDate={new Date()}
                                                    placeholderText="Start Date"
                                                    className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[19vw]"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-[#005125] font-bold mb-2 mont-serif">End Date</label>
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={handleEndDateChange}
                                                    selectsEnd
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    minDate={startDate}
                                                    placeholderText="End Date"
                                                    className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[19vw]"
                                                />
                                            </div>
                                        </div> */}

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
                                                        // value={formik.values.all_day}
                                                        checked={formik.values.all_day}
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
                                        </div>
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
                                        {/* <div className="flex flex-col justify-center items-center gap-2 mt-[2rem] mb-4">
                                            <button type="submit" className="lg:w-[11rem] btn-create mont-serif text-black">
                                                {loading ? <Spinner /> : 'Update'}
                                            </button>
                                            <button onClick={() => navigate('/event')} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black">
                                                Cancel
                                            </button>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='mb-8'>
                                <div className="lg:w-[50%] xs:w-[80%] mx-auto mb-4 xs:mt-8">
                                    <div className="mb-4 lg:mt-[2rem]">
                                        {/* <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="description">
                                            Gallery
                                        </label> */}
                                        <textarea
                                            className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md"
                                            rows="12"
                                            name="desc"
                                            values=""
                                        // value={formik.values.description}
                                        // onChange={e => {
                                        //     formik.setFieldValue("description", e.target.value);
                                        // }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                    <div className="flex flex-col justify-center items-center gap-2 mt-[2rem] mb-[5rem]">
                        <button onClick={formik.handleSubmit} type="submit" className="btn-create mont-serif text-black">
                            {loading ? <Spinner /> : 'Update'}
                        </button>
                        <button onClick={() => navigate('/event')} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black">
                            Cancel
                        </button>
                    </div>
                </div>
            </main>
            {error && message?.length > 0 && message?.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
        </>
    )
}
