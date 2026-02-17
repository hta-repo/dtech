import React from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload } from "react-icons/fa";

function Formupload() {
  const navigate = useNavigate();

  const back = () => {
    navigate(`/dashboard`);
  };

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center">
          <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[22px] xs:mt-[6px]">
            Form Uploads
          </h1>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-5 my-10">
          <a href={process.env.REACT_APP_PDF_URL + "downloads/memberShip.pdf"} target="_blank" rel="noreferrer">
            <div className="h-[9rem] rounded-[20px] overflow-hidden text-center relative bg-home transform hover:scale-105 duration-500 ease-in-out cursor-pointer w-[15rem]">
              <h6 className="text font-extrabold relative xs:mt-[3.5rem] lg:top-[3rem] text-center">
                <FaDownload style={{ margin: "10px auto", fontSize: "30px" }} />
                Membership
              </h6>
            </div>
          </a>
          <a href={process.env.REACT_APP_PDF_URL + "downloads/memberShip.pdf"} target="_blank" rel="noreferrer">
            <div className="h-[9rem] rounded-[20px] overflow-hidden text-center relative bg-home transform hover:scale-105 duration-500 ease-in-out cursor-pointer w-[15rem]">
              <h6 className="text font-extrabold relative xs:mt-[3.5rem] lg:top-[3rem] text-center">
                <FaDownload style={{ margin: "10px auto", fontSize: "30px" }} />
                Visitors Information
              </h6>
            </div>
          </a>
          <a href={process.env.REACT_APP_PDF_URL + "downloads/memberShip.pdf"} target="_blank" rel="noreferrer">
            <div className="h-[9rem] rounded-[20px] overflow-hidden text-center relative bg-home transform hover:scale-105 duration-500 ease-in-out cursor-pointer w-[15rem]">
              <h6 className="text font-extrabold relative xs:mt-[3.5rem] lg:top-[3rem] text-center">
                <FaDownload style={{ margin: "10px auto", fontSize: "30px" }} />
                One-2-One
              </h6>
            </div>
          </a>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center mt-[1rem]">
          <button onClick={back}
            className="border border-green-900  w-[17rem] p-[4px] rounded-md mont-serif fade-in-right mb-12"
            type="submit"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}

export default Formupload;
