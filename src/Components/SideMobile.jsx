import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Icons
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineManageSearch } from "react-icons/md"
import { AiFillHome } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { MdContactPhone } from "react-icons/md";
import {
  BsPeopleFill,
  BsFillShieldLockFill,
  BsFillChatFill,
} from "react-icons/bs";
import { HiLink } from "react-icons/hi";
import { HiRocketLaunch } from "react-icons/hi2";
import { FaCalculator, FaUsers } from "react-icons/fa";
import Logout from "./Home/Logout.png";

//  Redux
import { useSelector } from "react-redux";

//  Loader
import Spinner from "./Spinner/Spinner";

// Api
import { logout } from "../services/user.services";

export default function SideMobile({ firebaseToken }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlelogout = () => {
    (async () => {
      setLoading(true)
      const formData = new FormData();
      formData.append("fcm_token", firebaseToken);

      const response = await logout(formData);
      if (response.data.status) {
        localStorage.removeItem("loggedUser");
        setLoading(false)
        document.location.reload(navigate("/"));
      }
    })();
  };

  return (
    <>
      {isModalOpen && (
        <div className=" fade-in-top fixed z-[99] overflow-y-auto top-0 w-full left-0">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[608px] h-full scale-in-center"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white flex flex-col items-center">
                <span
                  onClick={toggleModal}
                  className="relative left-[9rem] mt-[15px] text-[29px] cursor-pointer text-black"
                >
                  <RxCross1 />
                </span>
                <div className="img">
                  <img
                    src={Logout}
                    className="mx-auto h-[11rem] relative left-[12px]"
                    alt="Logout"
                  />
                </div>
                <div className="mont-serif text-lg text-[#005125] text-center font-semibold leading-relaxed mt-3">
                  Are you sure you want to logout
                </div>
                <div className=" mont-serif text-lg text-[#005125] text-center font-semibold leading-relaxed">
                  from all accounts?
                </div>
              </div>
              <div className="lg:p-[40px] sm:py-[1rem] xs:py-[1rem] flex flex-col justify-center items-center bg-white mx-auto gap-2">
                <button onClick={handlelogout} disabled={loading} className="btn-create mont-serif text-black"
                  style={{ width: "250px" }}>
                  {loading ? <Spinner /> : 'Logout'}
                </button>
                <button
                  onClick={toggleModal}
                  className="btn-dc border border-green-700 mont-serif text-black"
                  style={{ width: "250px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <nav className="bg-card">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              <button
                onClick={toggleNavbar}
                className="inline-flex items-center justify-center p-2  text-white focus:outline-none "
              >
                {isOpen ? (
                  <FiX className="h-6 w-6 focus:outline-0 hover:border-none text-white" />
                ) : (
                  <FiMenu className="h-6 w-6 focus:outline-0 hover:border-none text-white" />
                )}
              </button>
            </div>
            <MdOutlineManageSearch className="text-[33px] absolute text-white" onClick={toggleDropdown} />
            {isDropdownOpen && (
              <div className="absolute mt-2 w-[23.2rem] bg-white rounded-md drop-filter lg:left-[188px] xs:top-[5rem] scale-up-ver-top z-10	">

                <div className="relative text-gray-600 focus-within:text-gray-400 mt-4 mb-4">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                      type="submit"
                      className="p-1 focus:outline-none focus:shadow-outline"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                      >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    name="q"
                    className="py-2 text-sm text-black bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-[42vh]"
                    placeholder="Search..."
                    autoComplete="off"
                  />
                </div>
                <div className="py-1">
                  {/* // */}
                  {/* text  */}
                  <div className="flex flex-row items-center gap-[9rem] lg:mt-[6px]">
                    <h1 className="mont-serif text-[20px] font-semibold ml-4 text-[#007033] ">
                      Skills in Demand{" "}
                    </h1>
                    <RxCross1
                      className="lg:text-[20px] cursor-pointer"
                      onClick={toggleDropdown}
                    />
                  </div>
                  {/* <hr  className='border-dashed border-[1px] mt-3 border-[#007033] ' /> */}
                  {/* // flter option  */}
                  <div className="flex-wrap justify-start mt-[13px] gap-3 lg:w-[max-content]">
                    <div className=" xs:flex-wrap lg:flex gap-2 ml-[2rem]">
                      <button className="filled-true p-[3px] lg:lg:w-[84px] xs:w-[6rem] mont-serif text-white ">
                        no.1
                      </button>
                      <button className=" xs:ml-[4px] bg-default  p-[3px] lg:w-[185px] xs:w-[10rem] mont-serif ">
                        Second Option
                      </button>
                      <button className="  xs:ml-[4px] bg-default  p-[3px] lg:w-[142px] mont-serif   xs:w-[6rem] ">
                        # three
                      </button>
                      <button className=" xs:mt-[6px]  bg-default  p-[3px] lg:w-[176px] mont-serif  xs:w-[8rem]">
                        next choice
                      </button>
                    </div>
                  </div>
                  <div className="flex-wrap justify-start mt-3 gap-3 lg:w-[max-content]">
                    <div className=" xs:flex-wrap lg:flex gap-2 ml-[2rem]">
                      <button className="filled-true p-[3px] lg:lg:w-[84px] xs:w-[6rem] mont-serif text-white ">
                        no.1
                      </button>
                      <button className=" xs:ml-[4px] bg-default  p-[3px] lg:w-[185px] xs:w-[10rem] mont-serif ">
                        Second Option
                      </button>
                      <button className="  xs:ml-[4px] bg-default  p-[3px] lg:w-[142px] mont-serif   xs:w-[6rem] ">
                        # three
                      </button>
                      <button className=" xs:mt-[6px]  bg-default  p-[3px] lg:w-[176px] mont-serif  xs:w-[8rem]">
                        next choice
                      </button>
                    </div>
                  </div>
                  {/* -- filter -a option ended */}
                  {/* <hr  className='border-dashed border-[1px] mt-3 border-[#007033] ' /> */}

                  <hr className="relative lg:top-[1rem]" />
                  <h1 className="mont-serif text-[20px] font-semibold ml-4 text-[#007033] mt-6 ">
                    Popular Company Research{" "}
                  </h1>

                  {/* ---vb */}
                  <div className="flex-wrap justify-start mt-[13px] gap-3 lg:w-[max-content]">
                    <div className=" xs:flex-wrap lg:flex gap-2 ml-[2rem]">
                      <button className="filled-true p-[3px] lg:lg:w-[84px] xs:w-[6rem] mont-serif text-white ">
                        no.1
                      </button>
                      <button className=" xs:ml-[4px] bg-default  p-[3px] lg:w-[185px] xs:w-[10rem] mont-serif ">
                        Second Option
                      </button>
                      <button className="  xs:ml-[4px] bg-default  p-[3px] lg:w-[142px] mont-serif   xs:w-[6rem] ">
                        # three
                      </button>
                      <button className=" xs:mt-[6px]  bg-default  p-[3px] lg:w-[176px] mont-serif  xs:w-[8rem]">
                        next choice
                      </button>
                    </div>
                  </div>
                  <div className="flex-wrap justify-start mt-3 gap-3 lg:w-[max-content] lg:mb-8">
                    <div className=" xs:flex-wrap lg:flex gap-2 ml-[2rem]">
                      <button className="filled-true p-[3px] lg:lg:w-[84px] xs:w-[6rem] mont-serif text-white ">
                        no.1
                      </button>
                      <button className=" xs:ml-[4px] bg-default  p-[3px] lg:w-[185px] xs:w-[10rem] mont-serif ">
                        Second Option
                      </button>
                      <button className="  xs:ml-[4px] bg-default  p-[3px] lg:w-[142px] mont-serif   xs:w-[6rem] ">
                        # three
                      </button>
                      <button className=" xs:mt-[6px]  bg-default  p-[3px] lg:w-[176px] mont-serif  xs:w-[8rem]">
                        next choice
                      </button>
                    </div>
                  </div>
                  {/* ----b  */}
                </div>
              </div>
            )}
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">


              <div className="flex-shrink-0 flex items-center">
                <Link
                  to="/"
                  className="text-white text-xl font-bold font-all mont-serif"
                >
                  10X Raabit
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "h-[auto]" : "h-0"
            }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/dashboard' ? 'bg-[#007033]' : ''}`}
            >
              Home <AiFillHome className="text-white" />
            </Link>
            <Link
              to="/aboutus"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/aboutus' ? 'bg-[#007033]' : ''}`}
            >
              About
              <BsPeopleFill className="text-white" />
            </Link>
            <Link
              to="/members"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/members' ? 'bg-[#007033]' : ''}`}
            >
              Members
              <FaUsers className="text-white" />
            </Link>
            <Link
              to="/league"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/league' ? 'bg-[#007033]' : ''}`}
            >
              Leagues  <HiRocketLaunch className="text-white" />
            </Link>
            <Link
              to="/leaderboard"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/leaderboard' ? 'bg-[#007033]' : ''}`}
            >
              {loggedUserInfo?.is_lg_admin === 1 ? "Leaderboard" : "Points Activity"}
              <HiRocketLaunch className="text-white" />
            </Link>
            <Link
              to="/event"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/event' ? 'bg-[#007033]' : ''}`}
            >
              Events   <FaCalculator className="text-white" />
            </Link>
            <Link
              to="/meetings"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/meetings' ? 'bg-[#007033]' : ''}`}
            >
              Meetings   <MdContactPhone className="text-white" />
            </Link>
            <Link
              to="/chats"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/chats' ? 'bg-[#007033]' : ''}`}
            >
              Chats  <BsFillChatFill className="text-white" />
            </Link>
            <Link
              to="/referal"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/referal' ? 'bg-[#007033]' : ''}`}
            >
              Invitation  <HiLink className="text-white" />
            </Link>
            <Link
              to="/complain"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/complain' ? 'bg-[#007033]' : ''}`}
            >
              Lodge Complaint  <FaUsers className="text-white" />
            </Link>
            <Link
              to="/privacy"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/privacy' ? 'bg-[#007033]' : ''}`}
            >
              Privacy
              <BsFillShieldLockFill className="text-white" />
            </Link>
            {/*  */}
            <hr className="border-dashed border-[px] border-white" />
            <div
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3`}
              onClick={() => setModalOpen(true)}
            >
              Logout    <HiLink className="text-white" />
            </div>
            {/*  */}
          </div>
        </div>
      </nav>
    </>
  );
}
