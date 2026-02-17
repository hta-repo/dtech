
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { AiFillDelete } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

//  Redux
import { useSelector, useDispatch } from "react-redux";

// Default Image
import DefaultImage from "../../assets/defaultImage.png"

// Api
import {
  UploadProfilePic,
  DeleteProfilePic,
  fetchUserDetail,
  ChangePassword,
  logout,
  DeleteAccount,
  UpdateNotificationSettings,
  UserLeagueChange,
} from "../../services/user.services";
import GeneralService from "../../services/general.services";

//  Alerts
import MessageAlerts from "../MessageAlerts";

// Form
import { useFormik } from "formik";
import * as yup from "yup";

//  Loader
import Spinner from "../Spinner/Spinner";

// Swal
import Swal from "sweetalert2";
import { Autocomplete, TextField } from "@mui/material";

function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [leagueID, setLeagueID] = useState('');
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [loadNots, setLoadNots] = useState(false);
  const [leagueUpdate, setLeagueUpdate] = useState(false);
  const [leagueUpdateLoading, setLeagueUpdateLoading] = useState(false);

  //   Password Eye
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  //  Nitification Settings State
  const [emailNots, setEmailNots] = useState(false);
  const [pushNots, setPushNots] = useState(false);
  const [floatingIcon, setFloatingIcon] = useState(false);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loggedUserInfo?.notification_settings) {
      const data = JSON.parse(loggedUserInfo?.notification_settings);
      setEmailNots(data.email_nots === 1 ? true : false)
      setPushNots(data.push_nots === 1 ? true : false)
      setFloatingIcon(data.floating_icon === 1 ? true : false)
      setLeagueID(loggedUserInfo?.league_id)
    }
  }, [loggedUserInfo]);

  const getLeagues = useCallback(() => {
    (async () => {
      const response = await GeneralService.getAllLeagues();
      setLeagues(response.data.data)
    })();
  }, []);

  useEffect(() => {
    getLeagues();
  }, [getLeagues]);

  const getUserDetail = () => {
    dispatch(fetchUserDetail()).unwrap();
  };

  function PreviewImage(event) {
    sendData(event.target.files[0])

    let output = document.getElementById('uploadPreview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src)
    }
  };

  async function sendData(file) {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await UploadProfilePic(formData);
      if (response.status) {
        getUserDetail();
        setError(true)
        setVariant('success')
        setMessage([response.message])
      }
    } catch (error) {
      getUserDetail();
      setError(true)
      setVariant('error')
      const err = error.response.data.errors;
      setMessage(err)
    }
  }

  async function DelectePic() {
    try {
      const response = await DeleteProfilePic();
      if (response.status) {
        getUserDetail();
        setError(true)
        setVariant('success')
        setMessage([response.message])
      }
    } catch (error) {
      getUserDetail();
    }
  }

  const formik = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      old_password: yup.string().required("This field is required").min(8),
      password: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters long')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%^*?&.,])[A-Za-z\d@#$!%^*?&.,\s]+$/,
          'Password must contain at least one letter, one number, one special character, and can include spaces.'
        ),
      confirm_password: yup
        .string()
        .required("Confirm Password required")
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
    onSubmit: (values, { resetForm }) => {
      (async () => {
        setLoading(true)
        try {
          const response = await ChangePassword(values);
          if (response.status) {
            resetForm();
            setError(true)
            setVariant('success')
            setMessage([response.message])
            setLoading(false)
            openAlert()
            setLoggedOut(true)
          }
        } catch (error) {
          resetForm();
          setError(true)
          setVariant('error')
          const err = error.response.data.errors;
          setMessage(err)
          setLoading(false)
        }
      })();
    },
  });

  const openAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You Logged out after 5 Seconds!',
      showConfirmButton: false,
    })
  };

  useEffect(() => {
    if (loggedOut) {
      setTimeout(() => {
        (async () => {
          const response = await logout();
          if (response.data.status) {
            // Swal.close();
            localStorage.removeItem("loggedUser");
            document.location.reload(navigate("/"));
          }
        })();
      }, 5000);
    }
  }, [loggedOut, navigate]);

  const openConfirmationAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Are you sure you want to delete account?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await DeleteAccount();
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error.response.data.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: {
        confirmButton: "custom-confirm-button-class",
        cancelButton: "custom-cancel-button-class",
        title: "custom-title-class",
        content: "custom-content-class",
        popup: "custom-popup-class",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loggedUser");
        document.location.reload(navigate("/"));
      }
    });
  };

  useEffect(() => {
    if (loadNots) {

      const data = {
        notification_settings: JSON.stringify({
          email_nots: emailNots === true ? 1 : 0,
          push_nots: pushNots === true ? 1 : 0,
          floating_icon: floatingIcon === true ? 1 : 0
        })
      };

      (async () => {
        try {
          const response = await UpdateNotificationSettings(data);
          if (response.status) {
            getUserDetail()
            setError(true)
            setVariant('success')
            setMessage([response.message])
          }
        } catch (error) {
          setError(true)
          setVariant('error')
          const err = error.response.data.errors;
          setMessage(err)
        }
      })();
    }
  }, [loadNots, emailNots, pushNots, floatingIcon]);

  const ChangeLeagueRequest = () => {
    if (leagueUpdate && leagueUpdate) {
      (async () => {
        setLeagueUpdateLoading(true)
        const response = await UserLeagueChange(leagueID);
        if (response.status) {
          setError(true)
          setVariant('success')
          setMessage([response.message])
          setLeagueUpdateLoading(false)
          setLeagueUpdate(false)
        }
      })();
    }
  };

  return (
    <>
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div className="main-content flex flex-col flex-grow">
          <div className="flex">
            <div className="flex-auto">
              <div className="p-4 mx-8 mt-2 flex flex-row-reverse	justify-center items-center">
                <p className="text-2xl text-green-700 text-center underline">
                  Update Profile{" "}
                </p>
              </div>
            </div>
            <div className="flex-auto">
              <div
                onClick={openConfirmationAlert}
                className="p-4 mx-8 mt-2 flex flex-row-reverse justify-center items-center gap-2 cursor-pointer underline decoration-red-600"
              >
                <p className="text-center text-red-600 cursor-pointer">
                  Delete Account{" "}
                </p>
                <span className="text-red-600 cursor-pointer">
                  <AiFillDelete />
                </span>
              </div>
            </div>
          </div>
          <div className="setting-shadow lg:w-[60%] xs:w-[90%] mx-auto mb-4 mt-8">
            <div className="xs:ml-[1rem] p-5">
              <div className="flex flex-row gap-10">
                <div>
                  <span className="relative top-[75%] left-[75%] cursor-pointer" style={{
                    visibility: loggedUserInfo?.avatar ? "visible" : "hidden"
                  }}>
                    <BsTrashFill
                      onClick={DelectePic}
                      size={22}
                      style={{ cursor: 'pointer', color: "#DC2626" }}
                    />
                  </span>
                  <img id="uploadPreview" src={loggedUserInfo?.avatar ? process.env.REACT_APP_API_IMAGE_URL + loggedUserInfo?.avatar : DefaultImage} style={{ width: "130px", height: "130px", borderRadius: "50%", marginTop: "-20px" }} alt="avatarImage" />
                </div>
                <div className="mt-[4rem]">
                  <label
                    htmlFor="uploadImage"
                    className="btn-create mont-serif text-black"
                    style={{
                      padding: "10px 30px",
                      cursor: "pointer",
                    }}
                  >
                    Upload
                  </label>
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    id="uploadImage"
                    onChange={(event) => {
                      PreviewImage(event)
                    }}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="ml-[20px] mt-[40px]">
                <div className="mb-4">
                  <label
                    htmlFor="checkbox1"
                    className="inline-flex items-center mont-serif mont-serif gap-10"
                  >
                    <input
                      type="checkbox"
                      id="checkbox1"
                      checked={emailNots}
                      onChange={(e) => {
                        setLoadNots(true)
                        setEmailNots(e.target.checked)
                      }}
                      className="mr-2 text-[#000000] custom-checkbox-styling"
                    />
                    Receive notifications
                  </label>
                </div>
                {/*  */}
                <div className="mb-4">
                  <label
                    htmlFor="checkbox1"
                    className="inline-flex items-center mont-serif mont-serif gap-10"
                  >
                    <input
                      type="checkbox"
                      id="checkbox2"
                      checked={pushNots}
                      onChange={(e) => {
                        setLoadNots(true)
                        setPushNots(e.target.checked)
                      }}
                      className="mr-2 text-[#000000] custom-checkbox-styling"
                    />
                    Receive Push notifications
                  </label>
                </div>
                {/*  */}
                <div className="mb-4">
                  <label
                    htmlFor="checkbox1"
                    className="inline-flex items-center mont-serif gap-10"
                  >
                    <input
                      type="checkbox"
                      id="checkbox3"
                      checked={floatingIcon}
                      onChange={(e) => {
                        setLoadNots(true)
                        setFloatingIcon(e.target.checked)
                      }}
                      className="mr-2 text-[#000000] custom-checkbox-styling"
                    />
                    Show floating icon
                  </label>
                </div>
              </div>
              <div className="ml-[20px] mt-[30px]">
                <div style={{ display: "flex" }}>
                  <Autocomplete
                    // size="small"
                    options={leagues}
                    disableClearable
                    sx={{ width: "20vw" }}
                    getOptionLabel={(option) => option.name}
                    value={leagues.find((option) => option.id === leagueID) || null}
                    onChange={(e, data) => {
                      setLeagueUpdate(true)
                      setLeagueID(data.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="League"
                      />
                    )}
                  />
                  <button
                    className="mont-serif text-black"
                    style={{
                      background: "linear-gradient(271.08deg, #009845 0%, #ffffff 131.93%)",
                      borderRadius: "9px",
                      padding: "10px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                    onClick={() => ChangeLeagueRequest()}
                  >
                    {leagueUpdateLoading ? <Spinner /> : 'Update League'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="setting-shadow lg:w-[60%] xs:w-[90%] mx-auto my-4 mb-[100px]">
            <div className="xs:ml-[1rem] p-5">
              <h3 className="text-lg text-start text-green-700 mont-serif my-2">
                Change Password
              </h3>
              <form onSubmit={formik.handleSubmit}>
                <div className="xs:w-[90%] lg:w-[65%] mx-auto my-3">
                  <label className="xs:relative xs:top-4 block text-start text-green-700 font-bold mb-1 mont-serif relative lg:top-[19px] text-[13px]">
                    Old Password
                  </label>
                  <div className="relative">
                    <input
                      className="xs:relative lg:text-[14px] border-b border-gray-500 focus:border-blue-500 outline-none py-2 w-full mt-5 mx-auto"
                      type={oldPasswordVisible ? "text" : "password"}
                      name="old_password"
                      value={formik.values.old_password}
                      onChange={e => {
                        formik.setFieldValue("old_password", e.target.value);
                      }}
                    />
                    <span
                      className="absolute top-5 right-2 cursor-pointer mt-3"
                      onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                    >
                      {oldPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {formik.touched.old_password && formik.errors.old_password ? (
                    <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.old_password}</div>
                  ) : null}
                </div>
                <div className="xs:w-[90%] lg:w-[65%] mx-auto my-3">
                  <label className="xs:relative xs:top-4 block text-start text-green-700 font-bold mb-1 mont-serif relative lg:top-[19px] text-[13px] ">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      className="xs:relative lg:text-[14px] border-b border-gray-500 focus:border-blue-500 outline-none py-2 w-full mt-5 mx-auto"
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={e => {
                        formik.setFieldValue("password", e.target.value);
                      }}
                    />
                    <span
                      className="absolute top-5 right-2 cursor-pointer mt-3"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="xs:w-[90%] lg:w-[65%] mx-auto my-3">
                  <label className="xs:relative xs:top-4 block text-start text-green-700 font-bold mb-1 mont-serif relative lg:top-[19px] text-[13px] ">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      className="xs:relative lg:text-[14px] border-b border-gray-500 focus:border-blue-500 outline-none py-2 w-full mt-5 mx-auto"
                      type={confirmPasswordVisible ? "text" : "password"}
                      name="confirm_password"
                      value={formik.values.confirm_password}
                      onChange={e => {
                        formik.setFieldValue("confirm_password", e.target.value);
                      }}
                    />
                    <span
                      className="absolute top-5 right-2 cursor-pointer mt-3"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {formik.touched.confirm_password && formik.errors.confirm_password ? (
                    <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.confirm_password}</div>
                  ) : null}
                  <button className="btn-create float-right mont-serif text-black lg:mt-[30px] lg:mb-[24px] xs:mr-[30px]">
                    {loading ? <Spinner /> : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      {error && message?.length > 0 && message?.map((msg) => (
        <MessageAlerts message={msg} variant={variant} setError={setError} />
      ))
      }
    </>
  );
}

export default Settings;
