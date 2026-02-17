import React, { useState, useEffect, useCallback } from "react";

//  APi
import GeneralService from "../../../../services/general.services";
import { GetMemebersByLeagID, GetLeagueMembers } from "../../../../services/companies.services";
import { CreateLead } from "../../../../services/lead.services";

//  DatePicher
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//  Formik
import { useFormik } from "formik";
import * as yup from "yup";

//  Loader
import Spinner from "../../../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../../../MessageAlerts";

import moment from 'moment';

import { Autocomplete, TextField } from '@mui/material';

function GuestOnetoone() {
    const [leagues, setleagues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [leagueID, setLeagueID] = useState("");
    const [leagueMembers, setLeagueMembers] = useState([]);
    const [startDate, setStartDate] = useState();

    const [insideButtonSelected, setInsideButtonSelected] = useState(true);
    const [outsideButtonSelected, setOutsideButtonSelected] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const handleInsideButtonClick = () => {
        setInsideButtonSelected(true);
        setOutsideButtonSelected(false);
    };

    const handleOutsideButtonClick = () => {
        setInsideButtonSelected(false);
        setOutsideButtonSelected(true);
    };

    const getLeagues = useCallback(() => {
        (async () => {
            const response = await GeneralService.getAllLeagues();
            setleagues(response.data.data)
        })();
    }, []);

    const getAllLeagueMembers = useCallback(() => {
        (async () => {
            const response = await GetLeagueMembers();
            setLeagueMembers(response.data)
        })();
    }, []);

    useEffect(() => {
        if (insideButtonSelected) {
            getAllLeagueMembers();
            setLeagueID("")
            formik.setFieldValue("given_to", "");
        }
        if (outsideButtonSelected) {
            formik.setFieldValue("given_to", "");
            getLeagues()
            setLeagueMembers([])
        }
    }, [getAllLeagueMembers, getLeagues, insideButtonSelected, outsideButtonSelected]);

    useEffect(() => {
        if (leagueID) {
            (async () => {
                const response = await GetMemebersByLeagID(leagueID);
                setLeagueMembers(response.data)
            })();
        }
    }, [leagueID]);

    const formik = useFormik({
        initialValues: {
            category: "",
            given_to: "",
            invited_by: "",
            mt_location: "",
            mt_dt: "",
            topics: "",
        },
        validationSchema: yup.object({
            category: yup.string(),
            given_to: yup.string().required("This field is required"),
            invited_by: yup.string(),
            mt_location: yup.string().required("This field is required"),
            mt_dt: yup.string(),
            topics: yup.string().required("This field is required"),
        }),
        onSubmit: (values, { resetForm }) => {

            const d = moment(startDate, 'YYYY-MM-DD HH:mm:ss')
            const dateVal = d.format('YYYY-MM-DD')
            values.mt_dt = dateVal;
            values.category = 'one_to_one';

            (async () => {
                setLoading(true)
                try {
                    const response = await CreateLead(values);
                    if (response.status) {
                        resetForm();
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        setLoading(false)
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
        <>
            <div className="xs:mt-8 w-[50%] xs:w-[90%] mx-auto lg:mt-[2rem]">
                <div className="flex flex-row justify-center gap-[4px]">
                    <input
                        type="button"
                        value="Inside"
                        className={`p-2 m-2 rounded-md w-[9rem] cursor-pointer ${insideButtonSelected
                            ? "bg-green-700 text-white"
                            : "bg-white border border-green-700 text-black"
                            }`}
                        onClick={handleInsideButtonClick}
                    />
                    <input
                        type="button"
                        value="Outside"
                        className={`w-[9rem] p-2 m-2 rounded-md cursor-pointer ${outsideButtonSelected
                            ? "bg-green-700 text-white"
                            : "bg-white border border-green-700 text-black"
                            }`}
                        onClick={handleOutsideButtonClick}
                    />
                </div>

                {outsideButtonSelected && (
                    <div className="my-5">
                        <Autocomplete
                            options={leagues}
                            disableClearable
                            getOptionLabel={(option) => option.name}
                            onChange={(e, data) => {
                                setLeagueID(data.id)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="League"
                                />
                            )}
                        />
                    </div>
                )}

                <form onSubmit={formik.handleSubmit}>

                    <div className="my-5">
                        <Autocomplete
                            options={leagueMembers}
                            disableClearable
                            getOptionLabel={(option) => option.name}
                            onChange={(e, data) => {
                                formik.setFieldValue("given_to", data.id);
                                formik.setFieldValue("invited_by", data.id);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Given To:"
                                />
                            )}
                        />
                        {formik.touched.given_to && formik.errors.given_to ? (
                            <div className='text-red-500 text-xs text-left'>{formik.errors.given_to}</div>
                        ) : null}
                    </div>

                    <div className="my-8">
                        <label className="block text-[#005125] font-bold mb-2 mont-serif">
                            Date
                        </label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                            minDate={new Date()}
                            className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none lg:w-[50vw]"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#005125] font-bold mb-2 mont-serif">
                            Location
                        </label>
                        <input
                            className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            type="text"
                            name="mt_location"
                            value={formik.values.mt_location}
                            onChange={e => {
                                formik.setFieldValue("mt_location", e.target.value);
                            }}
                        />
                        {formik.touched.mt_location && formik.errors.mt_location ? (
                            <div className='text-red-500 text-xs text-left'>{formik.errors.mt_location}</div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#005125] font-bold mb-2 mont-serif">
                            Topics
                        </label>
                        <input
                            className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            type="text"
                            name="topics"
                            value={formik.values.topics}
                            onChange={e => {
                                formik.setFieldValue("topics", e.target.value);
                            }}
                        />
                        {formik.touched.topics && formik.errors.topics ? (
                            <div className='text-red-500 text-xs text-left'>{formik.errors.topics}</div>
                        ) : null}
                    </div>

                    <button type="submit" className="btn-create float-right mont-serif text-black lg:mt-[25px] lg:mb-[4rem] xs:mr-[30px]">
                        {loading ? <Spinner /> : 'Confirm'}
                    </button>

                </form>
            </div>
            {error && message?.length > 0 && message?.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
        </>
    );
}

export default GuestOnetoone;

