import React, { useState } from "react";
import Logo from "../../assets/welcomepage/logo-1.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";

//  Formik
import { useFormik } from "formik";
import * as yup from "yup";

//  Api
import authService from "../../services/auth.services";

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

export default function OTPViaEmail() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const routelogin = () => {
    navigate(`/`);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("This field is required"),
    }),
    onSubmit: (values) => {
      (async () => {
        setLoading(true)
        try {
          const data = JSON.stringify(values)
          const response = await authService.forget_password(data);
          if (response.status) {
            setError(true)
            setVariant('success')
            setMessage([response.message])
            setTimeout(() => {
              navigate("/otp", { state: { email: values.email, action: "passowordReset" } })
            }, 700);
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
      <section className="text-gray-600 body-font bg-11 bg-banner">
        <div className="flex flex-row gap-[7rem] items-center lg:hidden">
          <img src={Logo} className="mt-4 ml-1" alt="" />
          <div className="flex fle-row gap-[5px]">
            <button
              onClick={routelogin}
              style={{ borderRadius: "5px", fontSize: "14px" }}
              className="xs:w-[5rem] mont-serif text-black bg-white border-0  focus:outline-none rounded text-lg"
            >
              Login
            </button>
            <button
              style={{ borderRadius: "6px", fontSize: "14px" }}
              className="xs:w-[5rem] mont-serif text-black bg-white border-0  focus:outline-none rounded text-lg"
            >
              Contact us
            </button>
          </div>
        </div>

        <div className="lg:container px-5 py-7 lg:mx-auto">
          <div className="flex flex-wrap text-center lg:gap-8">
            <div className="xs:relative xs:top-[3rem] fade-in-left lg:w-[44%] md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-1 lg-w-[43%] bg-white">
              <h2 className="text-black text-lg font-semibold mb-2 lg:mt-[5rem] mont-serif relative lg:bottom-11">
                FORGOT PASSOWORD ?
              </h2>

              {/* <div
                className="forgot-password flex flex-col gap-3 lg:gap-5 justify-center lg-mt-[18px] "
                style={{ alignItems: "center" }}
              >
                <button
                  className="xs:w-[15rem] mont-serif text-black button-1 border-0 py-1 px-8 focus:outline-none  text-lg lg:w-[48%]"
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                >
                  Get code via email
                </button>
                <Link to="/otp-via-phone">
                  <button
                    className="xs:w-[15rem] w-[18rem] text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg mont-serif xs:p-[3px] button-1-hover"
                    style={{ borderRadius: "11px", fontSize: "14px" }}
                  >
                    Get code via SMS
                  </button>
                </Link>
              </div> */}

              {/* email input  */}
              <form onSubmit={formik.handleSubmit}>
                <div className="relative mb-4 lg:mt-[3rem] lg:top-[19px] xs:mt-[3rem] xs:mb-9">
                  <p className="relative float-left text-black mont-serif">
                    Enter your Email
                  </p>
                  <input
                    type="email"
                    name="email"
                    className="w-full text-black mont-serif  border-b-2 bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={formik.values.email}
                    onChange={e => {
                      formik.setFieldValue("email", e.target.value);
                    }}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className='text-red-500 text-sm text-left mt-2'>{formik.errors.email}</div>
                  ) : null}
                </div>

                {/* email input end  */}

                <div
                  className="forgot-password flex flex-col gap-3 justify-center lg:mt-28"
                  style={{ alignItems: "center" }}
                >
                  <button
                    type="submit"
                    style={{ borderRadius: "11px", fontSize: "14px" }}
                    className=" lg:w-[18rem] mont-serif text-black button-1 border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[48% xs:w-[15rem]"
                    disabled={loading}
                  >
                    {loading ? <Spinner /> : 'Get code'}
                  </button>
                  <Link to="/">
                    <button
                      style={{ borderRadius: "11px", fontSize: "14px" }}
                      className="mont-serif lg:w-[18rem] text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg xs:w-[15rem] button-1-hover"
                    >
                      Go back
                    </button>
                  </Link>
                </div>
              </form>
            </div>

            {/* flex-2  */}
            <div className="xs:hidden lg:block sm:w-1/2 px-4 lg:p-[14px]">
              <div className="flex flex-row justify-end gap-2">
                {/* <button
                  style={{ borderRadius: "6px", fontSize: "14px" }}
                  className="mont-serif border  text-white   lg:w-[9rem] lg:p-[2px] focus:outline-none text-lg drop-shadow-md shadow-lg"
                >
                  Contact us
                </button> */}
                {/*  */}
                <button
                  onClick={() => navigate(`/`)}
                  style={{ borderRadius: "6px", fontSize: "14px" }}
                  className="mont-serif bg-green-800  text-white border-0 lg:w-[9rem] lg:p-[2px] rounded text-lg drop-shadow-md shadow-lg"
                >
                  Login
                </button>
              </div>

              <div
                className="flex flex-col justofy-center align-middle"
                style={{ alignItems: "center" }}
              >
                <h1 className="text-white text-lg font-semibold lg:mt-20 relative lg:bottom-11 mont-serif">
                  {" "}
                  10X Raabit
                </h1>

                <div className="container mx-auto">
                  <img
                    className="rounded-lg shadow-lg mx-auto object-cover lg:h-[15rem] w-[auto]"
                    src={logo}
                    alt=""
                  />
                </div>
              </div>

              <div
                className="forgot-password flex flex-col gap-3 justify-center lg:mt-[6rem]"
                style={{ alignItems: "center" }}
              >
                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                  className=" lg:w-[278px]  mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg button-1-hover"
                >
                  App store
                </button>

                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                  className=" lg:w-[278px]  mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg button-1-hover"
                >
                  Google play
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {error && message.length > 0 && message.map((msg) => (
        <MessageAlerts message={msg} variant={variant} setError={setError} />
      ))
      }
    </>
  );
}
