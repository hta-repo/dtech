import React, { useEffect, useState, useCallback } from "react";

// Icons
import { RxCross1 } from "react-icons/rx";

//  Image
import DefaultImage from "../../../assets/defaultImage.png"
import ApprovedAdmin from "../../../assets/ApprovedAdmin.png"
import ViewIcon from "../../../assets/viewIcon.png"
import SettingIcon from "../../../assets/settingIcon.png"
import AwardIcon from "../../../assets/awardIcon.png"
import EditIcon from "../../../assets/editIcon.png"

// Api
import GeneralService from "../../../services/general.services";
import { getAllCencomUser, ApproveUser, MakeLeagueAdmin, UpdateMember, UpdatePoints } from '../../../services/cencom/cencomUser.services';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

//  Alerts
import MessageAlerts from "../MessageAlerts";
import LeagueApprovalList from "./LeagueApprovalList";

//  Loader
import Spinner from "../../Spinner/Spinner";

// Swal
import Swal from "sweetalert2";

import { Tooltip } from 'react-tooltip'

//  Material ui
import { Box, CircularProgress, Backdrop, Autocomplete, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function MemberListing() {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [businessCat, setBusinessCat] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [approved, setApproved] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [awardPointModal, setAwardPointModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [selectedOptions, setSelectedOptions] = useState("");
  const [selectedOptionsErrorMessage, setSelectedOptionsErrorMessage] = useState("");
  const [numberErrorMessage, setNumberErrorMessage] = useState("");
  const [leagueID, setLeagueID] = useState(null);
  const [leagues, setLeagues] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loader, setLoader] = useState(false);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const getDetail = useCallback(() => {
    (async () => {
      setLoader(true)
      const lgAdmin = "";
      const paginate = "?page=" + currentPage + "&limit=" + pageSize;
      const league_ID = leagueID ? "&league_id=" + leagueID : "";

      const response = await getAllCencomUser({ lgAdmin, paginate, league_ID });
      if (response.status) {
        setTotalRecords(response.data.count);
        setData(response.data.data)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize, leagueID]);

  const getBusinessCategories = useCallback(() => {
    (async () => {
      const status = "?status=1";
      const response = await GeneralService.getAllBusinessCategories({ status });
      setBusinessCat(response.data.data)
    })();
  }, []);

  const getLeagues = useCallback(() => {
    (async () => {
      const response = await GeneralService.getAllLeagues();
      setLeagues(response.data.data)
    })();
  }, []);

  useEffect(() => {
    getDetail();
    getBusinessCategories();
    getLeagues();
  }, [getDetail, getBusinessCategories, getLeagues]);

  const leagueAdminFunc = (id, isActive) => {
    if (isActive === 0) {
      setError(true)
      setVariant('error')
      setMessage(['Member is not active. Cannot make inactive member as league admin.'])
    }
    else {
      openAlert(id)
    }
  };

  const openAlert = (id) => {
    Swal.fire({
      icon: 'info',
      title: 'This member will be promoted as "League Admin" <br> Are you sure to proceed ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const formData = new FormData();
        formData.append("user_id", id);
        try {
          const response = await MakeLeagueAdmin(formData);
          if (response.status) {
            getDetail();
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

  useEffect(() => {
    if (approved) {
      UserApproval(selectedIds)
    }
  }, [approved, selectedIds, getDetail]);

  const UserApproval = (id) => {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure you want to approve the user ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const formData = new FormData();
        for (let index = 0; index < id.length; index++) {
          formData.append("user_id[]", id[index]);
        }
        try {
          const response = await ApproveUser(formData);
          if (response.status) {
            getDetail();
            setSelectedIds([])
            setApproved(false)
            setError(true)
            setVariant('success')
            setMessage([response.message])
          }
        } catch (error) {
          setApproved(false)
          setSelectedIds([])
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

  const handlePageChange = (params) => {
    setCurrentPage(params + 1);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params);
  };

  const handleSelectionChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  useEffect(() => {
    const currentPageIndex = (currentPage - 1) * pageSize;
    setPageIndex(currentPageIndex);
  }, [currentPage, pageSize]);

  const columns = [
    {
      field: '',
      headerName: '',
      width: 20,
      renderCell: (params) => {
        if (params.row.is_active === 0) {
          return (
            <input
              type="checkbox" className="custom-checkbox-styling"
              checked={selectedIds.includes(params.row.id)}
              onChange={() => handleSelectionChange(params.row.id)}
            />
          );
        }
      },
    },
    { field: "index", headerName: "#", width: 30, },
    {
      field: "cover",
      headerName: "Image",
      width: 80,
      valueGetter: ({ row }) => row.avatar || "",
      renderCell: (params) => (
        <div className="avatr">
          <img
            src={params.value !== "" ? process.env.REACT_APP_API_IMAGE_URL + params.value : DefaultImage}
            className="w-[50px] rounded-full h-[50px]"
            alt="Avatar"
          />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "league?.name",
      headerName: "League",
      width: 150,
      valueGetter: (params) => {
        return params.row?.league?.name ?? "";
      },
    },
    {
      headerName: "Action",
      field: "action",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <div className="flex flex-row items-center lg:gap-[6px]">
            <Tooltip anchorSelect=".ViewIconDetail" place="top">
              <span style={{ fontSize: '12px' }}>View Detail</span>
            </Tooltip>
            <Tooltip anchorSelect=".adminApprovedIcon" place="top">
              <span style={{ fontSize: '12px' }}>Make member as league admin</span>
            </Tooltip>
            <Tooltip anchorSelect=".approval" place="top">
              <span style={{ fontSize: '12px' }}>Approve</span>
            </Tooltip>
            <Tooltip anchorSelect=".AwardIcon" place="top">
              <span style={{ fontSize: '12px' }}>Award Points</span>
            </Tooltip>
            <Tooltip anchorSelect=".EditIcon" place="top">
              <span style={{ fontSize: '12px' }}>Edit Business Category</span>
            </Tooltip>
            <div className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                setDetail(row)
                setModalOpen(true)
              }}
            >
              <img className="ViewIconDetail" src={ViewIcon} alt="viewIcon" style={{ width: "22px" }} />
            </div>
            {row.is_active === 0 && (
              <div className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  UserApproval([row.id])
                }}
              >
                <img className="approval" src={SettingIcon} alt="SettingIcon" style={{ width: "22px" }} />
              </div>
            )}
            {row.is_lg_admin === 0 && row.is_active === 1 && (
              <div className="flex flex-col item-center cursor-pointer"
                onClick={() => {
                  leagueAdminFunc(row.id, row.is_active)
                }}>
                <img className="adminApprovedIcon" src={ApprovedAdmin} alt="ApprovedAdmin" style={{ width: "22px" }} />
              </div>
            )}
            <div className="flex flex-col item-center cursor-pointer"
              onClick={() => {
                setDetail(row)
                setAwardPointModal(true)
              }}
            >
              <img className="AwardIcon" src={AwardIcon} alt="AwardIcon" style={{ width: "22px" }} />
            </div>
            <div className="flex flex-col item-center cursor-pointer"
              onClick={() => {
                setDetail(row)
                setSelectedOptions(row.company?.business_cat ? row.company?.business_cat : "")
                setEditModalOpen(true)
              }}
            >
              <img className="EditIcon" src={EditIcon} alt="EditIcon" style={{ width: "22px" }} />
            </div>
          </div>
        );
      },
    },
  ];

  const handleAutocompleteChange = (event, newValues) => {
    const selectedOptionIds = newValues.map((option) => option.id).join(",");
    setSelectedOptions(selectedOptionIds)
  };

  useEffect(() => {
    if (selectedOptions !== "") {
      setSelectedOptionsErrorMessage("")
    } else {
      setSelectedOptionsErrorMessage("Please Selected the options")
    }
  }, [selectedOptions]);

  const handleBussinesCategory = () => {
    if (selectedOptionsErrorMessage !== "") {
      return
    } else {
      (async () => {
        setLoading(true)
        try {
          let formData = new FormData();
          formData.append("user_id", detail.id);
          formData.append("business_cat", selectedOptions);
          const response = await UpdateMember(formData);
          if (response.status) {
            getDetail()
            setEditModalOpen(false)
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
    }
  };

  useEffect(() => {
    if (number !== "") {
      setNumberErrorMessage("")
    } else {
      setNumberErrorMessage("Please Enter the Digit")
    }
  }, [number]);

  const handleAwardPoints = () => {
    if (numberErrorMessage !== "") {
      return
    } else {
      (async () => {
        setLoading(true)
        try {
          let formData = new FormData();
          formData.append("user_id", detail.id);
          formData.append("points", number);

          const response = await UpdatePoints(formData);
          if (response.status) {
            getDetail()
            setAwardPointModal(false)
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
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#005125", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Tabs value="member-listing">
        <TabsHeader
          className="bg-transparent w-[60%] mx-auto mb-4"
          indicatorProps={{
            className: "bg-gray-900/10 shadow-none !text-gray-900",
          }}
        >
          <Tab key="member-listing" value="member-listing">
            Member Listing
          </Tab>
          <Tab key="leaguesApproval" value="leaguesApproval">
            Club Change Request
          </Tab>
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          <TabPanel key="member-listing" value="member-listing" className="p-0">
            <div className="p-4-rounded-md">
              <div className="flex items-center justify-between mb-6">
                <select
                  className="lg:text-[14px] border rounded-md border-[#007033] focus:border-indigo-500 outline-none p-2 mt-2 w-[40%]"
                  name="datePeriod"
                  value={leagueID}
                  onChange={e => {
                    setLeagueID(e.target.value);
                  }}
                >
                  <option value="">All Leagues</option>
                  {leagues?.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <button className={`mont-serif text-black ${selectedIds.length === 0 ? 'btn-create-disabled' : 'btn-create'}`} disabled={selectedIds.length === 0} onClick={() => setApproved(true)}>
                  Approve
                </button>
              </div>
            </div>
            <div className="mx-auto">
              <div className="my-6">
                <Box height="100vh">
                  <DataGrid
                    rows={data.map((row, index) => ({ ...row, index: pageIndex + index + 1 }))}
                    columns={columns}
                    pagination
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 50]}
                    rowCount={totalRecords}
                    paginationMode="server"
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                    getRowClassName={(params) => {
                      if (params.row.is_active === 0) {
                        return "bg-[#ACE1AF]";
                      }
                      return "";
                    }}
                  />
                </Box>
              </div>
            </div>
          </TabPanel>
          <TabPanel key="leaguesApproval" value="leaguesApproval" className="p-0">
            <LeagueApprovalList />
          </TabPanel>
        </TabsBody>
      </Tabs>
      {
        isModalOpen && (
          <div className=" fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
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
                    <img id="uploadPreview" src={detail?.avatar ? process.env.REACT_APP_API_IMAGE_URL + detail?.avatar : DefaultImage} style={{ width: "130px", height: "130px", borderRadius: "50%", }} alt="avatarImage" />
                  </div>

                  <div className=" mont-serif text-2xl text-[#005125] font-semibold mt-3">
                    {detail?.name}
                  </div>
                  <hr className="border-b border-[#007033] w-[20%]" />
                  <div className="w-[70%] mx-auto my-[2rem]">
                    <div className="mont-serif text-lg text-[#005125] text-left font-semibold">
                      Contact
                    </div>
                    <div className="mb-2 mt-4">
                      <span className="text-sm text-black mont-serif font-bold">Phone number:   </span>
                      <span className="text-black">
                        {detail?.phone}
                      </span>
                    </div>
                    <div className="my-1">
                      <span className="text-sm text-black mont-serif font-bold">Email:   </span>
                      <span className="text-black">
                        {detail?.email}
                      </span>
                    </div>

                    <div className=" mont-serif text-lg text-[#005125] text-left font-semibold mt-3">
                      Company
                    </div>
                    <div className="mb-2 mt-4">
                      <span className="text-sm text-black mont-serif font-bold">Name:   </span>
                      <span className="text-black">
                        {detail.company?.name}
                      </span>
                    </div>
                    <div className="my-1">
                      <span className="text-sm text-black mont-serif font-bold">Designation:   </span>
                      <span className="text-black">
                        {detail.designation?.name}
                      </span>
                    </div>
                    <div className=" mont-serif text-lg text-[#005125] text-left font-semibold mt-3">
                      League
                    </div>
                    <div className="mb-2 mt-4">
                      <span className="text-sm text-black mont-serif font-bold">Name:   </span>
                      <span className="text-black">
                        {detail.league?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        )
      }
      {
        isEditModalOpen && (
          <div className=" fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
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
                    onClick={() => setEditModalOpen(!isEditModalOpen)}
                    className="relative left-[15rem] mt-[15px] text-[29px] cursor-pointer text-black"
                  >
                    <RxCross1 />
                  </span>
                  <div className="img">
                    <img id="uploadPreview" src={detail?.avatar ? process.env.REACT_APP_API_IMAGE_URL + detail?.avatar : DefaultImage} style={{ width: "130px", height: "130px", borderRadius: "50%", }} alt="avatarImage" />
                  </div>
                  <div className=" mont-serif text-2xl text-[#005125] font-semibold mt-3">
                    {detail?.name}
                  </div>
                  <hr className="border-b border-[#007033] w-[20%]" />
                  <div style={{ width: "70%", margin: "20px 0px" }}>
                    <Autocomplete
                      multiple
                      size="small"
                      limitTags={2}
                      id="multiple-limit-tags"
                      options={businessCat}
                      getOptionLabel={(option) => option.name}
                      value={selectedOptions
                        .split(",")
                        .map((optionId) => {
                          const id = parseInt(optionId);
                          return businessCat.find((option) => option.id === id);
                        })
                        .filter((option) => option !== undefined)
                      }
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
                    {selectedOptionsErrorMessage && (
                      <div className='text-red-500 text-xs text-left mt-2'>{selectedOptionsErrorMessage}</div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center mt-[1rem] mb-8">
                    <button type="submit" onClick={handleBussinesCategory} className="btn-create mont-serif text-black">
                      {loading ? <Spinner /> : 'Update'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        awardPointModal && (
          <div className=" fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
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
                    onClick={() => setAwardPointModal(!awardPointModal)}
                    className="relative left-[15rem] mt-[15px] text-[29px] cursor-pointer text-black"
                  >
                    <RxCross1 />
                  </span>
                  <div className="img">
                    <img id="uploadPreview" src={detail?.avatar ? process.env.REACT_APP_API_IMAGE_URL + detail?.avatar : DefaultImage} style={{ width: "130px", height: "130px", borderRadius: "50%", }} alt="avatarImage" />
                  </div>
                  <div className=" mont-serif text-2xl text-[#005125] font-semibold mt-3">
                    {detail?.name}
                  </div>
                  <hr className="border-b border-[#007033] w-[20%]" />
                  <div style={{ width: "70%", margin: "30px 0px" }}>
                    <div>
                      <TextField
                        label="Enter a number (0-10)"
                        variant="standard"
                        type="number"
                        value={number}
                        sx={{ width: "100%" }}
                        onChange={(event) => {
                          const input = event.target.value;

                          if (input === '' || (parseInt(input) >= 0 && parseInt(input) <= 10)) {
                            setNumber(input);
                          }
                        }}
                        inputProps={{
                          min: 0,
                          max: 10,
                          step: 1,
                        }}
                      />
                    </div>
                    {numberErrorMessage && (
                      <div className='text-red-500 text-xs text-left mt-2'>{numberErrorMessage}</div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center mt-[1rem] mb-8">
                    <button type="submit" onClick={handleAwardPoints} className="btn-create mont-serif text-black">
                      {loading ? <Spinner /> : 'Update Points'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        error && message?.length > 0 && message?.map((msg) => (
          <MessageAlerts message={msg} variant={variant} setError={setError} />
        ))
      }
    </>
  );
}

export default MemberListing;
