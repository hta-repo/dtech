import React, { useState, useEffect } from "react";
import logo from "../assets/welcomepage/logo-1.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { HiLink } from "react-icons/hi";
import { MdContactPhone } from "react-icons/md";
import { HiRocketLaunch } from "react-icons/hi2";
import { FaCalculator, FaUsers } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import Logout from "./Home/Logout.png";
//  Image
import DefaultImage from "../assets/defaultImage.png"

//  Redux
import { useSelector } from "react-redux";

// Api
import { logout } from "../services/user.services";

//  Loader
import Spinner from "./Spinner/Spinner";

export default function Sidebar({ firebaseToken }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
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
              className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[608px] h-full scale-in-center"
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
                    alt="Logout"
                  />
                </div>
                <div className=" mont-serif text-2xl text-[#005125] text-center font-semibold leading-relaxed mt-3">
                  Are you sure you want to logout
                </div>
                <div className=" mont-serif text-2xl text-[#005125] text-center font-semibold leading-relaxed">
                  from all accounts?
                </div>
              </div>
              <div className=" lg:p-[40px] flex flex-col justify-center items-center bg-white mx-auto gap-2 ">
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

      <aside className="sidebar w-64 lg:h-[96%] md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-card">
        <div className="sidebar-header flex items-center justify-center py-4 lg-h-[100vh]">
          <div className="inline-flex">
            <span
              className="inline-flex flex-row items-center cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <img src={logo} className="w-[auto] h-[58px]" alt="" />
              <span className="leading-10 text-gray-100 text-2xl font-semi-bold uppercase mont-serif text-[20px] ml-[12px]">
                10X Raabit
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap- ml-[18px]">
          <img
            className="object-cover w-[45px] h-[45px] rounded-full mr-[10px]"
            src={loggedUserInfo?.avatar ? process.env.REACT_APP_API_IMAGE_URL + loggedUserInfo?.avatar : DefaultImage}
            alt=""
          />

          <div className="cursor-pointer">
            <h1 className="text-lg text-white text-[15px] cursor-pointer">
              {loggedUserInfo?.name}
            </h1>
            <p className="text-sm text-white mont-serif text-[10px] cursor-pointer">
              {loggedUserInfo?.designation?.name} <span style={{ fontSize: "12px" }}>({loggedUserInfo?.points})</span>
            </p>
          </div>
        </div>
        <div className="sidebar-content px-4 py-6">
          <ul className="flex flex-col w-full text-sm">
            <Link to="/dashboard">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-8 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/dashboard' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <AiFillHome className="text-white" />
                  </span>
                  <span className="ml-3 mont-serif text-white text-sm">Home</span>
                </span>
              </li>
            </Link>

            <Link to="/members">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-8 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/members' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <FaUsers className="text-white" />
                  </span>
                  <span className="ml-3 text-sm">Members</span>
                </span>
              </li>
            </Link>

            <Link to="/league">
              <li className="my-px">
                <div
                  className={`flex flex-row items-center h-8 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/league' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm text-white">
                    <HiRocketLaunch />
                  </span>
                  <span className="ml-3 text-sm">League</span>
                </div>
              </li>
            </Link>

            <Link to="/leaderboard">
              <li className="my-px">
                <div
                  className={`flex flex-row items-center h-8 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/leaderboard' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm text-white">
                    <HiRocketLaunch />
                  </span>
                  <span className="ml-3 text-sm">{loggedUserInfo?.is_lg_admin === 1 ? "Leaderboard" : "Points Activity"}</span>
                </div>
              </li>
            </Link>

            <Link to="/event">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-8 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/event' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm text-white">
                    <FaCalculator />
                  </span>
                  <span className="ml-3 text-sm">Events</span>
                </span>
              </li>
            </Link>

            <Link to="/meetings">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-8 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/meetings' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm text-white">
                    <MdContactPhone />
                  </span>
                  <span className="ml-3 text-sm">Meetings</span>
                </span>
              </li>
            </Link>

            <Link to="/chats">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-8 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/chats' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm text-white">
                    <BsFillChatFill />
                  </span>
                  <span className="ml-3 text-sm">Chats</span>
                </span>
              </li>
            </Link>

            <Link to="/referal">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-8 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/referal' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm text-white">
                    <HiLink />
                  </span>
                  <span className="ml-3 text-sm">Invitation</span>
                </span>
              </li>
            </Link>

            <Link to="/complain">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-8 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/complain' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm">
                    <FaUsers className="text-white" />
                  </span>
                  <span className="ml-3 text-sm">Lodge Complaint</span>
                </span>
              </li>
            </Link>

            <Link to="/settings">
              <li className="my-px">
                <span
                  className={`flex flex-row items-center h-8 px-3 rounded-lg text-white mont-serif hover:bg-[#007033] ${location.pathname === '/settings' ? 'bg-[#007033]' : ''}`}
                  style={{ borderRadius: "50px" }}
                >
                  <span className="flex items-center justify-center text-sm text-white">
                    <AiFillSetting />
                  </span>
                  <span className="ml-3 text-sm">Settings</span>
                </span>
              </li>
            </Link>

            <li className="my-px lg:absolute  lg:bottom-6 lg:w-[75%] cursor-pointer" onClick={() => setModalOpen(true)}>
              <span
                className="flex flex-row items-center h-10 px-3 rounded-lg text-white mont-serif hover:bg-[#007033]  "
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
