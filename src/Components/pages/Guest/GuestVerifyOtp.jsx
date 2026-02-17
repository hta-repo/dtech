import { useState } from "react";

import verifycode from "../../../assets/welcomepage/otp.png";
import { useLocation, useNavigate } from "react-router-dom";

//  OTP
import OtpInput from 'react-otp-input';
import authService from "../../../services/auth.services";

//  Alerts
import MessageAlerts from "../../MessageAlerts";

//  Loader
import Spinner from "../../Spinner/Spinner";

const OtpCustomStyle = {
  width: '4rem',
  height: '4rem',
  fontSize: '24px',
  border: '1px solid #D1D5DB',
  borderRadius: '0.5rem',
  marginLeft: '1.5rem',
}
export default function GuestVerifyOtp() {
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
        const response = await authService.guest_verify_otp(data);
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

  return (
    <>
      <div className="h-screen bg-banner bg-11">
        <div className="bg-white lg:w-[41%] lg:mx-auto rounded-md relative xs:top-[3rem] lg:top-8 fade-in-left">
          <div className="rounded-lg p-8 flex flex-col w-full bg-1 bg-white">
            <h2 className="text-black text-lg font-semibold  mb-5 lg:mt-[4rem] mont-serif relative lg:bottom-11 text-center">
              VERIFY CODE
            </h2>
            <div className="container mx-auto">
              <img
                className="rounded-lg  mx-auto object-cover lg:h-[7rem] w-[auto]"
                src={verifycode}
                alt=""
              />
            </div>
            <div className="flex justify-center items-center lg:mt-[4rem] lg:mb-16">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputStyle={OtpCustomStyle}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div
              className="forgot-password flex flex-col gap-3 justify-center mt-6"
              style={{ alignItems: "center" }}
            >
              <button
                style={{ borderRadius: "11px", fontSize: "14px" }}
                onClick={ResendOTPToUSer}
                disabled={otpLoading}
                className=" xs:w-[15rem] mont-serif lg:w-[48%] text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg button-1-hover"
              >
                {otpLoading ? <Spinner /> : 'Resend OTP'}
              </button>
              <button
                style={{ borderRadius: "11px", fontSize: "14px" }}
                className="mont-serif xs:w-[15rem] text-black button-1 border-0 py-1 px-8 focus:outline-none rounded text-lg lg:w-[48%]"
                disabled={loading}
                onClick={SubmitUser}
              >
                {loading ? <Spinner /> : 'Confirm'}
              </button>
              {/* <Link to="/guest-pending-verification">
              <button
                style={{ borderRadius: "11px", fontSize: "14px" }}
                className=" xs:w-[15rem] mont-serif lg:w-[15rem] text-black  bg-white border-0 lg:p-[2px] focus:outline-none hover:bg-teal-100 rounded text-lg drop-shadow-md shadow-lg">
                next
              </button>
            </Link> */}
            </div>
          </div>
        </div>
      </div>
      {error && message?.length > 0 && message?.map((msg) => (
        <MessageAlerts message={msg} variant={variant} setError={setError} />
      ))
      }
    </>
  );
}
