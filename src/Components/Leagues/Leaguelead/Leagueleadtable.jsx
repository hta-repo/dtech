import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

// Image
import ViewIcon from "../../../assets/viewIcon.png"

import moment from 'moment';

import { RxCross1 } from "react-icons/rx";

//  Image
import DefaultImage from "../../../assets/defaultImage.png"

import { Tooltip } from 'react-tooltip'

//  Api
import { GetLeads } from "../../../services/lead.services";

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export function Leagueleadgiventable(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [detail, setDetail] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const GetGivenLeads = useCallback(() => {
    (async () => {
      setLoader(true)
      const type = "?type=given";
      const paginate = "&page=" + currentPage + "&limit=" + pageSize;

      const response = await GetLeads({ type, paginate });
      if (response.status) {
        setTotalRecords(response.data.count);
        setData(response.data.data)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize]);

  useEffect(() => {
    GetGivenLeads();
  }, [GetGivenLeads]);

  const handlePageChange = (params) => {
    setCurrentPage(params + 1);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params);
  };

  useEffect(() => {
    const currentPageIndex = (currentPage - 1) * pageSize;
    setPageIndex(currentPageIndex);
  }, [currentPage, pageSize]);

  const columns = [
    { field: "index", headerName: "#", flex: 0.5 },
    {
      field: "given_to?.avatar",
      headerName: "Image",
      flex: 1,
      valueGetter: ({ row }) => row.given_to?.avatar || "",
      renderCell: (params) => (
        <div className="avatr">
          <img
            src={params.value !== "" ? process.env.REACT_APP_API_IMAGE_URL + params.value : DefaultImage}
            className="w-[40px] rounded-full h-[40px]"
            alt="Avatar"
          />
        </div>
      ),
    },
    {
      field: "given_to?.name",
      headerName: "Given To",
      flex: 1,
      valueGetter: (params) => {
        return props.given ? params.row?.given_to?.name : "";
      },
    },
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) => {
        return moment(params.row?.created_at).format("DD MMM, YYYY");
      },
    },
    {
      field: "company?.name",
      headerName: "Company",
      flex: 1,
      valueGetter: (params) => {
        return props.given ? params.row?.given_to?.company?.name : "";
      },
    },
    {
      headerName: "Action",
      field: "action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip anchorSelect=".ViewIconDetail" place="top">
              <span style={{ fontSize: '12px' }}>View Detail</span>
            </Tooltip>
            <div className="flex flex-col cursor-pointer"
              onClick={() => {
                setDetail(row)
                setModalOpen(true)
              }}
            >
              <img className="ViewIconDetail" src={ViewIcon} alt="viewIcon" style={{ width: "27px" }} />
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Backdrop
        sx={{ color: "#005125", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="lg:container lg:mx-auto mt-[2rem]">
        <div className="lg:w-[80%] mx-auto overflow-auto">
          <Box height="75vh">
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
            />
          </Box>
          <div className="button mx-auto flex mt-12 xxl:mb-[4rem] lg:mb-[5rem]  justify-center">
            <Link to="/league">
              <button className="lg:w-[10rem] btn-dc border border-green-700 mont-serif text-black mx-auto ">Go Back</button>
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        newModalFunc(toggleModal, props, detail)
      )}
    </>
  );
}

export function Leagueleadreceivetable(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [detail, setDetail] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const GetGivenLeads = useCallback(() => {
    (async () => {
      setLoader(true)
      const type = "?type=received";
      const paginate = "&page=" + currentPage + "&limit=" + pageSize;

      const response = await GetLeads({ type, paginate });
      if (response.status) {
        setTotalRecords(response.data.count);
        setData(response.data.data)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize]);

  useEffect(() => {
    GetGivenLeads();
  }, [GetGivenLeads]);

  const handlePageChange = (params) => {
    setCurrentPage(params + 1);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params);
  };

  useEffect(() => {
    const currentPageIndex = (currentPage - 1) * pageSize;
    setPageIndex(currentPageIndex);
  }, [currentPage, pageSize]);

  const columns = [
    { field: "index", headerName: "#", flex: 0.5 },
    {
      field: "given_by?.avatar",
      headerName: "Image",
      flex: 1,
      valueGetter: ({ row }) => row.given_by?.avatar || "",
      renderCell: (params) => (
        <div className="avatr">
          <img
            src={params.value !== "" ? process.env.REACT_APP_API_IMAGE_URL + params.value : DefaultImage}
            className="w-[40px] rounded-full h-[40px]"
            alt="Avatar"
          />
        </div>
      ),
    },
    {
      field: "given_by?.name",
      headerName: "Given By",
      flex: 1,
      valueGetter: (params) => {
        return props.given === false ? params.row?.given_by?.name : "";
      },
    },
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) => {
        return moment(params.row?.created_at).format("DD MMM, YYYY");
      },
    },
    {
      field: "company?.name",
      headerName: "Company",
      flex: 1,
      valueGetter: (params) => {
        return props.given === false ? params.row?.given_by?.company?.name : "";
      },
    },
    {
      headerName: "Action",
      field: "action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip anchorSelect=".ViewIconDetail" place="top">
              <span style={{ fontSize: '12px' }}>View Detail</span>
            </Tooltip>
            <div className="flex flex-col cursor-pointer"
              onClick={() => {
                setDetail(row)
                setModalOpen(true)
              }}
            >
              <img className="ViewIconDetail" src={ViewIcon} alt="viewIcon" style={{ width: "27px" }} />
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Backdrop
        sx={{ color: "#005125", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="lg:container lg:mx-auto mt-[2rem]">
        <div className="lg:w-[80%] mx-auto overflow-auto">
          <Box height="75vh">
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
            />
          </Box>
          <div className="button mx-auto flex mt-12 xxl:mb-[4rem] lg:mb-[5rem]  justify-center">
            <Link to="/league">
              <button className="lg:w-[10rem] btn-dc border border-green-700 mont-serif text-black mx-auto ">Go Back</button>
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        newModalFunc(toggleModal, props, detail)
      )}
    </>
  );
}

function newModalFunc(toggleModal, props, detail) {
  return <div className=" fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-black opacity-75" />
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
        &#8203;
      </span>
      <div
        className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-5 sm:align-middle w-[608px] h-full scale-in-center"
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
            <img id="uploadPreview"
              src={props.given ? detail.given_to?.avatar ? process.env.REACT_APP_API_IMAGE_URL + detail.given_to?.avatar : DefaultImage : detail.given_by?.avatar ? process.env.REACT_APP_API_IMAGE_URL + detail.given_by?.avatar : DefaultImage}
              style={{ width: "110px", height: "110px", borderRadius: "50%", }} alt="avatarImage" />
          </div>
          <div className=" mont-serif text-2xl text-[#005125] font-semibold mt-3">
            {props.given ? detail.given_to?.name : detail.given_by?.name}
          </div>
          <hr className="border-b border-[#007033] w-[20%]" />
          <div className="w-[70%] mx-auto my-[1rem]">
            <div className="mont-serif text-lg text-[#005125] text-left font-semibold">
              Member Contact
            </div>
            <div className="my-[3px]">
              <span className="text-xs text-black mont-serif font-bold">Phone number: </span>
              <span className="text-black text-xs pl-2">
                {props.given ? detail.given_to?.phone : detail.given_by?.phone}
              </span>
            </div>
            <div className="my-[3px]">
              <span className="text-xs text-black mont-serif font-bold">Email: </span>
              <span className="text-black text-xs pl-2">
                {props.given ? detail.given_to?.email : detail.given_by?.email}
              </span>
            </div>

            <div className="mont-serif text-lg text-[#005125] text-left font-semibold mt-3">
              Company
            </div>
            <div className="my-[3px]">
              <span className="text-xs text-black mont-serif font-bold">Name: </span>
              <span className="text-black text-xs pl-2">
                {props.given ? detail.given_to?.company?.name : detail.given_by?.company?.name}
              </span>
            </div>
            <div className="my-[3px]">
              <span className="text-xs text-black mont-serif font-bold">Website: </span>
              <span className="text-black text-xs pl-2">
                {props.given ? detail.given_to?.company?.website : detail.given_by?.company?.website}
              </span>
            </div>
            <div className="mont-serif text-lg text-[#005125] text-left font-semibold mt-3">
              League Details
            </div>
            {detail.category && (
              <div className="my-[3px]">
                <span className="text-xs text-black mont-serif font-bold">Category: </span>
                <span className="text-black text-xs pl-2">
                  {detail.category}
                </span>
              </div>
            )}
            {detail.created_at && (
              <div className="my-[3px]">
                <span className="text-xs text-black mont-serif font-bold">Date: </span>
                <span className="text-black text-xs pl-2">
                  {moment(detail.created_at).format("DD MMM, YYYY")}
                </span>
              </div>
            )}
            {detail.topics && (
              <div className="my-[3px]">
                <span className="text-xs text-black mont-serif font-bold">Topics: </span>
                <span className="text-black text-xs pl-2">
                  {detail.topics}
                </span>
              </div>
            )}
            {detail.mt_location && (
              <div className="my-[3px]">
                <span className="text-xs text-black mont-serif font-bold">Meeting Location: </span>
                <span className="text-black text-xs pl-2">
                  {detail.mt_location}
                </span>
              </div>
            )}
            {detail.mt_dt && (
              <div className="my-[3px]">
                <span className="text-xs text-black mont-serif font-bold">Meeting Date: </span>
                <span className="text-black text-xs pl-2">
                  {moment(detail.mt_dt).format("DD MMM, YYYY")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>;
}

