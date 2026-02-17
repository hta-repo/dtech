import React, { useState, useEffect } from "react";

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

// APi
import { CreateRecurringMeeting, GetAllRecurringMeeting, UpdateRecurringMeeting, DeleteRecurringMeeting } from "../../../services/cencom/cencomGeneral.services";
//  Loader
import Spinner from "../../Spinner/Spinner";

//  Redux
import { useSelector } from "react-redux";

//  Alerts
import MessageAlerts from "../MessageAlerts";

// Icon
import { BiEdit } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";

// Swal
import Swal from "sweetalert2";

const WeekDropdown = [
  { value: 'Sunday', name: "Sunday" },
  { value: 'Monday', name: "Monday" },
  { value: 'Tuesday', name: "Tuesday" },
  { value: 'Wednesday', name: "Wednesday" },
  { value: 'Thursday', name: "Thursday" },
  { value: 'Friday', name: "Friday" },
  { value: 'Saturday', name: "Saturday" },
];

export default function RecurringMeeting() {
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [showData, setShowData] = useState(false);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loggedUserInfo?.league_id) {
      setShowData(true)
      getMeeting(loggedUserInfo?.league_id)
    }
  }, [loggedUserInfo?.league_id]);

  const getMeeting = (id) => {
    (async () => {
      setLoadingData(true)
      const response = await GetAllRecurringMeeting(id);
      if (response.status) {
        setData(response.data)
        setLoadingData(false)
      }
    })();
  };

  useEffect(() => {
    formik.setFieldValue("name", detail ? detail.name : "");
    formik.setFieldValue("description", detail ? detail.description : "");
    formik.setFieldValue("day_of_week", detail ? detail.day_of_week : "");
    formik.setFieldValue("start_time", detail ? detail.start_time : "");
    formik.setFieldValue("end_time", detail ? detail.end_time : "");
  }, [detail]);

  const formik = useFormik({
    initialValues: {
      id: "",
      league_id: "",
      name: "",
      description: "",
      day_of_week: "",
      start_time: "",
      end_time: "",
    },
    validationSchema: yup.object({
      id: yup.string(),
      league_id: yup.string(),
      name: yup.string().required("This field is required"),
      description: yup.string().required("This field is required"),
      day_of_week: yup.string().required("This field is required"),
      start_time: yup.string().required('This field is required'),
      end_time: yup.string().required('This field is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      values.league_id = loggedUserInfo?.league_id;

      (async () => {
        setLoading(true)
        try {
          let response;
          if (detail) {
            values.id = detail.id
            response = await UpdateRecurringMeeting(values);
          }
          else {
            delete values.id
            response = await CreateRecurringMeeting(values);
          }
          if (response.status) {
            setError(true)
            setVariant('success')
            setMessage([response.message])
            setLoading(false)
            resetForm()
            getMeeting(loggedUserInfo?.league_id)
          }
        } catch (error) {
          setError(true)
          setVariant('error')
          const err = error.response.data.errors;
          setMessage(err)
          setLoading(false)
        }
      })();
    },
  });

  const openAlert = (id) => {
    Swal.fire({
      icon: 'error',
      title: 'Are you sure you want to delete meeting?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const formData = new FormData();
        formData.append("id", id);
        try {
          const response = await DeleteRecurringMeeting(formData);
          if (response.status) {
            getMeeting(loggedUserInfo?.league_id)
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
      },
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: {
        confirmButton: "custom-confirm-button-class",
        cancelButton: "custom-cancel-button-class",
        title: "custom-title-class",
        content: "custom-content-class",
        popup: "custom-popup-class",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        return
      }
    });
  };

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center">
          {detail ? (
            <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]">
              Update Recurring Meeting
            </h1>
          ) : (
            <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]">
              Create Recurring Meeting
            </h1>
          )}
        </div>
        <div className='mb-8'>
          <div className="grid grid-cols-12 lg:pt-[2.5rem]">
            <div className="col-span-5 xs:col-span-2">
              <div className="lg:w-[85%] xs:w-[80%] mx-auto mb-4 xs:mt-8">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="name">
                      Meeting Title
                    </label>
                    <input
                      className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={e => {
                        formik.setFieldValue("name", e.target.value);
                      }}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.name}</div>
                    ) : null}
                  </div>
                  <div className="mb-4 lg:mt-[2rem]">
                    <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md"
                      rows="8"
                      name="description"
                      value={formik.values.description}
                      onChange={e => {
                        formik.setFieldValue("description", e.target.value);
                      }}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.description}</div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#005125] font-bold mb-2 mont-serif" htmlFor="day_of_week">
                      Monthly Date
                    </label>
                    <select
                      name="league_id"
                      className="mont-serif appearance-none border border-[#007033] focus:border-[#007033] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md"
                      value={formik.values.day_of_week}
                      onBlur={formik.handleBlur}
                      onChange={e => {
                        formik.setFieldValue("day_of_week", e.target.value);
                      }}
                    >
                      <option value="">Select</option>
                      {WeekDropdown.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.day_of_week && formik.errors.day_of_week ? (
                      <div className='text-red-500 text-xs text-left mt-2'>{formik.errors.day_of_week}</div>
                    ) : null}
                  </div>
                  <div className="flex lg:flex-row xs:flex-column gap-4">
                    <div className="mb-4">
                      <label className="block text-[#005125] font-bold mb-2 mont-serif">Start Time</label>
                      <input
                        type="time"
                        id="start_time"
                        name="start_time"
                        value={formik.values.start_time}
                        onChange={e => {
                          const newStartTime = e.target.value;
                          const currentEndTime = formik.values.end_time;

                          if (newStartTime > currentEndTime) {
                            formik.setFieldValue("end_time", newStartTime);
                          }
                          formik.setFieldValue("start_time", newStartTime);
                        }}
                        className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[14vw]"
                      />
                      {formik.touched.start_time && formik.errors.start_time ? (
                        <div className="text-red-500 text-sm text-left relative mt-2">
                          {formik.errors.start_time}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#005125] font-bold mb-2 mont-serif">End Time</label>
                      <input
                        type="time"
                        id="end_time"
                        name="end_time"
                        value={formik.values.end_time}
                        onChange={e => {
                          const newEndTime = e.target.value;
                          const currentStartTime = formik.values.start_time;

                          if (newEndTime < currentStartTime) {
                            formik.setFieldValue("start_time", newEndTime);
                          }
                          formik.setFieldValue("end_time", newEndTime);
                        }}
                        className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md lg:w-[14vw]"
                      />
                      {formik.touched.end_time && formik.errors.end_time ? (
                        <div className="text-red-500 text-sm text-left relative mt-2">
                          {formik.errors.end_time}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center mt-[2rem] mb-4">
                    <button type="submit" className="btn-create mont-serif text-black">
                      {loading ? <Spinner /> : detail ? 'Update Meeting' : 'Create Meeting'}
                    </button>
                  </div>
                </form>
                <div className="flex flex-col justify-center items-center">
                  <button onClick={() => setDetail(null)} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black">
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {showData && (
              <div className="col-span-7 xs:col-span-12">
                {loadingData ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <div className="lg:py-5 text-center">
                      <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]">
                        Planned Meetings
                      </h1>
                    </div>
                    <table className="table text-left w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-3">Meeting Title</th>
                          <th className="px-4 py-3">Monthly Week</th>
                          <th className="px-4 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.length > 0 ? (
                          <>
                            {data?.map((item, index) => (
                              <tr key={index}>
                                <td className="border-t-2 border-gray-200 px-4 py-2 mont-serif text-[#005124]">
                                  {item.name}
                                </td>
                                <td className="border-t-2 border-gray-200 px-4 py-2 mont-serif text-[#005124]">
                                  {item.day_of_week}
                                </td>
                                <td className="border-t-2 border-gray-200 px-4 py-2 mont-serif text-[#005124]">
                                  <div className="flex flex-row items-center lg:gap-[10px]">
                                    <div className="flex flex-col items-center cursor-pointer"
                                      onClick={() => {
                                        setDetail(item)
                                      }}
                                    >
                                      <span className="text-green-700">
                                        <BiEdit style={{ fontSize: "20px" }} />
                                      </span>
                                    </div>
                                    <div className="flex flex-col item-center cursor-pointer"
                                      onClick={() => {
                                        openAlert(item.id)
                                      }}
                                    >
                                      <span className="text-[#FF0000]">
                                        <BsTrash3 style={{ fontSize: "17px" }} />
                                      </span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td className="px-4 py-2 mont-serif text-[#005124]">
                              No Meeting Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                )}

              </div>
            )}
          </div>
          {error && message?.length > 0 && message?.map((msg) => (
            <MessageAlerts message={msg} variant={variant} setError={setError} />
          ))
          }
        </div>
      </div>
    </main>
  )
}
