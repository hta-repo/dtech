import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "./logo.png";
import verifycode from "../../assets/welcomepage/otp.png"
import { Link, useLocation } from "react-router-dom";

//  OTP
import OtpInput from 'react-otp-input';
import authService from "../../services/auth.services";

//  Alerts
import MessageAlerts from "../MessageAlerts";

//  Loader
import Spinner from "../Spinner/Spinner";

const OtpCustomStyle = {
  width: '4rem',
  height: '4rem',
  fontSize: '24px',
  border: '1px solid #D1D5DB',
  borderRadius: '0.5rem',
  marginLeft: '1.5rem',
}

export default function OTP() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOTPLoading] = useState(false);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const SubmitUser = () => {
    let data = {
      email: state.email,
      otp: otp
    };
    (async () => {
      setLoading(true)
      try {
        const response = await authService.verify_otp(data);
        if (response.status) {
          setError(true)
          setVariant('success')
          setMessage([response.message])
          setTimeout(() => {
            if (state.action === "passowordReset") {
              navigate("/reset-password", { state: { email: state.email, action: "passowordReset" } })
            } else {
              navigate(`/pending-verification`);
            }
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
  }

  const ResendOTPToUSer = () => {
    let data = {
      email: state.email,
    };
    (async () => {
      setOTPLoading(true)
      try {
        const response = await authService.resend_otp(data);
        if (response.status) {
          setError(true)
          setVariant('success')
          setMessage([response.message])
          setOTPLoading(false)
        }
      } catch (error) {
        setError(true)
        setVariant('error')
        const err = error.response.data.errors;
        setMessage(err)
        setOTPLoading(false)
      }
    })();
  };


  // otp 
  // const [otp, setOtp] = useState(["", "", "", ""]);

  // const handleChange = (e, index) => {
  //   const newOtp = [...otp];
  //   newOtp[index] = e.target.value;
  //   setOtp(newOtp);
  // };


  // otp end 

  // const [showTimer, setShowTimer] = useState(false);
  // const [secondsLeft, setSecondsLeft] = useState(10);

  // useEffect(() => {
  //   let timerId;

  //   if (showTimer && secondsLeft > 0) {
  //     timerId = setInterval(() => {
  //       setSecondsLeft(secondsLeft - 1);
  //     }, 1000);
  //   } else if (showTimer) {
  //     setShowTimer(false);
  //     setSecondsLeft(10);
  //   }

  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, [showTimer, secondsLeft]);

  // function handleClick() {
  //   setShowTimer(true);
  // }
  return (
    <>
      {/* verify otp screen   */}
      <section className="text-gray-600 body-font bg-11 bg-banner min-h-[100vh]">
        <div className="lg:container px-5 py-7 lg:mx-auto">
          <div className="flex flex-wrap text-center lg:gap-8">
            <div className="lg:w-[44%] md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-1  lg-w-[43%] bg-white">
              <h2 className="text-green-700 text-lg font-semibold mb-2 lg:mt-[4rem] mont-serif relative lg:bottom-11">
                Check your Email for verification code
              </h2>
              <div className="container mx-auto">
                <img
                  className="rounded-lg  mx-auto object-cover lg:h-[8rem] w-[auto]"
                  src={verifycode}
                  alt=""
                />
              </div>
              {/* email input  */}
              <div className="flex justify-center items-center lg:my-[3rem]">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  inputStyle={OtpCustomStyle}
                  renderInput={(props) => <input {...props} />}
                />
                {/* {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    className="text-black w-16 h-16 mx-4 text-4xl text-center border border-gray-300   bg-transparent rounded-lg focus:outline-none focus:border-indigo-500"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                  />
                ))} */}
              </div>

              {/* email input end  */}
              <div
                className="forgot-password flex flex-col gap-3 justify-center"
                style={{ alignItems: "center" }}
              >
                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                  className="mont-serif xs:w-[15rem] text-black button-1 border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[48%]"
                  disabled={loading}
                  onClick={SubmitUser}
                >
                  {loading ? <Spinner /> : 'Confirm'}
                </button>
                {/* {!showTimer && (
                  <button
                    style={{ borderRadius: "11px", fontSize: "14px" }}
                    className="mont-serif xs:w-[15rem] text-black button-1 border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[48%]"
                    onClick={handleClick}
                  >
                    confirm
                  </button>
                )}
                {showTimer && (
                  <div className="flex gap-2  lg:w-[48%] justify-center border rounded bg-transparent lg:p-[2px] focus:outline-none text-lg drop-shadow-md shadow-lg">
                    <span className="text-black xs:w-[15rem]"> send again in</span>{" "}
                    <p className="text-black xs:w-[15rem]">{` ${secondsLeft}s`}</p>
                  </div>
                )} */}
                <button
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                  onClick={ResendOTPToUSer}
                  disabled={otpLoading}
                  className=" xs:w-[15rem] mont-serif lg:w-[18rem] text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg button-1-hover"
                >
                  {otpLoading ? <Spinner /> : 'Resend OTP'}
                </button>
                <Link to="/" >
                  <button
                    style={{ borderRadius: "11px", fontSize: "14px" }}
                    className=" xs:w-[15rem] mont-serif lg:w-[18rem] text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg button-1-hover"
                  >
                    Go back
                  </button>
                </Link>
              </div>
            </div>

            {/* flex-2  */}
            <div className="sm:w-1/2 px-4 lg:p-[14px] xs:hidden lg:block">
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
                  className="mont-serif bg-green-800  text-white border-0  lg:w-[9rem] lg:p-[2px] rounded text-lg drop-shadow-md shadow-lg"
                >
                  Login
                </button>
              </div>

              <div
                className="flex flex-col justofy-center align-middle"
                style={{ alignItems: "center" }}
              >
                <h1 className="text-white text-lg font-semibold lg:mt-20   relative lg:bottom-11 mont-serif">
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
                className="forgot-password flex flex-col gap-3 justify-center  lg:mt-[6rem]"
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
      {error && message?.length > 0 && message?.map((msg) => (
        <MessageAlerts message={msg} variant={variant} setError={setError} />
      ))
      }
    </>
  );
}
