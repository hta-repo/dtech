import { useEffect, useCallback, useState } from "react";

//  icon
import { AiOutlineEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import { UpdateLeagueInfo, fetchUserDetail } from "../services/user.services";

//  Redux
import { useDispatch, useSelector } from "react-redux";

//  Loader
import Spinner from "./Spinner/Spinner";

//  Alerts
import MessageAlerts from "./MessageAlerts";

export default function OurCommunity() {
    const dispatch = useDispatch();
    const { loggedUserInfo } = useSelector((state) => state.auth);
    const [communityModalOpen, setCommunityModalOpen] = useState(false);
    const [community, setCommunity] = useState("");
    const [loading, setLoading] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [banner, setBanner] = useState(null);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const getUserDetail = useCallback(() => {
        dispatch(fetchUserDetail()).unwrap();
    }, [dispatch]);

    function PreviewImage(event) {
        let output = document.getElementById('uploadPreviewCommunityBanner');
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

    useEffect(() => {
        if (loggedUserInfo?.league?.community_banner) {
            const url = loggedUserInfo.league.community_banner;
            setBanner(url)
        }
        if (loggedUserInfo?.league?.community) {
            setCommunity(loggedUserInfo?.league?.community)
        }
    }, [loggedUserInfo?.league]);

    const UpdateLeagueData = () => {
        (async () => {
            setLoading(true)
            try {
                let formData = new FormData();
                formData.append("id", loggedUserInfo?.league?.id);
                formData.append("community", community);
                if (attachment) {
                    formData.append("community_banner", attachment);
                }

                const response = await UpdateLeagueInfo(formData);
                if (response.status) {
                    getUserDetail()
                    setError(true)
                    setVariant('success')
                    setMessage([response.message])
                    setLoading(false)
                    setCommunityModalOpen(false)
                }
            } catch (error) {
                setError(true)
                setVariant('error')
                const err = error.response.data.errors;
                setMessage(err)
                setLoading(false)
            }
        })();
    };

    return (
        <>
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <div className="main-content flex flex-col flex-grow">
                    <div className="lg:p-10 bg-about text-center">
                        <span className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[22px] xs:mt-[6px] ">
                            Our Community
                        </span>
                        {loggedUserInfo?.is_lg_admin === 1 && (
                            <span className="float-right cursor-pointer" onClick={() => setCommunityModalOpen(true)}>
                                <AiOutlineEdit style={{ fontSize: "30px" }} />
                            </span>
                        )}
                    </div>
                    <div className="mb-8">
                        <section className="lg:w-[86%] xs:w-[80%] lg:mx-auto body-font">
                            <div className="lg:container mx-auto flex flex-col justify-center items-center">
                                {banner && (
                                    <img
                                        className="w-full lg:h-[439px] my-10 rounded"
                                        src={banner ? process.env.REACT_APP_API_IMAGE_URL + banner : ""}
                                        alt=""
                                    />
                                )}
                                <p className="mb-2 leading-relaxed mont-serif">
                                    {community}
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            {communityModalOpen && (
                <div className=" fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-black opacity-75" />
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                            &#8203;
                        </span>
                        <div
                            className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-[650px] h-full scale-in-center"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white flex flex-col items-center">
                                <span
                                    onClick={() => setCommunityModalOpen(!communityModalOpen)}
                                    className="relative left-[15rem] mt-[15px] text-[29px] cursor-pointer text-black"
                                >
                                    <RxCross1 />
                                </span>
                                <div style={{ width: "80%", margin: "20px 0px" }}>
                                    <div className="flex flex-row gap-6 my-5">
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                                                <div id="uploadPreviewCommunityBanner" className="m-3 w-full h-50">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    </div>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={(event) => {
                                                    PreviewImage(event)
                                                    setAttachment(event.target.files[0]);
                                                }} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="text-left mont-serif text-2xl text-[#005125] font-semibold my-3">
                                        Description
                                    </div>
                                    <textarea
                                        className="mont-serif appearance-none border border-[#007033] focus:border-[#007033] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md"
                                        rows="10"
                                        name="description"
                                        value={community}
                                        onChange={e => {
                                            setCommunity(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-center mt-[1rem] mb-8">
                                    <button type="submit" onClick={UpdateLeagueData} className="btn-create mont-serif text-black">
                                        {loading ? <Spinner /> : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )};
            {error && message?.length > 0 && message?.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
        </>
    );
}
