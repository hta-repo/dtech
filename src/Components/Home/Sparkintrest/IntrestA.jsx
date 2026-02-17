import React, { useState } from "react";

// Component 
import IntrestB from "./IntrestB";
// import Intrestcard from "./Intrestcard";

export default function IntrestA() {

  const [selectedVal, setSelectedVal] = useState(null);
  const [newStep, SetNewStep] = useState(false);
  const [idHide, setIdHide] = useState(false);

  const [leagueSelected, setLeagueSelected] = useState(false);
  const [companySelected, setCompanySelected] = useState(false);
  const [memberSelected, setMemberSelected] = useState(false);

  const handleLeagueClick = () => {
    setLeagueSelected(true)
    setCompanySelected(false)
    setMemberSelected(false)

    setSelectedVal("league")
  };

  const handleCompaniesClick = () => {
    setLeagueSelected(false)
    setCompanySelected(true)
    setMemberSelected(false)

    setSelectedVal("company")
  };

  const handleMembersClick = () => {
    setLeagueSelected(false)
    setCompanySelected(false)
    setMemberSelected(true)

    setSelectedVal("members")
  };

  const EmptyValues = () => {
    setIdHide(true)
    const gamificationObject = {
      gamification: true
    }
    localStorage.setItem("gameObj", JSON.stringify(gamificationObject));
  };

  return (
    <>
      <div
        id="intrest"
        style={{ display: idHide || newStep ? "none" : "block" }}
        className="p-6 h-max intrest mt-3 lg:w-[100%] xs:min-h-max">
        <div className="intrest-card-d">
          <div className="flex flex-col lg:gap-2"
          >
            <div className=" xs:relative xs:top-[0.5rem] lg:text-y inline-flex flex-col xs:gap-1">
              <h3 className=" xs:text-[20px] lg:text-left text-black  mont-serif lg:text-2xl inline lg:mt-[16px]">
                Q: What sparks your interest today?
              </h3>
              {/* <p className="xs:contents text-left text-[#676767] mont-serif inline relative top-[7px] left-[41px]">
            Choose as many as you like
          </p> */}
            </div>
            <div className="flex lg:flex-row xs:flex-col lg:gap-[3rem] items-center xxl:gap-[1rem]">
              <div className="flex flex-row flex-wrap gap-2 mt-[2rem] w-full md:w-4/5 lg:w-4/5 xxl:w-4/5">
                <button
                  className={`py-[5px] px-[30px] lg:min-w-[4rem] mont-serif text-white ${leagueSelected
                    ? "filled-true"
                    : "bg-default"
                    }`}
                  onClick={handleLeagueClick}
                >
                  League Events
                </button>
                <button className={`py-[5px] px-[30px] lg:min-w-[4rem] mont-serif text-white ${companySelected
                  ? "filled-true"
                  : "bg-default"
                  }`}
                  onClick={handleCompaniesClick}
                >
                  Companies
                </button>
                <button className={`py-[5px] px-[30px] lg:min-w-[4rem] mont-serif text-white ${memberSelected
                  ? "filled-true"
                  : "bg-default"
                  }`}
                  onClick={handleMembersClick}
                >
                  Members
                </button>
              </div>
              <div
                className="flex flex-col gap-2 relative top-[1rem] xs:mb-[3rem] ms:mt-[1rem]"
                id="button"
              >
                <button className=" xs:w-[11rem] xxl:w-[11rem] lg:w-[17rem] p-[7px] bg-default border-md"
                  onClick={EmptyValues}
                >
                  Skip
                </button>
                <button
                  className="next xs:w-[11rem] xxl:w-[11rem]  lg:w-[17rem] p-[7px]" disabled={selectedVal === null}
                  onClick={() => SetNewStep(true)}
                  id="skip"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {newStep && (
        <IntrestB value={selectedVal} />
      )}
    </>
  )
}
