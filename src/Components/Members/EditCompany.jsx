import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

//  Ckeditor
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

// APi
import { UploadCompanyDetail, GetCompanyDetail } from "../../services/companies.services";

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

const EditCompany = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

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

    function PreviewImageBanner(event) {
        let output = document.getElementById('uploadPreviewBanner');
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

    function PreviousBanner(url) {
        let output = document.getElementById('uploadPreviewBanner');

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
            const response = await GetCompanyDetail(id);
            setDetail(response.data)
            PreviousImage(response.data.logo)
            PreviousBanner(response.data.banner)
        })();
    }, []);

    useEffect(() => {
        if (id) {
            getCompDetail(id);
        }
    }, [id, getCompDetail])

    useEffect(() => {
        if (detail) {
            formik.setFieldValue("description", detail.description);
            formik.setFieldValue("intro", detail.intro);
        }
    }, [detail])

    const formik = useFormik({
        initialValues: {
            id: "",
            description: "",
            logo: "",
            intro: "",
            banner: "",
        },
        validationSchema: yup.object({
            id: yup.string(),
            description: yup.string().required("This field is required"),
            logo: yup.string(),
            intro: yup.string().required("This field is required"),
            banner: yup.string(),
        }),
        onSubmit: (values) => {
            values.id = id;
            if (values.logo === "") {
                delete values.logo
            }
            if (values.banner === "") {
                delete values.banner
            }

            (async () => {
                setLoading(true)
                try {
                    const response = await UploadCompanyDetail(values);
                    if (response.status) {
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        setLoading(false)
                        navigate(`/description/` + id);
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
                            Edit Company
                        </h1>
                    </div>
                    <div className="mb-8 mt-5">
                        <div className="lg:w-[60%] xs:w-[80%] mx-auto mb-4 xs:mt-8">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="flex lg:flex-row xs:flex-column gap-10">
                                    <div className="my-5 w-[30vh]">
                                        <label className="block text-[#005125] font-bold mb-2 mont-serif">
                                            Logo
                                        </label>
                                        <div className="flex flex-row gap-6 my-5">
                                            <div className="flex items-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-55 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                                                    <div id="uploadPreview" className="m-2 w-full h-55">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <input id="dropzone-file" type="file" className="hidden" onChange={(event) => {
                                                        PreviewImage(event)
                                                        formik.setFieldValue("logo", event.target.files[0]);
                                                    }} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-5 w-[60vh]">
                                        <label className="block text-[#005125] font-bold mb-2 mont-serif">
                                            Banner
                                        </label>
                                        <div className="flex flex-row gap-6 my-5">
                                            <div className="flex items-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-55 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                                                    <div id="uploadPreviewBanner" className="m-2 w-full h-55">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <input id="dropzone-file" type="file" className="hidden" onChange={(event) => {
                                                        PreviewImageBanner(event)
                                                        formik.setFieldValue("banner", event.target.files[0]);
                                                    }} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="my-5">
                                    <label className="block text-[#005125] font-bold mb-5 mont-serif">
                                        Description
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={detail.description ? detail.description : ''}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            formik.setFieldValue("description", data);
                                        }}
                                    />
                                </div> */}
                                <div className="my-5">
                                    <label className="block text-[#005125] font-bold mb-5 mont-serif">
                                        Introduction
                                    </label>
                                    <textarea
                                        className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md"
                                        rows="8"
                                        name="intro"
                                        value={formik.values.intro}
                                        onChange={e => {
                                            formik.setFieldValue("intro", e.target.value);
                                        }}
                                    />
                                    {formik.touched.intro && formik.errors.intro ? (
                                        <div className='text-red-500 text-xs text-left'>{formik.errors.intro}</div>
                                    ) : null}
                                </div>
                                <div className="my-5">
                                    <label className="block text-[#005125] font-bold mb-5 mont-serif">
                                        What We Offer
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
                                        <div className='text-red-500 text-xs text-left'>{formik.errors.description}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 mt-[2rem] mb-4">
                                    <button className="btn-create mont-serif text-black">
                                        {loading ? <Spinner /> : 'Update'}
                                    </button>
                                    <button onClick={() => navigate('/members')} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black">
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
    );
};

export default EditCompany;
