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

export default function GuestRegister(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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
      name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
      refCode: "",
      companyName: "",
      products: "",
    },
    validationSchema: yup.object({
      name: yup.string().required('This field is required').min(3).max(40).matches(/^[^\s]*(?:\s[^\s]+)*$/, 'Name should not contain double spaces'),
      email: yup.string().email().required('This field is required').max(40),
      phone: yup.string().required('This field is required').min(9).max(9),
      password: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^*?&.,])[a-zA-Z\d@#$!%^*?&.,\s]+$/,
          'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and can include spaces.'
        ),
      confirm_password: yup
        .string()
        .required("Confirm Password required")
        .oneOf([yup.ref("password")], "Password does not match"),
      refCode: yup.string().required('This field is required'),
      companyName: yup.string().required('This field is required'),
      products: yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const url = values.refCode
      const match = url.match(/\/([^\/]+)$/);

      values.refCode = match ? match[1] : values.refCode
      values.phone = "+971" + values.phone;

      (async () => {
        const data = JSON.stringify(values)
        setLoading(true)
        try {
          const response = await authService.GuestRegister(data);
          if (response.status) {
            setError(true)
            setVariant('success')
            setMessage([response.message])
            setTimeout(() => {
              navigate("/guest-verify-otp", { state: { email: values.email, action: "guestregister" } })
            }, 300);
            setLoading(false)
          }
        } catch (error) {
          const originalString = values.phone;
          values.phone = originalString.slice(4);
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
      <form onSubmit={formik.handleSubmit} className="lg:w-[70%] xs:w-[90%] mx-auto">
        <div className="grid grid-cols-2 gap-10 xs:gap-0 gap-y-0 mt-3">
          <div className="xs:col-start-1 xs:col-end-7 mt-[2.5rem]">
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
                <div className='text-red-500 text-xs text-left'>{formik.errors.name}</div>
              ) : null}
            </FormControl>
          </div>
          <div className="xs:col-start-1 xs:col-end-7 mt-[2.5rem]">
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
              {formik.touched.refCode && formik.errors.refCode ? (
                <div className='text-red-500 text-xs text-left'>{formik.errors.refCode}</div>
              ) : null}
            </FormControl>
          </div>
          <div className="xs:col-start-1 xs:col-end-7 mt-[2.5rem]">
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
          <div className="xs:col-start-1 xs:col-end-7 mt-[2.5rem]">
            <FormControl className="w-full">
              <InputLabel htmlFor="standard-adornment-amount">Mobile Number</InputLabel>
              <Input
                id="standard-adornment-amount"
                autoComplete="off"
                size="small"
                sx={{ width: "100%" }}
                value={formik.values.phone}
                onInput={e => {
                  const numericValue = e.target.value.replace(/\D/g, '');
                  formik.setFieldValue("phone", numericValue);
                }}
                startAdornment={<InputAdornment position="start">+971</InputAdornment>}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className='text-red-500 text-xs text-left'>{formik.errors.phone}</div>
              ) : null}
            </FormControl>
          </div>
          <div className="xs:col-start-1 xs:col-end-7 mt-[2.5rem]">
            <FormControl className="w-full">
              <TextField
                autoComplete="off"
                size="small"
                label="Company Name"
                variant="standard"
                sx={{ width: "100%" }}
                value={formik.values.companyName}
                onChange={(e) => {
                  formik.setFieldValue("companyName", e.target.value);
                }}
              />
              {formik.touched.companyName && formik.errors.companyName ? (
                <div className='text-red-500 text-xs text-left'>{formik.errors.companyName}</div>
              ) : null}
            </FormControl>
          </div>
          <div className="xs:col-start-1 xs:col-end-7 mt-[2.5rem]">
            <FormControl className="w-full">
              <TextField
                autoComplete="off"
                size="small"
                label="Products"
                variant="standard"
                sx={{ width: "100%" }}
                value={formik.values.products}
                onChange={(e) => {
                  formik.setFieldValue("products", e.target.value);
                }}
              />
              {formik.touched.products && formik.errors.products ? (
                <div className='text-red-500 text-xs text-left'>{formik.errors.products}</div>
              ) : null}
            </FormControl>
          </div>
          <div className="xs:col-start-1 xs:col-end-7 mt-[2.5rem]">
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
          <div className="xs:col-start-1 xs:col-end-7 mt-[2.5rem]">
            <FormControl className="w-full" variant="standard">
              <InputLabel htmlFor="standard-adornment-confirm-password">Confirm Password</InputLabel>
              <Input
                id="standard-adornment-confirm-password"
                sx={{ width: "100%" }}
                type={confirmPasswordVisible ? 'text' : 'password'}
                value={formik.values.confirm_password}
                onChange={e => {
                  formik.setFieldValue("confirm_password", e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.confirm_password && formik.errors.confirm_password ? (
                <div className='text-red-500 text-xs text-left'>{formik.errors.confirm_password}</div>
              ) : null}
            </FormControl>
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center mt-[3rem] mb-[2rem] xs:mt-[8rem]">
          <button
            type="submit"
            style={{ borderRadius: "11px", fontSize: "14px" }}
            className=" lg:w-[278px]  mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg next"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Register'}
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
