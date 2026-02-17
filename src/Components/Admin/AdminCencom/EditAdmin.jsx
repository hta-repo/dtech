import React, { useState, useEffect } from "react";

// Icon
import { FaEye, FaEyeSlash } from 'react-icons/fa';

//  MUI
import { TextField, FormControl, InputLabel, InputAdornment, Input, IconButton } from '@mui/material';

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

//  Loader
import Spinner from "../../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../../MessageAlerts";

//  Api
import { UpdateAdmin } from "../../../services/cencom/cencomUser.services";

import { useNavigate, useLocation } from "react-router-dom";

const statuses = [
    { label: "Active", value: 1 },
    { label: "In Active", value: 0 }
]

export default function EditAdmin() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            email: "",
            is_active: "",
            password: "",
        },
        validationSchema: yup.object({
            id: yup.string(),
            is_active: yup.number(),
            name: yup.string(),
            email: yup.string().email().max(40),
            password: yup.string(),
        }),
        onSubmit: (values) => {
            if (values.password === "") {
                delete values.password;
            }
            values.id = state.data.id;
            values.is_active = Number(values.is_active);
            (async () => {
                const data = JSON.stringify(values)
                setLoading(true)
                try {
                    const response = await UpdateAdmin(data);
                    if (response.status) {
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        setLoading(false)
                        navigate('/admin/cencom')
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
        if (state.data) {
            formik.setFieldValue("name", state.data.name);
            formik.setFieldValue("email", state.data.email);
            formik.setFieldValue("is_active", state.data.is_active);
        }
    }, [state.data]);

    return (
        <>
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <div className="main-content flex flex-col flex-grow">
                    <div className="lg:p-10 bg-about text-center">
                        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px]">
                            Edit Admin
                        </h1>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="lg:w-[50%] xs:w-[90%] mx-auto">
                        <div className="mt-[3rem]">
                            <FormControl className="w-full">
                                <TextField
                                    type="email"
                                    autoComplete="off"
                                    size="small"
                                    label="Email"
                                    variant="standard"
                                    disabled
                                    sx={{ width: "100%" }}
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        formik.setFieldValue("email", e.target.value);
                                    }}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.email}</div>
                                ) : null}
                            </FormControl>
                        </div>
                        <div className="mt-[2rem]">
                            <FormControl className="w-full">
                                <TextField
                                    autoComplete="off"
                                    size="small"
                                    label="Name"
                                    variant="standard"
                                    sx={{ width: "100%" }}
                                    value={formik.values.name}
                                    onChange={(e) => {
                                        formik.setFieldValue("name", e.target.value);
                                    }}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.name}</div>
                                ) : null}
                            </FormControl>
                        </div>
                        <div className="mt-[2rem]">
                            <FormControl className="w-full" variant="standard">
                                <label style={{ color: "rgba(0, 0, 0, 0.6)", fontSize: "1rem", marginBottom: "10px" }}>Status</label>
                                <select
                                    name="is_active"
                                    className="mont-serif appearance-none border border-[#007033] focus:border-[#007033] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md"
                                    value={formik.values.is_active}
                                    onBlur={formik.handleBlur}
                                    onChange={e => {
                                        formik.setFieldValue("is_active", e.target.value);
                                    }}
                                >
                                    {statuses.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.is_active && formik.errors.is_active ? (
                                    <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.is_active}</div>
                                ) : null}
                            </FormControl>
                        </div>
                        <div className="mt-[2rem]">
                            <FormControl className="w-full" variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    sx={{ width: "100%" }}
                                    type={showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    onChange={e => {
                                        formik.setFieldValue("password", e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.password}</div>
                                ) : null}
                            </FormControl>
                        </div>
                        <div className="flex flex-col gap-3 justify-center items-center mt-[3rem] mb-[2rem] xs:mt-[8rem]">
                            <button
                                type="submit"
                                style={{ borderRadius: "11px", fontSize: "14px" }}
                                className=" lg:w-[278px]  mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg next"
                                disabled={loading}
                            >
                                {loading ? <Spinner /> : 'Edit'}
                            </button>
                        </div>
                    </form>

                </div>
            </main>
            {error && message?.length > 0 && message?.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
        </>
    );
}
