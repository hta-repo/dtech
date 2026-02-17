import React, { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Image
import Sharelink from "../../assets/welcomepage/sharelink.png";

//  Redux
import { useSelector } from "react-redux";

export default function Referallink() {
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const h3Ref = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {

    const h3Text = h3Ref.current.textContent;
    await navigator.clipboard.writeText(h3Text);

    setIsCopied(true);
    toast.success('Invitation Link has been copied!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
    setTimeout(() => setIsCopied(false), 3000);

  };

  return (
    <>
      <ToastContainer />
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div className="main-content flex flex-col flex-grow">
          <div className="lg:p-10 bg-about text-center">
            <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[20px] xs:mt-[9px]	 ">
              Invitation
            </h1>
          </div>
          {/* content static text */}
          <div className="text-gray-600 ">
            <div className="lg:container px-5 py-8 mx-aut">
              <div className="flex lg:flex-row xs:flex-col items-center lg:gap-[11rem] lg:p-[19px]">
                <div className="img">
                  <img className='h-[25rem]  fade-in  ml-4 xs:fade-in-left' src={Sharelink} alt="ref" />
                </div>
                <div className="flex flex-col items-center lg:gap-[3rem] xs:mt-[2rem] xs:gap-[1rem]">
                  <div className="text-link mont-serif">
                    <h3 ref={h3Ref} className='text-[#6060e2] font-bold underline underline-offset-4'>{process.env.REACT_APP_SITE_URL + 's/' + loggedUserInfo?.ref_code}</h3>
                  </div>
                  <button
                    className={`button-otp mont-serif text-black lg:p-[3px] w-[15rem] scale-in-hor-right ${isCopied ? 'bg-green-300 rounded-md scale-in-hor-right' : ''
                      }`}
                    onClick={handleCopyClick}
                  >
                    {isCopied ? 'Link has been copied!' : 'Copy invitation link'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
