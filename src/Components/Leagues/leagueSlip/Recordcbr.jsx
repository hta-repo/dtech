
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

function Recordcbr() {
  const [leagues, setleagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leagueID, setLeagueID] = useState("");
  const [leagueMembers, setLeagueMembers] = useState([]);

  const [newButtonSelected, setNewButtonSelected] = useState(true);
  const [reapeatButtonSelected, setReapeatButtonSelected] = useState(false);


  const [insideButtonSelected, setInsideButtonSelected] = useState(true);
  const [outsideButtonSelected, setOutsideButtonSelected] = useState(false);
  // const [tier3ButtonSelected, setTier3ButtonSelected] = useState(false);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const handleNewButtonClick = () => {
    setNewButtonSelected(true);
    setReapeatButtonSelected(false);
    formik.setFieldValue("business_type", "new");
  };

  const handleReapeatButtonClick = () => {
    setNewButtonSelected(false);
    setReapeatButtonSelected(true);
    formik.setFieldValue("business_type", "repeat");
  };

  const handleInsideButtonClick = () => {
    setInsideButtonSelected(true);
    setOutsideButtonSelected(false);
    // setTier3ButtonSelected(false);
    formik.setFieldValue("lead_type", "inside");
  };

  const handleOutsideButtonClick = () => {
    setInsideButtonSelected(false);
    // setTier3ButtonSelected(false);
    setOutsideButtonSelected(true);
    formik.setFieldValue("lead_type", "outside");
  };

  // const handletier3ButtonClick = () => {
  //   setInsideButtonSelected(false);
  //   setOutsideButtonSelected(false);
  //   setTier3ButtonSelected(true);
  //   formik.setFieldValue("lead_type", "tier3");
  // };

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
      given_to: "",
      lead_type: "",
      business_type: "",
      aed: "",
    },
    validationSchema: yup.object({
      category: yup.string(),
      given_to: yup.string().required("This field is required"),
      lead_type: yup.string(),
      business_type: yup.string(),
      aed: yup.number(),
    }),
    onSubmit: (values, { resetForm }) => {
      values.category = 'cbr';
      if (values.lead_type === "") {
        values.lead_type = "inside";
      }

      if (values.business_type === "") {
        values.business_type = "new";
      }

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
          setError(true)
          setVariant('error')
          const err = error.response.data.errors;
          setMessage(err)
          setLoading(false)
        }
      })();
    },
  });

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
              ? "bg-green-700 text-white "
              : "bg-white border border-green-700 text-black"
              }`}
            onClick={handleOutsideButtonClick}
          />
          {/* <input
            type="button"
            value="Tier3"
            className={`w-[9rem] p-2 m-2 rounded-md cursor-pointer ${tier3ButtonSelected
              ? "bg-green-700 text-white "
              : "bg-white border border-green-700 text-black"
              }`}
            onClick={handletier3ButtonClick}
          /> */}
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

          <div className="mb-4">
            <label className="block text-[#005125] font-bold mb-2 mont-serif">
              Business Type
            </label>
            <div className="flex flex-row justify-center gap-[4px]">
              <input
                type="button"
                value="New"
                className={`p-2 m-2 rounded-md w-[9rem] cursor-pointer ${newButtonSelected
                  ? "bg-green-700 text-white"
                  : "bg-white border border-green-700 text-black"
                  }`}
                onClick={handleNewButtonClick}
              />
              <input
                type="button"
                value="Repeat"
                className={`w-[9rem] p-2 m-2 rounded-md cursor-pointer ${reapeatButtonSelected
                  ? "bg-green-700 text-white "
                  : "bg-white border border-green-700 text-black"
                  }`}
                onClick={handleReapeatButtonClick}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[#005125] font-bold mb-2 mont-serif">
              AED
            </label>
            <input
              className="mont-serif appearance-none border-b border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="number"
              name="aed"
              value={formik.values.aed}
              onChange={e => {
                formik.setFieldValue("aed", e.target.value);
              }}
            />
            {formik.touched.aed && formik.errors.aed ? (
              <div className='text-red-500 text-xs text-left'>{formik.errors.aed}</div>
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

export default Recordcbr;

