import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

// APi
import { AddBusinessSubCategory } from "../../../services/cencom/businessCategory.services";
// import GeneralService from "../../../services/general.services";

//  Loader
import Spinner from "../../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

import { Autocomplete, TextField, FormControl } from '@mui/material';

const statusArray = [
    { name: "Active", id: 1 },
    { name: "Disbaled", id: 0 },
]

export default function CreateSubCategory() {
    const navigate = useNavigate();
    const { state } = useLocation();
    // const [businessCat, setBusinessCat] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(state, 'state create sub category')

    useEffect(() => {
        if (state) {
            formik.setFieldValue("parent_id", state.data.id);
        }
    }, [state]);

    // const getBusinessCategories = useCallback(() => {
    //     (async () => {
    //         const status = "?status=1";
    //         const response = await GeneralService.getAllBusinessCategories({ status });
    //         setBusinessCat(response.data.data)
    //     })();
    // }, []);

    // useEffect(() => {
    //     getBusinessCategories();
    // }, [getBusinessCategories])

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            status: "",
            parent_id: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("This field is required"),
            status: yup.string().required("This field is required"),
            parent_id: yup.string().required("This field is required"),
        }),
        onSubmit: (values) => {
            (async () => {
                setLoading(true)
                try {
                    const response = await AddBusinessSubCategory(values);
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

    return (
        <>
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <div className="main-content flex flex-col flex-grow">
                    <div className="lg:p-10 bg-about text-center">
                        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]">
                            Create Subcategory
                        </h1>
                    </div>
                    <div className='mb-8'>
                        <div className="lg:w-[40%] xs:w-[80%] mx-auto mb-4 xs:mt-8">
                            <form onSubmit={formik.handleSubmit} className="lg:pt-[3rem]">
                                <div className="mb-6">
                                    <h1 className="mont-serif font-semibold text-lg text-[#005125]">
                                        Parent Category:<span className="pl-4 text-sm text-black">{state.data.name}</span>
                                    </h1>
                                    {/* <Autocomplete
                                        size="small"
                                        options={businessCat}
                                        disableClearable
                                        getOptionLabel={(option) => option.name}
                                        value={businessCat.find(option => option.id === formik.values.parent_id) || null}
                                        onChange={(e, data) => {
                                            formik.setFieldValue("parent_id", data ? data.id : null);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                label="Business Category"
                                            />
                                        )}
                                    />
                                    {formik.touched.parent_id && formik.errors.parent_id ? (
                                        <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.parent_id}</div>
                                    ) : null} */}
                                </div>
                                <div className="mb-6">
                                    <FormControl className="w-full">
                                        <TextField
                                            autoComplete="off"
                                            size="small"
                                            label="SubCatergory Name"
                                            variant="standard"
                                            sx={{ width: "100%" }}
                                            value={formik.values.name}
                                            onChange={(e) => {
                                                formik.setFieldValue("name", e.target.value);
                                            }}
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.name}</div>
                                        ) : null}
                                    </FormControl>
                                </div>
                                <div className="mb-6">
                                    <Autocomplete
                                        size="small"
                                        options={statusArray}
                                        disableClearable
                                        getOptionLabel={(option) => option.name}
                                        onChange={(e, data) => {
                                            formik.setFieldValue("status", data ? data.id : null);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                label="Status"
                                            />
                                        )}
                                    />
                                    {formik.touched.status && formik.errors.status ? (
                                        <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.status}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 mt-[2rem] mb-4">
                                    <button type="submit" className="btn-create mont-serif text-black">
                                        {loading ? <Spinner /> : 'Create Subcategory'}
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
