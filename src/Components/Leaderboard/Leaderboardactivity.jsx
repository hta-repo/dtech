
import React, { useEffect, useState, useCallback } from "react";
// import img from "./graphimage/building.png";

// Api
import GeneralService from '../../services/general.services'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { Tooltip } from 'react-tooltip'

//  Image
import DefaultImage from "../../assets/defaultImage.png"
import ViewIcon from "../../assets/viewIcon.png"

import moment from 'moment';

// Component
import LeaderModal from "./LeaderModal";

export function Leaderboardactivity() {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [userID, setUserID] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const getLeaderboardDetail = useCallback(() => {
    (async () => {
      setLoader(true)
      const paginate = "?page=" + currentPage + "&limit=" + pageSize;

      const response = await GeneralService.getLeaderBoard({ paginate });
      if (response.data.status) {
        setTotalRecords(response.data.data.count);
        setData(response.data.data.data)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize]);

  useEffect(() => {
    getLeaderboardDetail();
  }, [getLeaderboardDetail]);

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
      headerName: "Image",
      flex: 1,
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
      headerName: "Member",
      flex: 1,
    },
    {
      field: "points",
      headerName: "Points Earned",
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
            <div className="flex justify-center">
              <div className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  setUserID(row.id)
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
      <div className="lg:p-10 bg-about text-center">
        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px]">
          Leaderboard
        </h1>
      </div>
      <div className="lg:w-[75%] lg:mx-auto mt-6 mb-[4rem]">
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
      </div>
      {isModalOpen && (
        <LeaderModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} userID={userID} />
      )}
    </>
  );
}

export function PointsActivity() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loader, setLoader] = useState(false);

  const getPointsDetail = useCallback(() => {
    (async () => {
      setLoader(true)
      const paginate = "?page=" + currentPage + "&limit=" + pageSize;

      const response = await GeneralService.getPoints({ paginate });
      if (response.data.status) {
        setTotalRecords(response.data.data.count);
        setData(response.data.data.data)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize]);

  useEffect(() => {
    getPointsDetail();
  }, [getPointsDetail]);

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
      field: "description",
      headerName: "Description",
      flex: 1,
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
      field: "points",
      headerName: "Points Earned",
      flex: 1,
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
      <div className="lg:p-10 bg-about text-center">
        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px]">
          Points Activity
        </h1>
      </div>
      <div className="lg:w-[75%] lg:mx-auto mt-6 mb-[4rem]">
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
      </div>
    </>
  );
}

