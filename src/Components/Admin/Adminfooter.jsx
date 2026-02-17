import React from 'react'
import { BsFacebook, BsLinkedin, BsInstagram, BsYoutube } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

function Adminfooter() {

  return (
    <div>
      <div className="xs:hidden p-[4px] md:flex bg-[#FAFAFA] shadow-22xl md:items-center md:justify-between footer dropshadow-sm">
        <span className="text-sm text-black sm:text-center dark:text-gray-400 relative lg:left-[18px]">
          Copyrights © 2023 All are Reserved By 360
        </span>

        <div className="flex flex-row justify-center items-center gap-4">
          <span className="icons-d lg:p-[4px] text-[22px]">
            <BsFacebook />
          </span>{" "}
          <span className="icons-d text-[25px]" style={{ borderRadius: "9px" }}>
            <AiFillTwitterCircle />
          </span>
          <span className="icons-d  lg:p-1 text-[22px]">
            <BsLinkedin style={{ borderRadius: "12px" }} />
          </span>{" "}
          <div className="bg-[green] lg:p-[4px]" style={{ borderRadius: "9px" }}>
            <span className=" text-white">
              <BsInstagram />
            </span>{" "}
          </div>
          <span className="bg-[green] text-white lg:p-[4px]" style={{ borderRadius: "9px" }}>
            <BsYoutube />
          </span>
        </div>

        <ul className=" relative right-12 flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <Link to="">
            <li className=" border-r-2  border-black">
              <span className="mr-4 hover:underline md:mr-6 ">
                About
              </span>
            </li>
          </Link>
          <Link to="/admin/privacy">
            <li className="">
              <span className="mr-4 hover:underline md:mr-6 relative left-[11px]">
                Privacy Policy
              </span>
            </li>
          </Link>
          <li className=" border-l-2  border-l-teal-900">
            <span className="relative lg:right-[-12px] mr-4 hover:underline md:mr-6">
              Licensing
            </span>
          </li>
          <li className=" border-l-2  border-l-teal-900">
            <span className="relative left-[11px] hover:underline">
              Contact
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Adminfooter
