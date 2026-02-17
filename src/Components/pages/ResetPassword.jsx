import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";
import Logo from "../../assets/welcomepage/logo-1.png";

//  Formik
import { useFormik } from "formik";
import * as yup from "yup";

//  Api
import authService from "../../services/auth.services";

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

export default function ResetPassword() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: yup.object({
            email: yup.string(),
            password: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%^*?&.,])[A-Za-z\d@#$!%^*?&.,\s]+$/,
                    'Password must contain at least one letter, one number, one special character, and can include spaces.'
                ),
            password_confirmation: yup
                .string()
                .required("Confirm Password required")
                .oneOf([yup.ref("password")], "Password does not match"),
        }),
        onSubmit: (values) => {
            (async () => {
                values.email = state.email
                const data = JSON.stringify(values)
                setLoading(true)
                try {
                    const response = await authService.reset_password(data);
                    if (response.status) {
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        setTimeout(() => {
                            navigate(`/`);
                        }, 100);
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
            <div>
                <section className="text-gray-600 body-font bg-11 bg-banner xs:h-[100vh]">
                    <div className="flex flex-row gap-[11rem] items-center lg:hidden">
                        <img src={Logo} className="mt-4 ml-1" alt="" />
                    </div>
                    <div className="lg:container px-5 py-6 lg:py-[67px] lg:mx-auto xs:mt-4">
                        <div className="flex flex-wrap text-center lg:gap-8">
                            <div className="fade-in-left lg:w-[44%] md:w-1/2 rounded-lg lg:p-[50px] flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-1 lg-w-[43%] bg-white">
                                <div className="flex flex-col justify-center xs:py-[50px] xs:px-[15px]"
                                    style={{ alignItems: "center" }}
                                >
                                    <h1 className="sm:text-3xl text-2xl title-font text-[#005125] mt-5 mont-serif font-bold mb-[30px]">
                                        Reset Password
                                    </h1>
                                    <div className="flex flex-col justify-center">
                                        <p className="leading-relaxed text-lg lg:text-[14px] xs:text-[13px] text-[#005125] mont-serif">
                                            Set a new password for your account
                                        </p>
                                    </div>
                                    <form onSubmit={formik.handleSubmit} className="mt-8">
                                        {/* <div className="xs:flex xs:flex-column xs:items-center xs:gap-4"> */}
                                        <div className="xs:w-[95%]">
                                            <label
                                                className="xs:relative xs:top-[15px] block text-green-700 font-bold lg:mb-3 mont-serif relative lg:top-[18px] lg:right-[100px] xs:right-[50px]"
                                                htmlFor="password"
                                            >
                                                New password
                                            </label>
                                            <input
                                                className="border-b border-gray-500 focus:border-blue-500 outline-none py-2 lg:mt-2 mx-auto m-auto lg:w-[20rem] xs:w-[100%]"
                                                type="password"
                                                name="password"
                                                value={formik.values.password}
                                                onChange={e => {
                                                    formik.setFieldValue("password", e.target.value);
                                                }}
                                            />
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.password}</div>
                                            ) : null}
                                        </div>
                                        <div className="xs:w-[95%]">
                                            <label
                                                className="xs:relative xs:top-[15px] block text-green-700 font-bold mb-3 mont-serif relative lg:top-[18px] lg:right-[70px] xs:right-[20px]"
                                                htmlFor="password_confirmation"
                                            >
                                                Re-type new password
                                            </label>
                                            <input
                                                className="border-b border-gray-500 focus:border-blue-500 outline-none py-2 lg:mt-2 mx-auto m-auto lg:w-[20rem] xs:w-[100%]"
                                                type="password"
                                                name="password_confirmation"
                                                value={formik.values.password_confirmation}
                                                onChange={e => {
                                                    formik.setFieldValue("password_confirmation", e.target.value);
                                                }}
                                            />
                                            {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                                                <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.password_confirmation}</div>
                                            ) : null}
                                        </div>
                                        <div
                                            className="forgot-password flex flex-col gap-3 justify-center lg:mt-[4rem] xs:mt-6"
                                            style={{ alignItems: "center" }}
                                        >
                                            <button
                                                type="submit"
                                                style={{ borderRadius: "11px", fontSize: "14px" }}
                                                className="xs:w-[15rem] mont-serif text-black button-1 border-0 py-1 px-8 focus:outline-none rounded text-lg"
                                                disabled={loading}
                                            >
                                                {loading ? <Spinner /> : 'Confirm Changes'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* flex-2  */}
                            <div className="sm:w-1/2  px-4 lg:p-[14px] xs:hidden lg:block">
                                <div
                                    className="flex flex-col justofy-center align-middle "
                                    style={{ alignItems: "center" }}
                                >
                                    <h1 className="text-white text-lg font-semibold lg:mt-20   relative lg:bottom-11 mont-serif">
                                        {" "}
                                        10X Raabit
                                    </h1>
                                    <div className="lg:container lg:mx-auto">
                                        <img
                                            className="rounded-lg shadow-lg mx-auto object-cover lg:h-[15rem] w-[auto]"
                                            src={logo}
                                            alt=""
                                        />
                                    </div>
                                </div>

                                <div
                                    className="forgot-password flex flex-col gap-3 justify-center  lg:mt-[8.9rem]"
                                    style={{ alignItems: "center" }}
                                >
                                    <div className="flex justify-center items-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {error && message.length > 0 && message.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
        </>
    );
}
