import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

// APi
import { UpdateBusinessSubCategory } from "../../../services/cencom/businessCategory.services";

//  Loader
import Spinner from "../../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

const statusArray = [
    { name: "Active", id: 1 },
    { name: "Disbaled", id: 0 },
]

export default function EditSubcategory() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (state) {
            formik.setFieldValue("id", state.data.id);
            formik.setFieldValue("parent_id", state.data.parent_id);
        }
    }, [state]);

    const formik = useFormik({
        initialValues: {
            name: "",
            status: "",
            id: "",
            parent_id: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("This field is required"),
            status: yup.string().required("This field is required"),
            id: yup.string(),
            parent_id: yup.string(),
        }),
        onSubmit: (values) => {
            (async () => {
                setLoading(true)
                try {
                    const response = await UpdateBusinessSubCategory(values);
                    if (response.status) {
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        setLoading(false)
                        navigate(`/admin/business-categories`);
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
        if (state) {
            formik.setFieldValue("name", state.data.name);
            formik.setFieldValue("status", state.data.status);
            formik.setFieldValue("id", state.data.id);
        }
    }, [state])

    return (
        <>
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <div className="main-content flex flex-col flex-grow">
                    <div className="lg:p-10 bg-about text-center">
                        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]">
                            Edit Business Subcategory
                        </h1>
                    </div>
                    <div className='mb-8'>
                        <div className="lg:w-[40%] xs:w-[80%] mx-auto mb-4 xs:mt-8">
                            <form onSubmit={formik.handleSubmit} className="lg:pt-[2rem]">
                                <div className="mb-5">
                                    <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="name">
                                        Name
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
                                <div className="mb-5">
                                    <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="name">
                                        Status
                                    </label>
                                    <select
                                        className="lg:text-[14px] border rounded-md border-[#007033] focus:border-indigo-500 outline-none p-2 mt-2 w-[100%]"
                                        name="lcn_type"
                                        value={formik.values.status}
                                        onBlur={formik.handleBlur}
                                        onChange={e => {
                                            formik.setFieldValue("status", e.target.value);
                                        }}
                                    >
                                        {statusArray.map((option, index) => (
                                            <option key={index} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.status && formik.errors.status ? (
                                        <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.status}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 mt-[2rem] mb-4">
                                    <button type="submit" className="btn-create mont-serif text-black">
                                        {loading ? <Spinner /> : 'Edit Category'}
                                    </button>
                                    <button onClick={() => navigate('/admin/business-categories')} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black">
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
        </>
    )
}
