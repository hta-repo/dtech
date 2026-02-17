import React from "react";
import { useNavigate } from "react-router-dom";

function AdminList() {
  const navigate = useNavigate();

  const handleteam = () => {
    navigate(`/admin/leadership-team`)
  }

  const handlelist = () => {
    navigate(`/admin/leagues`)
  }

  const handlecencom = () => {
    navigate(`/admin/cencom`)
  }

  return (
    <div className="flex flex-row gap-4 lg:justify-center xs:justify-start mb-5">
      <div onClick={handleteam} className="bg-home cursor-pointer lg:w-[285px] lg:h-[100px] xs:w-[10rem] xs:h-[5rem]">
        <h1 className="text mont-serif text-center xs:mt-[2.5rem] lg:mt-[3.5rem]">
          Leadership Team
        </h1>
      </div>
      <div onClick={handlelist} className="bg-home cursor-pointer lg:w-[285px] lg:h-[100px] xs:w-[10rem] xs:h-[5rem]">
        <h1 className="text mont-serif text-center xs:mt-[2.5rem] lg:mt-[3.5rem]">
          10x Club
        </h1>
      </div>
      <div className="bg-home cursor-pointer lg:w-[285px] lg:h-[100px] xs:w-[10rem] xs:h-[5rem]" onClick={handlecencom}>
        <h1 className="text mont-serif text-center xs:mt-[2.5rem] lg:mt-[3.5rem]">
          Cencom
        </h1>
      </div>
    </div>
  );
}

export default AdminList;
