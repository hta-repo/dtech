import React, { useState, useEffect, useCallback } from "react";

//  APi
import GeneralService from "../../services/general.services";
import { GetMemebersByLeagID, GetLeagueMembers, CreateComplaint } from "../../services/companies.services";

//  Formik
import { useFormik } from "formik";
import * as yup from "yup";

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

//  Redux
import { useSelector } from "react-redux";

function Complain() {
    const { loggedUserInfo } = useSelector((state) => state.auth);
    const [leagues, setleagues] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [leagueID, setLeagueID] = useState("");
    const [leagueMembers, setLeagueMembers] = useState([]);

    const [newButtonSelected, setNewButtonSelected] = useState(true);
    const [reapeatButtonSelected, setReapeatButtonSelected] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const handleNewButtonClick = () => {
        setNewButtonSelected(true);
        setReapeatButtonSelected(false);
        formik.setFieldValue("type", "in_league");
    };

    const handleReapeatButtonClick = () => {
        setNewButtonSelected(false);
        setReapeatButtonSelected(true);
        formik.setFieldValue("type", "cross_league");
    };

    const getLeagues = useCallback(() => {
        (async () => {
            const response = await GeneralService.getAllLeagues();
            setleagues(response.data.data)
        })();
    }, []);

    const getMembers = useCallback(() => {
        (async () => {
            const response = await GetLeagueMembers();
            setMembers(response.data)
        })();
    }, []);

    useEffect(() => {
        getMembers();
        getLeagues();
    }, [getMembers, getLeagues]);

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
            type: "",
            message: "",
            accused: "",
        },
        validationSchema: yup.object({
            type: yup.string(),
            message: yup.string().required("This field is required"),
            accused: yup.string(),
        }),
        onSubmit: (values, { resetForm }) => {
            if (values.type === "") {
                values.type = "in_league";
            }

            (async () => {
                setLoading(true)
                try {
                    const response = await CreateComplaint(values);
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
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <div className="main-content flex flex-col flex-grow">
                    <div className="lg:p-10 bg-about text-center">
                        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]">
                            Complaint
                        </h1>
                    </div>
                    <div className="xs:mt-8 w-[50%] xs:w-[90%] mx-auto lg:mt-[2rem]">
                        <div className="mb-[3rem]">
                            <div className="flex flex-row justify-center">
                                <div className="flex flex-row justify-center gap-[4px]">
                                    <input
                                        type="button"
                                        value="In League"
                                        className={`p-2 m-2 rounded-md w-[9rem] cursor-pointer ${newButtonSelected
                                            ? "bg-green-700 text-white"
                                            : "bg-white border border-green-700 text-black"
                                            }`}
                                        onClick={handleNewButtonClick}
                                    />
                                    <input
                                        type="button"
                                        value="Cross League"
                                        className={`w-[9rem] p-2 m-2 rounded-md cursor-pointer ${reapeatButtonSelected
                                            ? "bg-green-700 text-white"
                                            : "bg-white border border-green-700 text-black"
                                            }`}
                                        onClick={handleReapeatButtonClick}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#005125] font-bold mb-2 mont-serif">
                                Full Name
                            </label>
                            <input
                                className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                type="text"
                                name="aed"
                                disabled
                                value={loggedUserInfo?.name}
                            />
                        </div>

                        <form onSubmit={formik.handleSubmit}>

                            {formik.values.type === "cross_league" ? (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-[#005125] font-bold mb-1 mont-serif">
                                            League
                                        </label>
                                        <select
                                            className="lg:text-[14px] border rounded-md border-[#007033] focus:border-indigo-500 outline-none p-2 mt-2 w-full"
                                            name="leagueID"
                                            value={leagueID}
                                            onChange={e => {
                                                setLeagueID(e.target.value)
                                            }}
                                        >
                                            <option value="">Select</option>
                                            {leagues.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-[#005125] font-bold mb-1 mont-serif">
                                            Complaint Regarding
                                        </label>
                                        <select
                                            className="lg:text-[14px] border rounded-md border-[#007033] focus:border-indigo-500 outline-none p-2 mt-2 w-full"
                                            name="accused"
                                            value={formik.values.accused}
                                            onChange={e => {
                                                formik.setFieldValue("accused", e.target.value);
                                            }}
                                        >
                                            <option value="">Select</option>
                                            {leagueMembers.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-4">
                                    <label className="block text-[#005125] font-bold mb-1 mont-serif">
                                        Complaint Regarding
                                    </label>
                                    <select
                                        className="lg:text-[14px] border rounded-md border-[#007033] focus:border-indigo-500 outline-none p-2 mt-2 w-full"
                                        name="leagueID"
                                        value={formik.values.accused}
                                        onChange={e => {
                                            formik.setFieldValue("accused", e.target.value);
                                        }}
                                    >
                                        <option value="">Select</option>
                                        {members.map((option, index) => (
                                            <option key={index} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="block text-[#005125] font-bold mb-2 mont-serif">
                                    Leave a Message
                                </label>
                                <textarea
                                    rows="4"
                                    className="lg:text-[14px] block p-2 mt-3 bg-white border border-green-800 rounded-md focus:border-blue-500 focus:outline-none focus:ring w-full"
                                    name="message"
                                    value={formik.values.message}
                                    onChange={e => {
                                        formik.setFieldValue("message", e.target.value);
                                    }}
                                />
                                {formik.touched.message && formik.errors.message ? (
                                    <div className='text-red-500 text-xs text-left'>{formik.errors.message}</div>
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
                </div>
            </main>
        </>
    );
}

export default Complain;

