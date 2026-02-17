import React, { useState, useEffect, useCallback } from "react";

//  APi
import GeneralService from "../../../services/general.services";
import { GetMemebersByLeagID, GetLeagueMembers } from "../../../services/companies.services";
import { CreateLead } from "../../../services/lead.services";

//  Formik
import { useFormik } from "formik";
import * as yup from "yup";

//  Loader
import Spinner from "../../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../../MessageAlerts";

import { Autocomplete, TextField } from '@mui/material';

function Leagueleadslip() {
  const [leagues, setleagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leagueID, setLeagueID] = useState("");
  const [campanyID, setCampanyID] = useState("");
  const [leagueMembers, setLeagueMembers] = useState([]);

  const [insideButtonSelected, setInsideButtonSelected] = useState(true);
  const [outsideButtonSelected, setOutsideButtonSelected] = useState(false);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const handleInsideButtonClick = () => {
    setInsideButtonSelected(true);
    setOutsideButtonSelected(false);
    formik.setFieldValue("lead_type", "inside");
  };

  const handleOutsideButtonClick = () => {
    setInsideButtonSelected(false);
    setOutsideButtonSelected(true);
    formik.setFieldValue("lead_type", "outside");
  };

  const getLeagues = useCallback(() => {
    (async () => {
      const response = await GeneralService.getAllLeagues();
      setleagues(response.data.data)
    })();
  }, []);

  const getAllLeagueMembers = useCallback(() => {
    (async () => {
      const response = await GetLeagueMembers();
      setLeagueMembers(response.data)
    })();
  }, []);

  useEffect(() => {
    if (insideButtonSelected) {
      getAllLeagueMembers();
      setLeagueID("")
      formik.setFieldValue("given_to", "");
    }
    if (outsideButtonSelected) {
      formik.setFieldValue("given_to", "");
      getLeagues()
      setLeagueMembers([])
    }
  }, [getAllLeagueMembers, getLeagues, insideButtonSelected, outsideButtonSelected]);

  useEffect(() => {
    if (leagueID) {
      (async () => {
        const response = await GetMemebersByLeagID(leagueID);
        setLeagueMembers(response.data)
      })();
    }
  }, [leagueID]);

  const formik = useFormik({
    initialValues: {
      category: "",
      email: "",
      given_to: "",
      lead_type: "",
      lead_status: "",
      lead_info: "",
      telephone: "",
      address: "",
    },
    validationSchema: yup.object({
      category: yup.string(),
      email: yup.string().email().max(40).required("This field is required"),
      given_to: yup.string().required("This field is required"),
      lead_type: yup.string(),
      lead_status: yup.array(),
      lead_info: yup.string().required("This field is required"),
      telephone: yup.string().required('This field is required').min(9).max(9),
      address: yup.string().required("This field is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      values.category = 'lead';
      if (values.lead_type === "") {
        values.lead_type = "inside";
      }
      values.lead_status = JSON.stringify(values.lead_status);
      values.telephone = "+971" + values.telephone;

      (async () => {
        setLoading(true)
        try {
          const response = await CreateLead(values);
          if (response.status) {
            resetForm();
            setError(true)
            setVariant('success')
            setMessage([response.message])
            setLoading(false)
          }
        } catch (error) {
          const originalString = values.telephone;
          values.telephone = originalString.slice(4);
          setError(true)
          setVariant('error')
          const err = error.response.data.errors;
          setMessage(err)
          setLoading(false)
        }
      })();
    },
  });

  const handleCheckboxChange = (option) => {
    const { lead_status } = formik.values;
    const updatedOptions = lead_status.includes(option)
      ? lead_status.filter((item) => item !== option)
      : [...lead_status, option];

    formik.setFieldValue('lead_status', updatedOptions);
  };

  return (
    <>
      <div className="xs:mt-8 w-[50%] xs:w-[90%] mx-auto lg:mt-[2rem]">
        <div className="flex flex-row justify-center gap-[4px]">
          <input
            type="button"
            value="Inside"
            className={`p-2 m-2 rounded-md w-[9rem] cursor-pointer ${insideButtonSelected
              ? "bg-green-700 text-white"
              : "bg-white border border-green-700 text-black"
              }`}
            onClick={handleInsideButtonClick}
          />
          <input
            type="button"
            value="Outside"
            className={`w-[9rem] p-2 m-2 rounded-md cursor-pointer ${outsideButtonSelected
              ? "bg-green-700 text-white"
              : "bg-white border border-green-700 text-black"
              }`}
            onClick={handleOutsideButtonClick}
          />
        </div>

        {outsideButtonSelected && (
          <div className="my-5">
            <Autocomplete
              options={leagues}
              disableClearable
              getOptionLabel={(option) => option.name}
              onChange={(e, data) => {
                setLeagueID(data.id)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="League"
                />
              )}
            />
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>

          <div className="my-5">
            <Autocomplete
              options={leagueMembers}
              disableClearable
              getOptionLabel={(option) => option.name}
              onChange={(e, data) => {
                formik.setFieldValue("given_to", data.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Given To:"
                />
              )}
            />
            {formik.touched.given_to && formik.errors.given_to ? (
              <div className='text-red-500 text-xs text-left'>{formik.errors.given_to}</div>
            ) : null}
          </div>

          <div className="my-8">
            <label className="block text-[#005125] font-bold mb-5 mont-serif">
              League Lead Status
            </label>
            <div className="grid grid-cols-2 gap-4 xs:gap-0 gap-y-0">
              <div className="xs:col-start-1 xs:col-end-7">
                <label className="inline-flex text-sm items-center mont-serif mont-serif gap-5">
                  <input
                    type="checkbox"
                    className="custom-checkbox-styling"
                    checked={formik.values.lead_status.includes('Via Call')}
                    onChange={() => handleCheckboxChange('Via Call')}
                  />
                  Via Call
                </label>
              </div>
              <div className="xs:col-start-1 xs:col-end-7">
                <label className="inline-flex text-sm items-center mont-serif mont-serif gap-5">
                  <input
                    type="checkbox"
                    className="custom-checkbox-styling"
                    checked={formik.values.lead_status.includes('Business Card Shared')}
                    onChange={() => handleCheckboxChange('Business Card Shared')}
                  />
                  Business Card Shared
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[#005125] font-bold mb-2 mont-serif">
              Lead Information
            </label>
            <textarea
              rows="4"
              className="lg:text-[14px] block p-2 mt-3 bg-white border border-green-800 rounded-md focus:border-blue-500 focus:outline-none focus:ring w-full"
              name="lead_info"
              value={formik.values.lead_info}
              onChange={e => {
                formik.setFieldValue("lead_info", e.target.value);
              }}
            />
            {formik.touched.lead_info && formik.errors.lead_info ? (
              <div className='text-red-500 text-xs text-left'>{formik.errors.lead_info}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-[#005125] font-bold mb-2 mont-serif">
              Telephone
            </label>
            <div className="flex">
              <span className="border-b border-[#007033] focus:border-indigo-500 outline-none py-2 pr-2">+971</span>
              <input
                className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="tel"
                name="telephone"
                value={formik.values.telephone}
                onChange={e => {
                  const numericValue = e.target.value.replace(/\D/g, '');
                  formik.setFieldValue("telephone", numericValue);
                }}
              />
            </div>
            {formik.touched.telephone && formik.errors.telephone ? (
              <div className='text-red-500 text-xs text-left'>{formik.errors.telephone}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-[#005125] font-bold mb-2 mont-serif">
              Email
            </label>
            <input
              className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={e => {
                formik.setFieldValue("email", e.target.value);
              }}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-red-500 text-xs text-left'>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-[#005125] font-bold mb-2 mont-serif">
              Address
            </label>
            <input
              className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="text"
              name="address"
              value={formik.values.address}
              onChange={e => {
                formik.setFieldValue("address", e.target.value);
              }}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className='text-red-500 text-xs text-left'>{formik.errors.address}</div>
            ) : null}
          </div>

          <button type="submit" className="btn-create float-right mont-serif text-black lg:mt-[25px] lg:mb-[4rem] xs:mr-[30px]">
            {loading ? <Spinner /> : 'Confirm'}
          </button>

        </form>
      </div>
      {error && message?.length > 0 && message?.map((msg) => (
        <MessageAlerts message={msg} variant={variant} setError={setError} />
      ))
      }
    </>
  );
}

export default Leagueleadslip;
