import React from "react";
// import { useNavigate } from "react-router-dom";

export default function Approvalpendingform() {
  // const navigate = useNavigate();

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center">
          <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]">
            Verifying
          </h1>
        </div>
        <div className="approvalpending-countdown mb-[5rem]">
          <div className="w-[60%] mx-auto flex flex-col justify-center mt-8 gap-[2rem]">
            <h1 className="text-3xl font-bold text-center mont-serif text-[#005125]">
              Approval Pending
            </h1>
            <img
              src="https://cdn.dribbble.com/users/11609495/screenshots/18251844/media/a4d3556d8b51796968cbcc63ea7c5abc.gif" className="scale-in-center h-[auto] w-[200px] mx-auto"
              alt=""
            />
            <h1 className="text-3xl font-bold text-center mont-serif text-[#005125]">
              Thank you for submission !
            </h1>

            <div className="text">
              <p className="mont-serif text-center text-[#005125]">
                We have received your application
              </p>
              <p className="mont-serif text-center text-[#005125] mt-2">
                Kindly wait for admin to approve your request
              </p>
            </div>
            {/* <button onClick={() => navigate('/event')} className="scale-in-hor-right lg:w-[12rem] btn-dc border border-green-700 mont-serif text-black mx-auto mt-2 mb-[5rem]">Go Back</button> */}
          </div>
        </div>
      </div>
    </main>
  );
}
