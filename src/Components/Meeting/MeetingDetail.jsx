import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AiOutlineEdit } from "react-icons/ai";

// Api
import { get_meeting_detail, mark_meeting_attendance, SubmitAttendence } from '../../services/meetings.services'
import { GetLeagueMembersForGuest } from '../../services/companies.services'

//  Image
import DefaultImage from "../../assets/defaultImage.png"
import CheckIcon from "../../assets/checkIcon.png"
import UnCheckIcon from "../../assets/uncheckIcon.png"

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

import moment from 'moment';

//  Redux
import { useSelector } from "react-redux";

import { Tooltip } from 'react-tooltip'

// Swal
import Swal from "sweetalert2";

export default function MeetingDetail() {
    const { id } = useParams();
    const linkRef = useRef(null);
    const [isCopied, setIsCopied] = useState(false);
    const { loggedUserInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [lgMembers, setLgMembers] = useState([]);
    const [clickedRow, setClickedRow] = useState(null);
    const [showDiv, setShowDiv] = useState(true);
    const [isCurrentDateSameOrAfter, setIsCurrentDateSameOrAfter] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const getDetail = useCallback(() => {
        (async () => {
            const response = await get_meeting_detail(id);
            setDetail(response.data)
            const endDate = moment(response.data.end_date + ' ' + response.data.end_time, 'YYYY-MM-DD HH:mm:ss');
            const currentDate = moment();
            const isGreater = currentDate.isSameOrAfter(endDate);
            setIsCurrentDateSameOrAfter(isGreater)
        })();
    }, [id]);

    const getlgMemebers = useCallback(() => {
        (async () => {
            const meetingID = "?meeting_id=" + id;
            const response = await GetLeagueMembersForGuest(meetingID);
            setLgMembers(response.data)
        })();
    }, []);

    useEffect(() => {
        if (id) {
            getDetail();
        }
        getlgMemebers();
    }, [id, getDetail, getlgMemebers]);

    const handleCopyClick = async () => {

        const linkText = linkRef.current.textContent;
        await navigator.clipboard.writeText(linkText);

        setIsCopied(true);
        toast.success('Invitation Link has been copied!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
        setTimeout(() => setIsCopied(false), 3000);

    };

    useEffect(() => {
        if (detail) {
            const initialDateTime = moment(`${detail.end_date} ${detail.end_time}`, 'YYYY-MM-DD HH:mm:ss').add(24, 'hours');

            const intervalId = setInterval(() => {
                const now = moment();
                const difference = initialDateTime.diff(now, 'milliseconds');

                // If the difference is less than or equal to 0, 24 hours have passed, hide the div
                if (difference <= 0) {
                    setShowDiv(false);
                    clearInterval(intervalId); // Stop the interval
                }
            }, 1000); // Check every second

            // Clean up the interval when the component unmounts
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [detail]);

    const MarkAttendence = (attendee, rowIndex) => {
        (async () => {
            const formData = new FormData();
            formData.append("meeting_id", id);
            formData.append("attendee", attendee);

            setClickedRow(rowIndex);
            try {
                const response = await mark_meeting_attendance(formData);
                if (response.status) {
                    getDetail();
                    setError(true)
                    setVariant('success')
                    setMessage([response.message])
                }
            } catch (error) {
                setError(true)
                setVariant('error')
                const err = error.response.data.errors;
                setMessage(err)
            }
            finally {
                setClickedRow(null);
            }
        })();
    };

    const openAlert = () => {
        Swal.fire({
            icon: 'info',
            title: 'Are you sure you want to submit attendence ?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const formData = new FormData();
                formData.append("id", id);
                try {
                    const response = await SubmitAttendence(formData);
                    if (response.status) {
                        getDetail();
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                    }
                } catch (error) {
                    setError(true)
                    setVariant('error')
                    const err = error.response.data.errors;
                    setMessage(err)
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
            customClass: {
                confirmButton: "custom-confirm-button-class",
                cancelButton: "custom-cancel-button-class",
                title: "custom-title-class",
                content: "custom-content-class",
                popup: "custom-popup-class",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                return
            }
        });
    };

    return (
        <>
            <ToastContainer />
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <div className="main-content flex flex-col flex-grow">
                    <div className="lg:p-10 bg-about text-center">
                        <span className="text-center mont-serif font-semibold text-2xl text-[#005125]	xs:p-[22px] xs:mt-[6px] ">
                            Meeting Detail
                        </span>
                        {detail?.created_by === loggedUserInfo?.id && (
                            <span className="float-right cursor-pointer" onClick={() => navigate('/edit-meeting/' + id)}>
                                <AiOutlineEdit style={{ fontSize: "30px" }} />
                            </span>
                        )}
                    </div>
                    {detail && (
                        <>
                            <section className="body-font mt-8">
                                <div className="container mx-auto flex flex-col justify-center items-center">
                                    <div className="lg:w-[86%] lg:mx-auto">
                                        <h1 className="text-2xl title-font mb-4 text-[#005125] tracking-tight mont-serif font-semibold flex flex-col">
                                            {detail.name}
                                        </h1>
                                        <p className=" text-[#424242] mb-2 leading-relaxed mont-serif">
                                            {detail.description}
                                        </p>
                                        <div className="mt-[2rem]">
                                            <ul className="flex flex-col text-[#424242] list-disc list-none">
                                                <li className="list-dic text-[#424242] mont-serif mt-2">
                                                    <span className="text-lg text-[#005125] mont-serif font-bold">No. of attendees:   </span>
                                                    {detail.attendees_users ? detail.attendees_users?.length : 0}
                                                </li>
                                                <li className="list-dic text-[#424242] mont-serif mt-2">
                                                    <span className="text-lg text-[#005125] mont-serif font-bold">Start Date:   </span>
                                                    {moment(detail.start_date).format("DD MMM, YYYY")},  {moment(detail.start_date + ' ' + detail.start_time).format("hh:mm A")}
                                                </li>
                                                <li className={`list-dic mont-serif mt-2 ${isCurrentDateSameOrAfter === false ? 'text-[#424242]' : 'text-[#FF0000] font-semibold'}`}>
                                                    <span className="text-lg text-[#005125] mont-serif font-bold">End Date:   </span>
                                                    {moment(detail.end_date).format("DD MMM, YYYY")},  {moment(detail.end_date + ' ' + detail.end_time).format("hh:mm A")}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {isCurrentDateSameOrAfter === false && (
                                        <div className="flex justify-center">
                                            <div className="text-link mont-serif" style={{ display: "none" }}>
                                                <h3 ref={linkRef} className='text-[#6060e2] font-bold underline underline-offset-4'>{process.env.REACT_APP_SITE_URL + 'a/' + loggedUserInfo?.ref_code + detail?.meeting_ref_code}</h3>
                                            </div>
                                            {detail?.mt_attendance_status === 0 && (
                                                <button
                                                    className={`button-otp mont-serif lg:mt-[2rem] text-black lg:p-[5px] lg:w-[13rem] scale-in-hor-right ${isCopied ? 'bg-green-300 rounded-md' : ''
                                                        }`} onClick={handleCopyClick}
                                                >
                                                    {isCopied ? 'Link has been copied!' : 'Invitation link'}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </section>
                            {detail?.status === 1 && showDiv && (
                                <div className="lg:w-[100vh] lg:mx-auto mt-[2rem]">
                                    <h1 className="text-2xl title-font mb-8 text-[#005125] tracking-tight text-center  mont-serif font-semibold">
                                        Attendence
                                    </h1>
                                    <table className="table text-left w-full">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-3">Image</th>
                                                <th className="px-4 py-3">Name</th>
                                                <th className="px-4 py-3 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lgMembers.map((item, index) => (
                                                <tr key={index} className={detail.attendees_users?.includes(item.id) ? "bg-[#ACE1AF] border-t-2 border-gray-200" : "border-t-2 border-gray-200"}>
                                                    <td className="border-t-2 border-gray-200 px-4 py-2">
                                                        <div className="avatr">
                                                            <img
                                                                src={item.avatar ? process.env.REACT_APP_API_IMAGE_URL + item.avatar : DefaultImage}
                                                                className="w-[40px] rounded-full h-[40px]"
                                                                alt="Avatar"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className={`px-4 py-2 mont-serif ${item.role_id === 3 ? 'text-[#FF0000] font-semibold' : 'text-[#005124]'}`}>
                                                        {item.name}
                                                    </td>
                                                    <td className="flex justify-center px-4 pt-4 mont-serif text-[#005124]">
                                                        <Tooltip anchorSelect=".markAttendence" place="top">
                                                            <span style={{ fontSize: '12px' }}>
                                                                {detail?.mt_attendance_status === 1 ? 'Attendence Closed' : 'Mark Attendence'}
                                                            </span>
                                                        </Tooltip>
                                                        {!detail.attendees_users?.includes(item.id) ? (
                                                            <button
                                                                className={`${detail?.mt_attendance_status === 1 ? '' : 'cursor-pointer'}`}
                                                                disabled={detail?.mt_attendance_status === 1}
                                                                onClick={() => MarkAttendence(item.id, index)}
                                                            >
                                                                {clickedRow === index ? <Spinner /> : (
                                                                    <img className="markAttendence" src={UnCheckIcon} alt="viewIcon" style={{ width: "27px" }} />
                                                                )}
                                                            </button>
                                                        ) : (
                                                            <img src={CheckIcon} alt="viewIcon" style={{ width: "27px" }} />
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <div className="flex justify-center mb-[6rem]">
                                {detail?.mt_attendance_status === 0 && (
                                    <button onClick={() => openAlert()} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black lg:mt-[1.5rem]">
                                        Submit Attendence
                                    </button>
                                )}
                                {/* <button onClick={() => navigate(`/meetings`)} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black lg:mt-[1.5rem]">
                            Go Back
                        </button> */}
                            </div>
                        </>
                    )}
                </div>
            </main>
            {
                error && message?.length > 0 && message?.map((msg) => (
                    <MessageAlerts message={msg} variant={variant} setError={setError} />
                ))
            }
        </>
    );
}
