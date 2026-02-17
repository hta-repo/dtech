import React, { useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";

//  Image
import ViewIcon from "../../../assets/viewIcon.png"

import {
  getAllCencomApprovedEvents,
} from "../../../services/cencom/cencomGeneral.services"

// Component
import { DetailPopUp } from "../DetailPopUp"

import { Tooltip } from 'react-tooltip'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function ApprovedEvents() {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  // Modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState({});

  const getCencomApprovedData = useCallback(() => {
    (async () => {
      setLoader(true)
      const status = "?status=1";
      const paginate = "&page=" + currentPage + "&limit=" + pageSize;

      const response = await getAllCencomApprovedEvents({ status, paginate });
      if (response.status) {
        setTotalRecords(response.data.count);
        setData(response.data.data)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize]);

  useEffect(() => {
    getCencomApprovedData();
  }, [getCencomApprovedData]);

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
      field: "cover",
      headerName: "Cover",
      flex: 1,
      valueGetter: ({ row }) => row.cover || "",
      renderCell: (params) => (
        <div className="image-grid lg:w-[50px]">
          {/* {console.log(params, 'row cover')} */}
          <img
            src={process.env.REACT_APP_API_IMAGE_URL + params.value}
            className="w-[50px] h-[50px]"
            alt="Avatar"
          />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Event Name",
      flex: 1,
    },
    {
      field: "event_type",
      headerName: "Event Type",
      flex: 1,
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
            <div className="flex flex-row items-center lg:gap-[20px]">
              <div className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  setDetail(row)
                  setModalOpen(true)
                }}
              >
                <img className="ViewIconDetail" src={ViewIcon} alt="viewIcon" style={{ width: "27px" }} />
              </div>
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
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div className="main-content flex flex-col flex-grow">
          <div className="lg:p-10 bg-about text-center">
            <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px] ">
              Approved Events
            </h1>
          </div>
          <div className="lg:w-[80%] lg:mx-auto my-10">
            <Box
              height="75vh"
            >
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
            <div className="button mx-auto flex mt-8 justify-center">
              <Link to="/admin/events">
                <button className="lg:w-[10rem] btn-dc border border-green-700 mont-serif text-black mx-auto">
                  Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      {isModalOpen && (
        <DetailPopUp isModalOpen={isModalOpen} setModalOpen={setModalOpen} detail={detail} />
      )}
    </>
  );
}
