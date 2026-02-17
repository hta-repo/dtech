import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

//  Api
import authService from "../../../services/auth.services";

//  Loader
import Spinner from "../../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../../MessageAlerts";

// Icon
import { FaEye, FaEyeSlash } from 'react-icons/fa';

//  MUI
import { TextField, FormControl, InputLabel, InputAdornment, Input, IconButton } from '@mui/material';

export default function GuestLogin(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (props.refCode) {
            formik.setFieldValue("refCode", props.refCode);
        }
    }, [props]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            refCode: "",
        },
        validationSchema: yup.object({
            email: yup.string().email().required('This field is required').max(40),
            password: yup.string().required("This field is required"),
            refCode: yup.string(),
        }),
        onSubmit: (values) => {

            if (values.refCode === "") {
                delete values.refCode
            }
            else {
                const url = values.refCode
                const match = url.match(/\/([^\/]+)$/);
                values.refCode = match ? match[1] : values.refCode
            }

            (async () => {
                const data = JSON.stringify(values)
                setLoading(true)
                try {
                    const response = await authService.guestLogin(data);
                    if (response.status) {
                        setTimeout(() => {
                            document.location.reload(navigate("/"));
                        }, 200);
                    }
                } catch (error) {
                    setError(true)
                    setVariant('error')
                    const err = error.response.data.errors;
                    setMessage(err)
                    setLoading(false)
                    if (error.response.data.data && error.response.data.data.otp_verification === false) {
                        setTimeout(() => {
                            navigate("/guest-verify-otp", { state: { email: values.email, action: "guestregister" } })
                        }, 300);
                    }
                }
            })();
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="lg:w-[50%] xs:w-[90%] mx-auto">
                <div className="mt-[3rem]">
                    <FormControl className="w-full">
                        <TextField
                            type="email"
                            autoComplete="off"
                            size="small"
                            label="Email"
                            variant="standard"
                            sx={{ width: "100%" }}
                            value={formik.values.email}
                            onChange={(e) => {
                                formik.setFieldValue("email", e.target.value);
                            }}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-red-500 text-xs text-left'>{formik.errors.email}</div>
                        ) : null}
                    </FormControl>
                </div>
                <div className="mt-[3rem]">
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
                            <div className='text-red-500 text-xs text-left'>{formik.errors.password}</div>
                        ) : null}
                    </FormControl>
                </div>
                <div className="mt-[3rem]">
                    <FormControl className="w-full">
                        <TextField
                            autoComplete="off"
                            size="small"
                            label="Code / Url"
                            variant="standard"
                            sx={{ width: "100%" }}
                            value={formik.values.refCode}
                            onChange={(e) => {
                                formik.setFieldValue("refCode", e.target.value);
                            }}
                        />
                    </FormControl>
                </div>

                <div className="flex flex-col gap-3 justify-center items-center mt-[3rem] mb-[2rem] xs:mt-[8rem]">
                    <button
                        type="submit"
                        style={{ borderRadius: "11px", fontSize: "14px" }}
                        className=" lg:w-[278px]  mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg next"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : 'Login'}
                    </button>
                </div>
            </form>
            {error && message?.length > 0 && message?.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
        </>
    )
}
