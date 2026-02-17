import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

//  DatePicher
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

import moment from 'moment';

// APi
import { get_meeting_detail, update_meeting } from "../../services/meetings.services";

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

export default function EditMeeting() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState({});

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const getMeetingDetail = useCallback((id) => {
        (async () => {
            const response = await get_meeting_detail(id);
            setDetail(response.data)
        })();
    }, []);

    useEffect(() => {
        if (id) {
            getMeetingDetail(id);
        }
    }, [id, getMeetingDetail])

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: "",
            start_date: "",
            start_time: "",
            end_date: "",
            end_time: "",
        },
        validationSchema: yup.object({
            id: yup.string(),
            name: yup.string(),
            description: yup.string(),
            start_date: yup.string(),
            end_date: yup.string(),
            start_time: yup.string(),
            end_time: yup.string(),
        }),
        onSubmit: (values, { resetForm }) => {

            const d = moment(startDate, 'YYYY-MM-DD')
            const dateVal = d.format('YYYY-MM-DD')

            values.start_date = dateVal
            values.end_date = dateVal
            values.id = id;

            (async () => {
                setLoading(true)
                try {
                    const response = await update_meeting(values);
                    if (response.status) {
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        setLoading(false)
                        resetForm()
                        navigate(`/meetings`);
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
            formik.setFieldValue("name", detail.name);
            formik.setFieldValue("description", detail.description);
            formik.setFieldValue("start_time", detail.start_time);
            formik.setFieldValue("end_time", detail.end_time);
            const startDate = moment(detail.start_date).toDate();
            const endDate = moment(detail.end_date).toDate();
            setStartDate(startDate)
            setEndDate(endDate)
        }
    }, [detail])

    return (
        <>
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <div className="main-content flex flex-col flex-grow">
                    <div className="lg:p-10 bg-about text-center">
                        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]	 ">
                            Update Meeting
                        </h1>
                    </div>
                    <div className='mb-8'>
                        <div className="lg:w-[50%] xs:w-[80%] mx-auto mb-4 xs:mt-8">
                            <form onSubmit={formik.handleSubmit} className="lg:pt-[2rem]">
                                <div className="mb-4">
                                    <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="name">
                                        Meeting Title
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
                                    <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="description">
                                        Description
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
                                        <label className="block text-[#005125] font-bold mb-2 mont-serif">Date</label>
                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                            minDate={new Date()}
                                            className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[41vw]"
                                        />
                                    </div>
                                </div>
                                <div className="flex lg:flex-row xs:flex-column gap-10">
                                    <div className="mb-4">
                                        <label className="block text-[#005125] font-bold mb-2 mont-serif">Start Time</label>
                                        <input
                                            type="time"
                                            id="start_time"
                                            name="start_time"
                                            value={formik.values.start_time}
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
                                            value={formik.values.end_time}
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
                                <div className="flex flex-col justify-center items-center gap-2 mt-[2rem] mb-4">
                                    {/* <button type="submit" className="lg:w-[11rem] btn-create mont-serif text-black">
                                        {loading ? <Spinner /> : 'Update'}
                                    </button> */}
                                    <button type="submit" className="btn-create mont-serif text-black">
                                        {loading ? <Spinner /> : 'Update'}
                                    </button>
                                    <button onClick={() => navigate('/meetings')} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
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
