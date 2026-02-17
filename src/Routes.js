import React, { useEffect, useCallback, useState, createContext, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Layouts
import UserStructure from "./Layouts/UserStructure";
import Auth from "./Layouts/Auth";
import Admin from "./Layouts/Admin";

//components
import Homepage from "./Components/Home/Homepage";
import Aboutus from "../src/Components/Aboutus";
import OurCommunity from "../src/Components/OurCommunity";
import OurVision from "../src/Components/OurVision";
import Leaguehomea from "../src/Components/Leagues/leagueshome/Leaguehomea";
import Eventstock from "../src/Components/Events/Eventstock";
import Meetingstock from "../src/Components/Meeting/Meetingstock"
import Userchat from "../src/Components/Chats/Userchat";
import Privacystatic from "../src/Components/Privacysection/Privacystatic";
import Referallink from "../src/Components/Referall/Referallink";
import Leaderbordhome from "../src/Components/Leaderboard/Leaderbordhome";
import Formupload from "../src/Components/Home/Formupload";
import Leagueleads from "../src/Components/Leagues/Leaguelead/Leagueleads";
import Leagueroast from "../src/Components/Leagues/Leagueroaster.jsx/Leagueroast";
import Slipshome from "../src/Components/Leagues/leagueSlip/Slipshome";
import Eventdetails from "../src/Components/Events/Eventdetails";
import EditEvent from "../src/Components/Events/EditEvent";
import Neweventform from "../src/Components/Events/Registerevent/Neweventform";
import Approvalpendingform from "../src/Components/Events/Registerevent/Approvalpendingform";
import Memberdecription from "../src/Components/Members/Memberdecription";
import Membercomponent from "../src/Components/Members/Membercomponent";
import EditCompany from "../src/Components/Members/EditCompany";
import AddTestimonials from "../src/Components/Members/AddTestimonials";
// import CreateMeeting from "../src/Components/Meeting/CreateMeeting";
import EditMeeting from "../src/Components/Meeting/EditMeeting";
import MeetingDetail from "../src/Components/Meeting/MeetingDetail";
import Complain from "../src/Components/Complain/Complain";
import Settings from "../src/Components/Settings";
import RedirectPage from "../src/Components/RedirectPage";

// Admin Component
import AdminhomeMain from "../src/Components/Admin/AdminHome/AdminhomeMain";
import CreateRecurringLeague from "../src/Components/Admin/AdminHome/CreateRecurringLeague";
import EditRecurringLeague from "../src/Components/Admin/AdminHome/EditRecurringLeague";
import LeadershipTeam from "../src/Components/Admin/adminLeadershipTeam/LeadershipTeam";
import Cencom from "../src/Components/Admin/AdminCencom/Cencom";
import UnApprovedTestimonials from "../src/Components/Admin/AdminTestimonials/UnApprovedTestimonials";
import MemberAdminmain from "../src/Components/Admin/MemberAdmin/MemberAdminmain";
import AdminEventmain from "../src/Components/Admin/AdminEvent/AdminEventmain";
import Complaints from "../src/Components/Admin/AdminComplain/Complaints";
import AdminPrivacy from "../src/Components/Admin/AdminPrivacy";
import AdminLeagueList from "../src/Components/Admin/AdminHome/AdminLeagueList";
import PendingEvents from "../src/Components/Admin/AdminEvent/PendingEvents";
import ApprovedEvents from "../src/Components/Admin/AdminEvent/ApprovedEvents";
import LeaderBoard from "../src/Components/Admin/AdminLeaderBoard/LeaderBoard";

//  Admin USer
import CreateAdmin from "../src/Components/Admin/AdminCencom/CreateAdmin";
import EditAdmin from "../src/Components/Admin/AdminCencom/EditAdmin";

import PendingMeetings from "../src/Components/Admin/AdminMeeting/PendingMeetings";
// import AdminMeetingmain from "../src/Components/Admin/AdminMeeting/AdminMeetingmain";
import ApprovedMeetings from "../src/Components/Admin/AdminMeeting/ApprovedMeetings";
import RecurringMeeting from "../src/Components/Admin/AdminMeeting/RecurringMeeting";

import CreateCategory from "../src/Components/Admin/BusinessCategories/createCategory";
import CreateSubCategory from "../src/Components/Admin/BusinessCategories/CreateSubCategory";
import EditCategory from "./Components/Admin/BusinessCategories/EditCategory";
import EditSubcategory from "./Components/Admin/BusinessCategories/EditSubcategory";
import BusinessCategoriesList from "../src/Components/Admin/BusinessCategories/BusinessCategoriesList";

//  login part
import Login from "../src/Components/pages/Login";
import RegisterAs from "../src/Components/pages/RegisterAs";
import Register from "../src/Components/pages/Register";
import OTPViaEmail from "../src/Components/pages/OTPViaEmail";
import OTP from "../src/Components/pages/OTP";
import ResetPassword from "../src/Components/pages/ResetPassword";
import Pendingverification from "../src/Components/pages/Pendingverification";

//  Guest
import GuestStock from "../src/Components/pages/Guest/GuestStock";
import GuestVerifyOtp from "../src/Components/pages/Guest/GuestVerifyOtp";
import GuestDashboard from "./Components/pages/Guest/GuestPages/GuestDashboard";

import { requestToken, onMessageListener } from './firebase.js';
import PushMessagesAlert from './Components/PushMessagesAlert';

//  Api
import { fetchUserDetail } from "./services/user.services";
import { fetchUserAllChats } from "./services/chat.services";

//  Redux
import { useDispatch, useSelector } from "react-redux";

const FirebaseTokenContext = createContext();

export const useFirebaseToken = () => {
  return useContext(FirebaseTokenContext);
};

export const FirebaseTokenProvider = ({ children }) => {
  const [firebaseToken, setFirebaseToken] = useState(null);
  requestToken(setFirebaseToken)

  return (
    <FirebaseTokenContext.Provider value={firebaseToken}>
      {children}
    </FirebaseTokenContext.Provider>
  );
};

export const RoleBasedRoutes = ({ RoleID, user }) => {
  const firebaseToken = useFirebaseToken();

  if (RoleID === 1 && user) {
    return (
      <Routes>
        {(RoleID === 1 || user) && (
          <Route index path="/*" element={<Navigate to="/admin/dashboard" />} />
        )}
        <Route path="/admin" element={<Admin />}>
          <Route index path="dashboard" element={<AdminhomeMain />} />
          <Route path="leadership-team" element={<LeadershipTeam />} />
          <Route path="member" element={<MemberAdminmain />} />
          <Route path="privacy" element={<AdminPrivacy />} />
          <Route path="complains" element={<Complaints />} />
          <Route path="cencom" element={<Cencom />} />
          <Route path="leagues" element={<AdminLeagueList />} />
          <Route path="create-recurring-league" element={<CreateRecurringLeague />} />
          <Route path="edit-recurring-league/:id?" element={<EditRecurringLeague />} />
          <Route path="testimonials" element={<UnApprovedTestimonials />} />
          <Route path="leaderboard" element={<LeaderBoard />} />

          <Route path="create-business-category" element={<CreateCategory />} />
          <Route path="business-categories" element={<BusinessCategoriesList />} />
          <Route path="edit-business-category" element={<EditCategory />} />
          <Route path="create-business-subcategory" element={<CreateSubCategory />} />
          <Route path="edit-business-subcategory" element={<EditSubcategory />} />

          <Route path="create-admin" element={<CreateAdmin />} />
          <Route path="edit-admin" element={<EditAdmin />} />

          {/* <Route path="meetings" element={<AdminMeetingmain />} /> */}
          <Route path="meetings" element={<ApprovedMeetings />} />
          {/* <Route path="approved-meeting" element={<ApprovedMeetings />} /> */}
          <Route path="pending-meeting" element={<PendingMeetings />} />
          <Route path="events" element={<AdminEventmain />} />
          <Route path="pending-event" element={<PendingEvents />} />
          <Route path="approved-event" element={<ApprovedEvents />} />
        </Route>
      </Routes>
    );
  }

  else if (RoleID === 2 && user) {

    return (
      <Routes>
        {(RoleID === 2 || user) && (
          <Route index path="/*" element={<Navigate to="/dashboard" />} />
        )}
        <Route path="/*" element={<UserStructure currentToken={firebaseToken} />}>
          <Route index path="dashboard" element={<Homepage />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="community" element={<OurCommunity />} />
          <Route path="vision" element={<OurVision />} />
          <Route path="members" element={<Membercomponent />} />
          <Route path="league" element={<Leaguehomea />} />
          <Route path="event" element={<Eventstock />} />
          <Route path="edit-event/:id?" element={<EditEvent />} />
          <Route path="meetings" element={<Meetingstock />} />
          <Route path="chats" element={<Userchat />} />
          <Route path="privacy" element={<Privacystatic />} />
          <Route path="referal" element={<Referallink />} />
          <Route path="leaderboard" element={<Leaderbordhome />} />
          <Route path="formuploads" element={<Formupload />} />
          <Route path="leagueleads" element={<Leagueleads />} />
          <Route path="leagueroast" element={<Leagueroast />} />
          <Route path="leagueslips" element={<Slipshome />} />
          <Route path="event-detail/:id?" element={<Eventdetails />} />
          <Route path="meeting-detail/:id?" element={<MeetingDetail />} />
          <Route path="create-event" element={<Neweventform />} />
          <Route path="approval-pending" element={<Approvalpendingform />} />
          {/* <Route path="create-meeting" element={<CreateMeeting />} /> */}
          <Route path="create-meeting" element={<RecurringMeeting />} />
          <Route path="edit-meeting/:id?" element={<EditMeeting />} />
          <Route path="description/:id?" element={<Memberdecription />} />
          <Route path="edit-company/:id?" element={<EditCompany />} />
          <Route path="add-testimonials/:id?" element={<AddTestimonials />} />
          <Route path="complain" element={<Complain />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    );
  }

  else if (RoleID === 3 && user) {

    return (
      <Routes>
        {(RoleID === 3 || user) && (
          <Route index path="/*" element={<Navigate to="/guest/dashboard" />} />
        )}
        <Route path="/guest/dashboard" element={<GuestDashboard firebaseToken={firebaseToken} />} />
      </Routes>
    );
  }

  else if (user === null) {

    return (
      <Routes>
        {(user) && (
          <Route index path="/" element={<Navigate to="/" />} />
        )}
        <Route path="/" element={<Auth />}>
          <Route index element={<Login currentToken={firebaseToken} />} />
          <Route path="register-as" element={<RegisterAs />} />
          <Route path="s/:code?" element={<RedirectPage />} />
          <Route path="registration/:code?" element={<Register currentToken={firebaseToken} />} />
          <Route path="otp-via-email" element={<OTPViaEmail />} />
          <Route path="otp" element={<OTP />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="pending-verification" element={<Pendingverification />} />

          {/* Guest Routes */}
          <Route path="a/:code?" element={<GuestStock />} />
          <Route path="guest-verify-otp" element={<GuestVerifyOtp />} />
        </Route>
      </Routes>
    );
  }
};

export function AllRoutes() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState(null);
  const [error, setError] = useState(false);

  const getUserDetail = useCallback(() => {
    dispatch(fetchUserDetail()).unwrap();
  }, [dispatch]);

  const getUserChatDetail = useCallback(() => {
    dispatch(fetchUserAllChats()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetail();
      getUserChatDetail();
    }
  }, [isLoggedIn, getUserDetail, getUserChatDetail]);

  onMessageListener().then(payload => {
    setError(true)
    setVariant('success')
    setMessage(payload.notification.body)
    setTitle(payload.notification.title)
    const jsonData = JSON.parse(payload.data.response);
    if (jsonData.notify_type === "chat_head") {
      getUserChatDetail();
    }
  }).catch(err => console.log('failed: ', err));

  useEffect(() => {
    const channel = new BroadcastChannel('background-messages');
    channel.addEventListener('message', (event) => {
      const jsonData = JSON.parse(event.data.data.response);
      if (jsonData.notify_type === "chat_head") {
        getUserChatDetail();
      }
    });
    return () => {
      channel.removeEventListener('message');
    };
  }, []);

  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const RoleID = user ? user.role?.id : "";

  return (
    <>
      {error && (
        <PushMessagesAlert message={message} variant={variant} setError={setError} title={title} />
      )}
      <BrowserRouter>
        <RoleBasedRoutes RoleID={RoleID} user={user} />
      </BrowserRouter>
    </>
  );
}