import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./AdminImage/logo-1.png";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdContactPhone } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { BiMessageRoundedError, BiSolidCategoryAlt } from "react-icons/bi";
import { RxExit } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { HiRocketLaunch } from "react-icons/hi2";
import Logout from "../Home/Logout.png";

//  Image
import DefaultImage from "../../assets/defaultImage.png"

//  Redux
import { useSelector } from "react-redux";

// Api
import { logout } from "../../services/user.services";

//  Loader
import Spinner from "../Spinner/Spinner";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlelogout = () => {
    (async () => {
      setLoading(true)
      const response = await logout();
      if (response.data.status) {
        localStorage.removeItem("loggedUser");
        setLoading(false)
        document.location.reload(navigate("/"));
      }
    })();
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              className="inline-block align-center rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[608px] h-full scale-in-center"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white flex flex-col items-center">
                <span
                  onClick={toggleModal}
                  className="relative left-[15rem] mt-[15px] text-[29px] cursor-pointer text-black"
                >
                  <RxCross1 />
                </span>
                <div className="img">
                  <img
                    src={Logout}
                    className="mx-auto h-[11rem] relative left-[12px]"
                    alt="logout"
                  />
                </div>
                <div className=" mont-serif text-2xl text-[#005125] text-center font-semibold leading-relaxed mt-3">
                  Are you sure you want to logout
                </div>
                <div className=" mont-serif text-2xl text-[#005125] text-center font-semibold leading-relaxed">
                  from all accounts?
                </div>
              </div>
              <div className=" lg:p-[40px] flex flex-col justify-center items-center bg-white mx-auto gap-2">
                <button onClick={handlelogout} disabled={loading} className="btn-create mont-serif text-black"
                  style={{ width: "250px" }}
                >
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

      <aside className="sidebar w-64 lg:h-[100%] md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-card">
        <div className="sidebar-header flex items-center justify-center py-4 lg-h-[100vh]">
          <div className="inline-flex">
            <span className="inline-flex flex-row items-center cursor-pointer">
              <img src={logo} className="w-[auto] h-[58px]" alt="" />
              <span className="leading-10 text-gray-100 text-2xl font-semi-bold uppercase mont-serif text-[20px] ml-[12px]">
                10X Raabit
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap- ml-[18px]">
          <img
            className="object-cover w-[55px] h-[55px] rounded-full mr-[10px]"
            src={loggedUserInfo?.avatar ? process.env.REACT_APP_API_IMAGE_URL + loggedUserInfo?.avatar : DefaultImage}
            alt=""
          />
          <div className="cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
            <h1 className="text-lg text-white mont-serif text-[17px] cursor-pointer">
              {loggedUserInfo.name}
            </h1>
            <p className="text-sm text-white text-[10px] cursor-pointer">
              {loggedUserInfo?.designation?.name}
            </p>
          </div>
        </div>
        <div className="sidebar-content px-4 py-6">
          <ul className="flex flex-col w-full">

            <Link to="/admin/dashboard">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-9 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/admin/dashboard' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <AiFillHome className="text-white" />
                  </span>
                  <span className="ml-3 text-sm">Home</span>
                </span>
              </li>
            </Link>

            <Link to="/admin/member">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-9 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/admin/member' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <BsFillPersonFill className="text-white" />
                  </span>
                  <span className="ml-3 text-sm">Members</span>
                </span>
              </li>
            </Link>

            <Link to="/admin/meetings">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-9 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/admin/meetings' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <MdContactPhone />
                  </span>
                  <span className="ml-3 text-sm">Meetings</span>
                </span>
              </li>
            </Link>

            <Link to="/admin/events">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-9 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/admin/events' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <SlCalender className="text-white" />
                  </span>
                  <span className="ml-3 text-sm">Events</span>
                </span>
              </li>
            </Link>

            <Link to="/admin/business-categories">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-9 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/admin/business-categories' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <BiSolidCategoryAlt />
                  </span>
                  <span className="ml-3 text-sm">Business Categories</span>
                </span>
              </li>
            </Link>

            <Link to="/admin/testimonials">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-9 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/admin/testimonials' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <AiFillMessage />
                  </span>
                  <span className="ml-3 text-sm">Testimonials</span>
                </span>
              </li>
            </Link>

            <Link to="/admin/leaderboard">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-9 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/admin/leaderboard' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <HiRocketLaunch />
                  </span>
                  <span className="ml-3 text-sm">Leaderboard</span>
                </span>
              </li>
            </Link>
            <Link to="/admin/complains">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-9 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/admin/complains' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <BiMessageRoundedError className="text-white" />
                  </span>
                  <span className="ml-3 text-sm">Complaints</span>
                </span>
              </li>
            </Link>

            <li className="my-px lg:absolute  lg:bottom-6 lg:w-[75%] cursor-pointer" onClick={() => setModalOpen(true)}>
              <span
                className="flex flex-row items-center h-10 px-3 rounded-lg text-white mont-serif hover:bg-[#007033]"
                style={{ borderRadius: "50px" }}
              >
                <span className="flex items-center justify-center text-lg text-red-400 cursor-pointer">
                  <RxExit />
                </span>
                <span className="ml-3">Logout</span>
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
