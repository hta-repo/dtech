
import React, { useState, useEffect } from "react";
// moment
import moment from 'moment';
// Icon
import { RxCross1 } from "react-icons/rx";
// Image
import Meeting from "../../assets/meeting.png"

//  Loader
import Spinner from "../Spinner/Spinner";

// Api
import { ApprovedEvents, ApprovedMeetings } from '../../services/cencom/cencomGeneral.services'

//  Alerts
import MessageAlerts from "../MessageAlerts";

//  Image
import DefaultImage from "../../assets/defaultImage.png"

export function DetailPopUp(props) {
    const [selectedPendingIds, setSelectedPendingIds] = useState([]);
    const [loading, setLoading] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (selectedPendingIds.length > 0) {
            (async () => {
                const formData = new FormData();
                for (let index = 0; index < selectedPendingIds.length; index++) {
                    formData.append("id[]", selectedPendingIds[index]);
                }
                setLoading(true)
                try {
                    const response = await ApprovedEvents(formData);
                    if (response.status) {
                        setLoading(false)
                        setSelectedPendingIds([])
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        props.setApprovedDetailObject(props.detail)
                        props.setModalOpen(false)
                    }
                } catch (error) {
                    setLoading(false)
                    setError(true)
                    setVariant('error')
                    const err = error.response.data.errors;
                    setMessage(err)
                }
            })();
        }
    }, [selectedPendingIds, props]);

    return (
        <>
            <div className="xs:hidden lg:block fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-black opacity-75" />
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                        &#8203;
                    </span>
                    <div
                        className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[608px] h-full scale-in-center"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="bg-white flex flex-col items-center">
                            <span
                                onClick={() => props.setModalOpen(false)}
                                className="relative left-[15rem] mt-[15px] text-[29px] cursor-pointer text-black"
                            >
                                <RxCross1 />
                            </span>
                            <div className="img">
                                <img id="uploadPreview" src={props.detail.cover ? process.env.REACT_APP_API_IMAGE_URL + props.detail.cover : DefaultImage} style={{ width: "130px", height: "130px", borderRadius: "50%", }} alt="avatarImage" />
                            </div>
                            <div className="mont-serif text-2xl text-[#005125] text-center font-semibold  leading-relaxed mt-3">
                                {props.detail?.name}
                            </div>
                            <div className="lg:w-[85%] mont-serif text-[#005125] leading-relaxed mt-3">
                                {props.detail?.description}
                            </div>
                            <div className="mb-2 mt-7">
                                <span className="text-sm text-[#005125] mont-serif font-bold">Start Date:   </span>
                                <span className="text-[#005125]">
                                    {moment(props.detail.start_date).format("DD MMM, YYYY")},  {moment(props.detail.start_date + ' ' + props.detail.start_time).format("hh:mm A")}
                                </span>
                            </div>
                            <div className="my-1">
                                <span className="text-sm text-[#005125] mont-serif font-bold">End Date:   </span>
                                <span className="text-[#005125]">
                                    {moment(props.detail.end_date).format("DD MMM, YYYY")},  {moment(props.detail.end_date + ' ' + props.detail.end_time).format("hh:mm A")}
                                </span>
                            </div>
                        </div>

                        <div className="lg:p-[22px] flex flex-col justify-center items-center bg-white mx-auto gap-2">
                            {props.detail?.status === 0 && (
                                <button
                                    disabled={loading}
                                    onClick={() => setSelectedPendingIds([props.detail.id])}
                                    className="text-black font-bold mont-serif btn-create p-[6px]">
                                    {" "}
                                    {loading ? <Spinner /> : "Approve"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {error && message?.length > 0 && message?.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
        </>
    );
}

export function MeetingDetailPopUp(props) {
    const [selectedPendingIds, setSelectedPendingIds] = useState([]);
    const [loading, setLoading] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (selectedPendingIds.length > 0) {
            (async () => {
                const formData = new FormData();
                for (let index = 0; index < selectedPendingIds.length; index++) {
                    formData.append("id[]", selectedPendingIds[index]);
                }
                setLoading(true)
                try {
                    const response = await ApprovedMeetings(formData);
                    if (response.status) {
                        setLoading(false)
                        setSelectedPendingIds([])
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        props.setApprovedDetailObject(props.detail)
                        props.setModalOpen(false)
                    }
                } catch (error) {
                    setLoading(false)
                    setError(true)
                    setVariant('error')
                    const err = error.response.data.errors;
                    setMessage(err)
                }
            })();
        }
    }, [selectedPendingIds, props]);

    return (
        <>
            <div className="xs:hidden lg:block fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-black opacity-75" />
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                        &#8203;
                    </span>
                    <div
                        className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[608px] h-full scale-in-center"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="bg-white flex flex-col items-center">
                            <span
                                onClick={() => props.setModalOpen(false)}
                                className="relative left-[15rem] mt-[15px] text-[29px] cursor-pointer text-black"
                            >
                                <RxCross1 />
                            </span>
                            <div className="img">
                                <img
                                    src={Meeting}
                                    className="mx-auto h-[11rem] relative left-[12px]"
                                    alt=""
                                />
                            </div>
                            <div className="mont-serif text-2xl text-[#005125] text-center font-semibold  leading-relaxed mt-3">
                                {props.detail?.name}
                            </div>
                            <div className="lg:w-[85%] mont-serif text-[#005125] leading-relaxed mt-3 h-[100px]overflow-auto">
                                {props.detail?.description}
                            </div>
                            <div className="mb-2 mt-7">
                                <span className="text-sm text-[#005125] mont-serif font-bold">No. of attendees:   </span>
                                <span className="text-[#005125]">
                                    {props.detail.attendees}
                                </span>
                            </div>
                            <div className="mb-2 my-1">
                                <span className="text-sm text-[#005125] mont-serif font-bold">Start Date:   </span>
                                <span className="text-[#005125]">
                                    {moment(props.detail.start_date).format("DD MMM, YYYY")},  {moment(props.detail.start_date + ' ' + props.detail.start_time).format("hh:mm A")}
                                </span>
                            </div>
                            <div className="my-1">
                                <span className="text-sm text-[#005125] mont-serif font-bold">End Date:   </span>
                                <span className="text-[#005125]">
                                    {moment(props.detail.end_date).format("DD MMM, YYYY")},  {moment(props.detail.end_date + ' ' + props.detail.end_time).format("hh:mm A")}
                                </span>
                            </div>
                        </div>

                        <div className="lg:p-[22px] flex flex-col justify-center items-center bg-white mx-auto gap-2">
                            {props.detail?.status === 0 && (
                                <button
                                    disabled={loading}
                                    onClick={() => setSelectedPendingIds([props.detail.id])}
                                    className="text-black font-bold mont-serif btn-create p-[6px]">
                                    {" "}
                                    {loading ? <Spinner /> : "Approve"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {error && message?.length > 0 && message?.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
        </>
    );
}