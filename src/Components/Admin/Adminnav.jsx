import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Icons
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import { HiLink } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { MdContactPhone } from "react-icons/md";
import { BiSolidCategoryAlt, BiMessageRoundedError } from "react-icons/bi";
import { HiRocketLaunch } from "react-icons/hi2";
import Logout from "../Home/Logout.png";

// Api
import { logout } from "../../services/user.services";

//  Loader
import Spinner from "../Spinner/Spinner";

const Adminnav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
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
              to="/admin/dashboard"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/admin/dashboard' ? 'bg-[#007033]' : ''}`}
            >
              Home <AiFillHome className="text-white" />
            </Link>

            <Link
              to="/admin/member"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/admin/member' ? 'bg-[#007033]' : ''}`}
            >
              Members
              <BsFillPersonFill className="text-white" />
            </Link>
            <Link
              to="/admin/meetings"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/admin/meetings' ? 'bg-[#007033]' : ''}`}
            >
              Meetings
              <MdContactPhone className="text-white" />
            </Link>
            <Link
              to="/admin/events"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/admin/events' ? 'bg-[#007033]' : ''}`}
            >
              Events <HiRocketLaunch className="text-white" />
            </Link>
            <Link
              to="/admin/business-categories"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/admin/business-categories' ? 'bg-[#007033]' : ''}`}
            >
              Business Categories <BiSolidCategoryAlt className="text-white" />
            </Link>
            <Link
              to="/admin/testimonials"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/admin/testimonials' ? 'bg-[#007033]' : ''}`}
            >
              Testimonials <AiFillMessage className="text-white" />
            </Link>
            <Link
              to="/admin/leaderboard"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/admin/leaderboard' ? 'bg-[#007033]' : ''}`}
            >
              Leaderboard <HiRocketLaunch className="text-white" />
            </Link>
            <Link
              to="/admin/complains"
              onClick={toggleNavbar}
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3 hover:bg-[#007033] ${location.pathname === '/admin/complains' ? 'bg-[#007033]' : ''}`}
            >
              Complaints
              <BiMessageRoundedError className="text-white" />
            </Link>
            <hr className="border-dashed border-[px] border-white" />
            <div
              className={`text-white lg:block px-3 py-2 text-base border-t-[1.1px] border-white text-center mont-serif flex items-center justify-center flex-row-reverse font-bold gap-3`}
              onClick={() => setModalOpen(true)}
            >
              Logout    <HiLink className="text-white" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Adminnav;
