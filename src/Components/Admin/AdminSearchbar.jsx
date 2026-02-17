import React from 'react'
import { AiOutlineMail, AiTwotoneBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

function AdminSearchbar() {
  return (
    <div className="hidden lg:block">
      <div className=" xs:w-[9vh] xs:mx-auto header-content flex items-center flex-row">
        <form action="#" className="lg:ml-[16rem]">
          <div className="hidden md:flex relative lg:w-[136vh]">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              name="search"
              className=" mont-serif text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg  w-full h-10 focus:outline-none "
              placeholder="Search by company member , company or chapter"
            />
          </div>
          <div className="flex md:hidden">
            <a
              href="#/"
              className="flex items-center justify-center h-10 w-10 border-transparent"
            >
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </a>
          </div>
        </form>
        <div
          className="flex justify-center mx-auto m-auto lg:gap-[1rem]"
          style={{ alignItems: "center" }}
        >
          <AiOutlineMail />
          <AiTwotoneBell />
          <FaUserAlt className='cursor-pointer' />
        </div>
      </div>

    </div>
  )
}

export default AdminSearchbar
