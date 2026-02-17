import React, { useEffect, useState, useCallback } from "react";
import logo from "./logo.png";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../assets/welcomepage/logo-1.png";

import { useFormik } from "formik";
import * as yup from "yup";

//  Api
import authService from "../../services/auth.services";
import GeneralService from "../../services/general.services";

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Autocomplete, TextField, FormControl, InputLabel, InputAdornment, Input, IconButton } from '@mui/material';

export default function Register({ currentToken }) {
  const navigate = useNavigate();
  const { code } = useParams();
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [businessCat, setBusinessCat] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [leagues, setleagues] = useState([]);
  const [officeTypes, setOfficeTypes] = useState([]);
  const [licenseTypes, setLicenseTypes] = useState([]);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const routelogin = () => {
    navigate(`/`);
  };

  const getDestinations = useCallback(() => {
    (async () => {
      const response = await GeneralService.getAllDestinations();
      setDestinations(response.data.data)
    })();
  }, []);

  const getLeagues = useCallback(() => {
    (async () => {
      const response = await GeneralService.getAllLeagues();
      setleagues(response.data.data)
    })();
  }, []);

  const getOfficeTypes = useCallback(() => {
    (async () => {
      const response = await GeneralService.getAllOfficeTypes();
      setOfficeTypes(response.data.data)
    })();
  }, []);

  const getLicenseTypes = useCallback(() => {
    (async () => {
      const response = await GeneralService.getAllLicenseTypes();
      setLicenseTypes(response.data.data)
    })();
  }, []);

  const getBusinessCategories = useCallback(() => {
    (async () => {
      const status = "?status=1";
      const response = await GeneralService.getAllBusinessCategories({ status });
      setBusinessCat(response.data.data)
    })();
  }, []);

  useEffect(() => {
    getDestinations();
    getLeagues();
    getOfficeTypes();
    getLicenseTypes();
    getBusinessCategories();
  }, [getDestinations, getLeagues, getOfficeTypes, getLicenseTypes, getBusinessCategories])

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
      lcn_nmbr: "",
      lcn_type: "",
      designation: "",
      league_id: "",
      ofc_type: "",
      cmp_name: "",
      cmp_founder: "",
      website: "",
      prod_detials: "",
      prod_page: "",
      ref_code: "",
      fcm_token: "",
      business_cat: "",
      business_sub_cat: "",
    },
    validationSchema: yup.object({
      name: yup.string().required('This field is required').min(3).max(40).matches(/^[^\s]*(?:\s[^\s]+)*$/, 'Name should not contain double spaces'),
      email: yup.string().email().required('This field is required').max(40),
      phone: yup.string().required('This field is required').min(9).max(9),
      password: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^*?&.,])[a-zA-Z\d@#$!%^*?&.,\s]+$/,
          'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and can include spaces.'
        ),
      confirm_password: yup
        .string()
        .required("Confirm Password required")
        .oneOf([yup.ref("password")], "Password does not match"),
      lcn_nmbr: yup.string().required("This field is required"),
      lcn_type: yup.string().required("This field is required"),
      designation: yup.string().required("This field is required"),
      league_id: yup.string().required("This field is required"),
      ofc_type: yup.string().required("This field is required"),
      ref_code: yup.string(),
      fcm_token: yup.string(),
      business_cat: yup.string().required("This field is required"),
      business_sub_cat: yup.string().required("This field is required"),
      cmp_founder: yup
        .string()
        .required('This field is required')
        .matches(/^[^\s]*(?:\s[^\s]+)*$/, 'Name should not contain double spaces'),
      website: yup
        .string()
        .required('This field is required')
        .matches(/^(HTTPS|HTTP|https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Enter a valid url"),
      cmp_name: yup
        .string()
        .required('This field is required')
        .matches(/^[^\s]*(?:\s[^\s]+)*$/, 'Company Name should not contain double spaces'),
      prod_detials: yup
        .string()
        .required('This field is required')
        .matches(/^[^\s]*(?:\s[^\s]+)*$/, 'Product Details should not contain double spaces'),
      prod_page: yup
        .string()
        .required('This field is required')
        .matches(/^[^\s]*(?:\s[^\s]+)*$/, 'Product Details should not contain double spaces'),
    }),
    onSubmit: (values) => {

      if (!code) {
        delete values.ref_code
      }

      if (currentToken) {
        values.fcm_token = currentToken
      }
      else {
        delete values.fcm_token
      }

      if (searchMessage !== "") {
        return
      }
      values.phone = "+971" + values.phone;

      (async () => {
        const data = JSON.stringify(values)
        setLoading(true)
        try {
          const response = await authService.register(data);
          if (response.status) {
            setError(true)
            setVariant('success')
            setMessage([response.message])
            setTimeout(() => {
              navigate("/otp", { state: { email: values.email, action: "register" } })
            }, 300);
            setLoading(false)
          }
        } catch (error) {
          const originalString = values.phone;
          values.phone = originalString.slice(4);
          setError(true)
          setVariant('error')
          const err = error.response.data.errors;
          setMessage(err)
          setLoading(false)
        }
      })();
    },
  });

  useEffect(() => {
    if (code) {
      formik.setFieldValue("ref_code", code);
    }
  }, [code]);

  const SearchCmpName = useCallback((e) => {
    (async () => {
      let formData = new FormData();
      formData.append("name", e.target.value);
      formData.append("league_id", formik.values.league_id);
      try {
        const response = await GeneralService.CheckCmpName(formData);
        if (response.data.status) {
          setSearchMessage("")
        }
      } catch (error) {
        if (error.response.data.status === false)
          setSearchMessage(error.response.data.errors[0])
      }
    })();
  }, [formik.values.league_id]);

  const handleAutocompleteChange = (event, newValues) => {
    const limitedValues = newValues.slice(0, 3);
    const selectedOptionIds = limitedValues.map((option) => option.id).join(",");
    getSubCategories(selectedOptionIds);
    formik.setFieldValue("business_cat", selectedOptionIds);
  };

  const getSubCategories = (ids) => {
    (async () => {
      const formData = new FormData();
      formData.append("ids", ids);
      formData.append("status", 1);

      const response = await GeneralService.getAllBusinessSubCategories(formData);
      const result = response.data.data;
      flattencategories(result)
    })();
  };

  const handleAutocompleteSubCatChange = (event, newValues) => {
    const selectedOptionIds = newValues.map((option) => option.id).join(",");
    formik.setFieldValue("business_sub_cat", selectedOptionIds);
  };

  function flattencategories(data) {
    let flattenedData = [];
    if (data.length > 0) {
      data?.forEach((item) => {
        if (item?.subsubcategories?.length > 0) {
          item?.subsubcategories?.forEach((subItem) => {
            if (subItem?.subcategories?.length > 0) {
              subItem.subcategories?.forEach((subSubItem) => {
                flattenedData.push({ name: `${subItem.name} -> ${subSubItem.name}`, id: subSubItem.id })
              })
            } else {
              flattenedData.push({ name: `${subItem.name}`, id: subItem.id })
            }
          })
        }
      })
    }
    setSubcategories(flattenedData)
  }

  return (
    <>
      <section className="text-gray-600 body-font bg-11 bg-banner min-h-[100vh]">
        <div className="flex flex-row gap-[7rem] items-center lg:hidden">
          <img src={Logo} className="mt-4 ml-2" alt="" />
          <div className="flex flex-row gap-[5px]">
            <button
              onClick={routelogin}
              style={{ borderRadius: "5px", fontSize: "14px" }}
              className="xs:w-[5rem] mont-serif text-black bg-white border-0  focus:outline-none rounded text-lg"
            >
              Login
            </button>
            <button
              style={{ borderRadius: "6px", fontSize: "14px" }}
              className="xs:w-[5rem] mont-serif text-black bg-white border-0  focus:outline-none rounded text-lg"
            >
              Contact us
            </button>
          </div>
        </div>

        <div className="lg:container px-5 py-7 lg:mx-auto">
          <div className="flex flex-wrap text-center lg:gap-8">
            <div className="fade-in-left lg:w-[44%] md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-1  lg-w-[43%] bg-white">
              <h3 className="text-lg text-center text-green-700 mont-serif leading-tight mb-5">
                {code ? "Visitor Registration Form" : "Please fill the registration form to continue"}
              </h3>
              {/* setting up form  */}
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-6 gap-4 xs:mt-6">
                  <div className="col-start-2 col-span-4 xs:col-start-1 xs:col-end-7">
                    <FormControl className="w-full">
                      <TextField
                        autoComplete="off"
                        size="small"
                        id="standard-basic"
                        label="Full Name"
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={formik.values.name}
                        onChange={(e) => {
                          formik.setFieldValue("name", e.target.value);
                        }}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className='text-red-500 text-xs text-left'>{formik.errors.name}</div>
                      ) : null}
                    </FormControl>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 xs:gap-0 gap-y-0 mt-3">
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <FormControl className="w-full">
                      <InputLabel htmlFor="standard-adornment-amount">Mobile Number</InputLabel>
                      <Input
                        id="standard-adornment-amount"
                        autoComplete="off"
                        size="small"
                        sx={{ width: "100%" }}
                        value={formik.values.phone}
                        onInput={e => {
                          const numericValue = e.target.value.replace(/\D/g, '');
                          formik.setFieldValue("phone", numericValue);
                        }}
                        startAdornment={<InputAdornment position="start">+971</InputAdornment>}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className='text-red-500 text-xs text-left'>{formik.errors.phone}</div>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <FormControl className="w-full">
                      <TextField
                        type="email"
                        autoComplete="off"
                        size="small"
                        label="Email"
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={formik.values.email}
                        onChange={(e) => {
                          formik.setFieldValue("email", e.target.value);
                        }}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className='text-red-500 text-xs text-left'>{formik.errors.email}</div>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <FormControl className="w-full" variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                      <Input
                        id="standard-adornment-password"
                        sx={{ width: "100%" }}
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={e => {
                          formik.setFieldValue("password", e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className='text-red-500 text-xs text-left'>{formik.errors.password}</div>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <FormControl className="w-full" variant="standard">
                      <InputLabel htmlFor="standard-adornment-confirm-password">Confirm Password</InputLabel>
                      <Input
                        id="standard-adornment-confirm-password"
                        sx={{ width: "100%" }}
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        value={formik.values.confirm_password}
                        onChange={e => {
                          formik.setFieldValue("confirm_password", e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            >
                              {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {formik.touched.confirm_password && formik.errors.confirm_password ? (
                        <div className='text-red-500 text-xs text-left'>{formik.errors.confirm_password}</div>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <FormControl className="w-full">
                      <TextField
                        autoComplete="off"
                        size="small"
                        label="License No"
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={formik.values.lcn_nmbr}
                        onChange={(e) => {
                          formik.setFieldValue("lcn_nmbr", e.target.value);
                        }}
                      />
                      {formik.touched.lcn_nmbr && formik.errors.lcn_nmbr ? (
                        <div className='text-red-500 text-xs text-left'>{formik.errors.lcn_nmbr}</div>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <Autocomplete
                      size="small"
                      options={licenseTypes}
                      disableClearable
                      getOptionLabel={(option) => option.name}
                      onChange={(e, data) => {
                        formik.setFieldValue("lcn_type", data.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="License Type"
                        />
                      )}
                    />
                    {formik.touched.lcn_type && formik.errors.lcn_type ? (
                      <div className='text-red-500 text-xs text-left'>{formik.errors.lcn_type}</div>
                    ) : null}
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <Autocomplete
                      size="small"
                      options={officeTypes}
                      disableClearable
                      getOptionLabel={(option) => option.name}
                      onChange={(e, data) => {
                        formik.setFieldValue("ofc_type", data.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Office Type"
                        />
                      )}
                    />
                    {formik.touched.ofc_type && formik.errors.ofc_type ? (
                      <div className='text-red-500 text-xs text-left'>{formik.errors.ofc_type}</div>
                    ) : null}
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <Autocomplete
                      size="small"
                      options={destinations}
                      disableClearable
                      getOptionLabel={(option) => option.name}
                      onChange={(e, data) => {
                        formik.setFieldValue("designation", data.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Designation"
                        />
                      )}
                    />
                    {formik.touched.designation && formik.errors.designation ? (
                      <div className='text-red-500 text-xs text-left'>{formik.errors.designation}</div>
                    ) : null}
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <Autocomplete
                      size="small"
                      options={leagues}
                      disableClearable
                      getOptionLabel={(option) => option.name}
                      onChange={(e, data) => {
                        formik.setFieldValue("league_id", data.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="10x Club"
                          // label="Choose League"
                        />
                      )}
                    />
                    {formik.touched.league_id && formik.errors.league_id ? (
                      <div className='text-red-500 text-xs text-left'>{formik.errors.league_id}</div>
                    ) : null}
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <FormControl className="w-full">
                      <TextField
                        autoComplete="off"
                        size="small"
                        label="Company Name"
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={formik.values.cmp_name}
                        onChange={(e) => {
                          SearchCmpName(e)
                          formik.setFieldValue("cmp_name", e.target.value);
                        }}
                      />
                      {searchMessage && (
                        <div className='text-red-500 text-xs text-left'>{searchMessage}</div>
                      )}
                      {formik.touched.cmp_name && formik.errors.cmp_name ? (
                        <div className='text-red-500 text-xs text-left'>{formik.errors.cmp_name}</div>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <FormControl className="w-full">
                      <TextField
                        autoComplete="off"
                        size="small"
                        label="Company Owner / Founder"
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={formik.values.cmp_founder}
                        onChange={(e) => {
                          formik.setFieldValue("cmp_founder", e.target.value);
                        }}
                      />
                      {formik.touched.cmp_founder && formik.errors.cmp_founder ? (
                        <div className='text-red-500 text-xs text-left'>{formik.errors.cmp_founder}</div>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="xs:col-start-1 xs:col-end-7 mt-4">
                    <FormControl className="w-full">
                      <TextField
                        autoComplete="off"
                        size="small"
                        label="Website"
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={formik.values.website}
                        onChange={(e) => {
                          formik.setFieldValue("website", e.target.value);
                        }}
                      />
                      {formik.touched.website && formik.errors.website ? (
                        <div className='text-red-500 text-xs text-left'>{formik.errors.website}</div>
                      ) : null}
                    </FormControl>
                  </div>
                </div>

                {code && (
                  <div className="grid grid-cols-6 gap-4 xs:mt-6">
                    <div className="col-start-2 col-span-4 xs:col-start-1 xs:col-end-7">
                      <label className="block text-start text-green-700 font-bold mb-1 mont-serif relative lg:top-[19px] text-[13px]">
                        Referral Code
                      </label>
                      <input
                        className="xs:relative lg:text-[14px] border-b border-gray-500 focus:border-blue-500 outline-none lg:py-2 w-full lg:mt-2"
                        type="text"
                        name="ref_code"
                        disabled
                        value={formik.values.ref_code}
                        onChange={e => {
                          formik.setFieldValue("ref_code", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-6 gap-4 xs:gap-0 mt-4">
                  <div className="col-start-2 col-span-4 xs:col-start-1 xs:col-end-7">
                    <Autocomplete
                      multiple
                      size="small"
                      limitTags={2}
                      id="multiple-limit-tags"
                      options={businessCat}
                      getOptionLabel={(option) => option.name}
                      value={businessCat.filter((option) => {
                        return formik.values.business_cat.split(",").includes(option.id.toString());
                      })}
                      onChange={handleAutocompleteChange}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Business Category"
                        />
                      )}
                    />
                    {formik.touched.business_cat && formik.errors.business_cat ? (
                      <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.business_cat}</div>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-4 xs:gap-0 mt-4">
                  <div className="col-start-2 col-span-4 xs:col-start-1 xs:col-end-7">
                    <Autocomplete
                      multiple
                      size="small"
                      limitTags={2}
                      id="multiple-limit-tags2"
                      options={subcategories}
                      getOptionLabel={(option) => option.name}
                      value={subcategories.filter((option) => {
                        return formik.values.business_sub_cat.split(",").includes(option.id.toString());
                      })}
                      onChange={handleAutocompleteSubCatChange}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Business SubCategories"
                        />
                      )}
                    />
                    {formik.touched.business_sub_cat && formik.errors.business_sub_cat ? (
                      <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.business_sub_cat}</div>
                    ) : null}
                  </div>
                </div>

                <FormControl sx={{ width: "66%", margin: "0 auto" }}>
                  <label className="mb-3 mt-5 text-left">
                    Product Details & Offering
                  </label>
                  <TextField
                    multiline
                    rows={3}
                    variant="outlined"
                    value={formik.values.prod_detials}
                    onChange={e => {
                      formik.setFieldValue("prod_detials", e.target.value);
                    }}
                  />
                  {formik.touched.prod_detials && formik.errors.prod_detials ? (
                    <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.prod_detials}</div>
                  ) : null}
                </FormControl>

                <FormControl sx={{ width: "66%", margin: "0 auto" }}>
                  <label className="mb-3 mt-5 text-left">
                    Product Page
                  </label>
                  <TextField
                    multiline
                    rows={3}
                    variant="outlined"
                    value={formik.values.prod_page}
                    onChange={e => {
                      formik.setFieldValue("prod_page", e.target.value);
                    }}
                  />
                  {formik.touched.prod_page && formik.errors.prod_page ? (
                    <div className='text-red-500 text-xs text-left mt-1'>{formik.errors.prod_page}</div>
                  ) : null}
                </FormControl>

                <a href={process.env.REACT_APP_PDF_URL + "downloads/memberShip.pdf"} target="_blank"  rel="noreferrer" className="flex flex-col justify-center mt-5" style={{ alignItems: "center", textDecoration: "underline" }}>
                  Download Registration Form
                </a>

                <div
                  className=" lg:hidden forgot-password flex flex-col gap-3 justify-center lg:mt-[8.9rem]"
                  style={{ alignItems: "center" }}
                >
                  <button
                    type="submit"
                    style={{ borderRadius: "11px", fontSize: "14px" }}
                    className=" lg:w-[278px]  mt-3 mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg next"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>

            {/* flex-2  */}
            <div className=" sm:w-1/2 px-4 lg:p-[14px] lg:h-[93vh] xs:hidden lg:block">
              <div className="flex flex-row justify-end gap-2 items-center">
                {/* <button
                  style={{ borderRadius: "6px", fontSize: "14px" }}
                  className="mont-serif border relative top-1  text-white   lg:w-[9rem] lg:p-[2px] focus:outline-none text-lg drop-shadow-md shadow-lg"
                >
                  Contact us
                </button> */}
                {/*  */}
                <button
                  style={{ borderRadius: "6px", fontSize: "14px" }}
                  onClick={routelogin}
                  className="mt-2 mont-serif bg-green-800  text-white border-0  lg:w-[9rem] lg:p-[2px] rounded text-lg drop-shadow-md shadow-lg"
                >
                  Login
                </button>
              </div>

              <div
                className="flex flex-col justofy-center align-middle"
                style={{ alignItems: "center" }}
              >
                <h1 className="text-white text-lg font-semibold lg:mt-20   relative lg:bottom-11 mont-serif">
                  {" "}
                  10X Raabit
                </h1>

                <div className="container mx-auto">
                  <img
                    className="rounded-lg shadow-lg mx-auto object-cover lg:h-[15rem] w-[auto]"
                    src={logo}
                    alt=""
                  />
                </div>
              </div>

              <div
                className="forgot-password flex flex-col gap-3 justify-center lg:mt-[6rem]"
                style={{ alignItems: "center" }}
              >
                <button
                  onClick={formik.handleSubmit}
                  type="submit"
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                  className=" lg:w-[278px]  mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg next"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : 'Submit Application'}
                </button>
                <button
                  onClick={routelogin}
                  style={{ borderRadius: "11px", fontSize: "14px" }}
                  className=" lg:w-[278px]  mont-serif text-black bg-white text border-0 py-1 px-8 focus:outline-none rounded text-lg "
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </section >
      {error && message?.length > 0 && message?.map((msg) => (
        <MessageAlerts message={msg} variant={variant} setError={setError} />
      ))
      }
    </>
  );
}
