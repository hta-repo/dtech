import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

// APi
import { CreateLeague } from "../../../services/cencom/cencomGeneral.services";

//  Loader
import Spinner from "../../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

const WeekDropdown = [
    { value: 'Sunday', name: "Sunday" },
    { value: 'Monday', name: "Monday" },
    { value: 'Tuesday', name: "Tuesday" },
    { value: 'Wednesday', name: "Wednesday" },
    { value: 'Thursday', name: "Thursday" },
    { value: 'Friday', name: "Friday" },
    { value: 'Saturday', name: "Saturday" },
];

export default function CreateRecurringLeague() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            meeting_name: "",
            venue: "",
            description: "",
            day_of_week: "",
            start_time: "",
            end_time: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("This field is required"),
            meeting_name: yup.string().required("This field is required"),
            venue: yup.string().required("This field is required"),
            description: yup.string().required("This field is required"),
            day_of_week: yup.string().required("This field is required"),
            start_time: yup.string().required('This field is required'),
            end_time: yup.string().required('This field is required'),
        }),
        onSubmit: (values) => {

            (async () => {
                setLoading(true)
                try {
                    const response = await CreateLeague(values);
                    if (response.status) {
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        setLoading(false)
                        navigate(`/admin/leagues`);
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

    return (
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
            <div className="main-content flex flex-col flex-grow">
                <div className="lg:p-10 bg-about text-center">
                    <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]">
                        Create Recurring League
                    </h1>
                </div>
                <div className='my-8'>
                    <div className="lg:w-[50%] xs:w-[80%] mx-auto mb-4 xs:mt-8">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="name">
                                    League Name
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
                                <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="name">
                                    Meeting Name
                                </label>
                                <input
                                    className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    type="text"
                                    name="meeting_name"
                                    value={formik.values.meeting_name}
                                    onChange={e => {
                                        formik.setFieldValue("meeting_name", e.target.value);
                                    }}
                                />
                                {formik.touched.meeting_name && formik.errors.meeting_name ? (
                                    <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.meeting_name}</div>
                                ) : null}
                            </div>
                            <div className="mb-4 lg:mt-[2rem]">
                                <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="name">
                                    Venue
                                </label>
                                <input
                                    className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    type="text"
                                    name="venue"
                                    value={formik.values.venue}
                                    onChange={e => {
                                        formik.setFieldValue("venue", e.target.value);
                                    }}
                                />
                                {formik.touched.venue && formik.errors.venue ? (
                                    <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.venue}</div>
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
                            <div className="mb-8">
                                <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="day_of_week">
                                    Monthly Date
                                </label>
                                <select
                                    name="league_id"
                                    className="mont-serif appearance-none border border-[#007033] focus:border-[#007033] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md"
                                    value={formik.values.day_of_week}
                                    onBlur={formik.handleBlur}
                                    onChange={e => {
                                        formik.setFieldValue("day_of_week", e.target.value);
                                    }}
                                >
                                    <option value="">Select</option>
                                    {WeekDropdown.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.day_of_week && formik.errors.day_of_week ? (
                                    <div className='text-red-500 text-xs text-left mt-2'>{formik.errors.day_of_week}</div>
                                ) : null}
                            </div>
                            <div className="flex lg:flex-row xs:flex-column gap-4">
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
                                        className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[20vw]"
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
                                        className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[20vw]"
                                    />
                                    {formik.touched.end_time && formik.errors.end_time ? (
                                        <div className="text-red-500 text-sm text-left relative mt-2">
                                            {formik.errors.end_time}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-[2rem] mb-4">
                                <button type="submit" className="btn-create mont-serif text-black">
                                    {loading ? <Spinner /> : 'Create'}
                                </button>
                            </div>
                        </form>
                        <div className="flex flex-col justify-center items-center">
                            <button className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black" onClick={() => navigate('/admin/dashboard')}>
                                Cancel
                            </button>
                        </div>
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
