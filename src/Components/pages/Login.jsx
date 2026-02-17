import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import Logo from "../../assets/welcomepage/logo-1.png";

import { useGoogleLogin } from '@react-oauth/google';
// import FacebookLogin from 'react-facebook-login';

//  Formik
import { useFormik } from "formik";
import * as yup from "yup";

//  Api
import authService from "../../services/auth.services";

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login({ currentToken }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const Routememberform = () => {
    navigate(`/register-as`);
  };

  const loginGoogle = useGoogleLogin({
    // onSuccess: tokenResponse => console.log(tokenResponse, 'tokenResponse')
    onSuccess: tokenResponse => setAccessToken(tokenResponse.access_token),
  });

  useEffect(() => {
    if (accessToken) {
      // axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // })
      //   .then((response) => {
      //     setUserData(response.data);
      //   })
      //   .catch((error) => {
      //     console.error('Error fetching user data:', error);
      //   });

      async function fetchData() {

        let data = {
          provider: "google",
          platform_token: accessToken
        };

        try {
          const response = await authService.social_login(data);
          console.log(response, 'response')
        } catch (error) {
          console.log(error, 'error')
        }
      }

      fetchData();
    }
  }, [accessToken]);

  // useEffect(() => {
  //   if (userData) {
  //     console.log(userData, 'userData');
  //   }
  // }, [userData]);

  // const responseFacebook = (response) => {
  //   if (response.status === 'connected') {
  //     console.log('Logged in:', response);
  //   } else {
  //     console.log('Facebook login failed:', response);
  //   }
  // };

  // const handleLinkedInLogin = () => {
  //   // Redirect the user to the LinkedIn OAuth 2.0 Authorization URL
  //   window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77zpfbb1cqg8cu&redirect_uri=http://localhost:3000&scope=r_liteprofile%20r_emailaddress`;
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fcm_token: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("This field is required"),
      password: yup.string().required("This field is required").min(8),
      fcm_token: yup.string(),
    }),
    onSubmit: (values) => {
      (async () => {
        if (currentToken) {
          values.fcm_token = currentToken
        }
        else {
          delete values.fcm_token
        }
        const data = JSON.stringify(values);
        setLoading(true)
        try {
          const response = await authService.login(data);
          if (response.status) {
            setTimeout(() => {
              document.location.reload(navigate("/"));
            }, 200);
            setLoading(false)
          }
        } catch (error) {
          setError(true)
          setVariant('error')
          const err = error.response.data.errors;
          setMessage(err)
          setLoading(false)
          if (error.response.data.data && error.response.data.data.otp_verification === false) {
            setTimeout(() => {
              navigate("/otp", { state: { email: values.email, action: "register" } })
            }, 300);
          }
        }
      })();
    },
  });

  return (
    <>
      <div>
        <section className="text-gray-600 body-font bg-11 bg-banner min-h-[100vh]">
          <div className="flex flex-row gap-[11rem] items-center lg:hidden">
            <img src={Logo} className="mt-4 ml-1" alt="" />
          </div>
          <div className="lg:container px-5 py-6 lg:mx-auto xs:mt-4">
            <div className="flex flex-wrap text-center lg:gap-8">
              <div className="fade-in-left lg:w-[44%] md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-1 lg-w-[43%] bg-white ">
                <div
                  className="flex flex-col justify-center"
                  style={{ alignItems: "center" }}
                >
                  <h1 className="sm:text-3xl text-2xl title-font text-[#005125] mont-serif font-bold mb-[15px]">
                    Welcome to 360 Community
                  </h1>
                  <div>
                    <form onSubmit={formik.handleSubmit} className="xs:flex xs:flex-col xs:gap-8">
                      <div className="xs:w-[95%]">
                        <label
                          className="xs:relative xs:top-[15px] block text-green-700 font-bold lg:mb-2 mont-serif relative lg:top-[18px] lg:right-[145px] xs:right-[80px]"
                          htmlFor="full-name"
                        >
                          Email
                        </label>
                        <input
                          className="border-b border-gray-500 focus:border-blue-500 outline-none py-2 lg:mt-2 mx-auto m-auto lg:w-[20rem] xs:w-[100%]"
                          type="email"
                          name="email"
                          value={formik.values.email}
                          onChange={e => {
                            formik.setFieldValue("email", e.target.value);
                          }}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.email}</div>
                        ) : null}
                      </div>

                      <div className="xs:w-[95%]">
                        <label
                          className="xs:relative xs:top-[15px] block text-green-700 font-bold mb-2 mont-serif relative lg:top-[18px] lg:right-[125px] xs:right-[65px]"
                          htmlFor="full-name"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            className="border-b border-gray-500 focus:border-blue-500 outline-none py-2 lg:mt-2 mx-auto m-auto lg:w-[20rem] xs:w-[100%]"
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            onChange={e => {
                              formik.setFieldValue("password", e.target.value);
                            }}
                          />
                          <span
                            className="absolute top-5 right-2 cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                          </span>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                          <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.password}</div>
                        ) : null}

                      </div>
                      <Link to="/otp-via-email">
                        <p
                          className="text-green-700 text-underline cursor-pointer text-end lg:mt-[8px]"
                          style={{ textDecoration: "underline" }}
                        >
                          Forgot password?
                        </p>
                      </Link>
                      <div
                        className="forgot-password flex flex-col gap-3 justify-center lg:mt-[2rem] xs:mt-4"
                        style={{ alignItems: "center" }}
                      >
                        <button
                          type="submit"
                          style={{ borderRadius: "11px", fontSize: "14px" }}
                          className="xs:w-[15rem] mont-serif text-black button-1 border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[56%]"
                          disabled={loading}
                        >
                          {loading ? <Spinner /> : 'Login'}
                        </button>
                        <button
                          onClick={Routememberform}
                          style={{
                            borderRadius: "11px",
                            fontSize: "14px",
                            border: "1px solid",
                          }}
                          className="xs:w-[15rem] border-green-700 mont-serif text-black border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[56%]"
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* buttons below  */}
                {/*  */}{" "}
                {/* <p className="relative lg:mt-[15px] xs:mt-5 text-green-700">
                  or
                </p>
                <div
                  className="forgot-password flex flex-col gap-3 justify-center  lg:mt-[15px] xs:mt-5"
                  style={{ alignItems: "center" }}
                > */}

                  {/* <button
                    style={{
                      borderRadius: "11px",
                      fontSize: "14px",
                      border: "1px solid",
                    }}
                    className="xs:w-[15rem] border-green-700 mont-serif text-black border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[56%] button-1-hover"
                  > */}
                    {/* Login with Facebook */}
                    {/* <FacebookLogin
                    appId="239938268575226"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    textButton="Login with Facebook"
                  /> */}
                  {/* </button> */}
                  {/* <button onClick={handleLinkedInLogin}>Log In with LinkedIn</button> */}
                  {/* <button
                    style={{
                      borderRadius: "11px",
                      fontSize: "14px",
                      border: "1px solid",
                    }}
                    className="xs:w-[15rem] border-green-700 mont-serif lg:w-[56%] text-black  bg-white lg:p-[2px] focus:outline-none rounded text-lg border-2 button-1-hover"
                    onClick={() => loginGoogle()}
                  >
                    Login with Google
                  </button> */}
                  {/* <button
                    style={{
                      borderRadius: "11px",
                      fontSize: "14px",
                      border: "1px solid",
                    }}
                    className="xs:w-[15rem] border-green-700 mont-serif lg:w-[56%] text-black  bg-white lg:p-[2px] focus:outline-none rounded text-lg border-2 button-1-hover"
                  >
                    Login with Linkedin
                  </button> */}
                  {/* <GoogleButton/> */}

                {/* </div> */}
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
