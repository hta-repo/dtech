import React, { useEffect, useState, useCallback } from "react";

import { Link, useNavigate } from "react-router-dom";

import GeneralService from "../../../services/general.services";
import EditIcon from "../../../assets/editIcon.png"

import { Tooltip } from 'react-tooltip'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function AdminLeagueList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loader, setLoader] = useState(false);

  const getLeagues = useCallback(() => {
    (async () => {
      setLoader(true)
      const paginate = "?page=" + currentPage + "&limit=" + pageSize;

      const response = await GeneralService.getAllLeagues({ paginate });
      if (response.status) {
        setData(response.data.data.data)
        setTotalRecords(response.data.data.count)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize]);

  useEffect(() => {
    getLeagues();
  }, [getLeagues]);

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
    { field: "index", headerName: "#", width: 100 },
    {
      field: "name",
      headerName: "Title",
      width: 350,
    },
    {
      headerName: "Action",
      field: "action",
      width: 100,
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip anchorSelect=".EditIcon" place="top">
              <span style={{ fontSize: '12px' }}>Edit</span>
            </Tooltip>
            <div className="flex flex-row items-center lg:gap-[10px]">
              <div className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  navigate('/admin/edit-recurring-league/' + row.id)
                }}
              >
                <img className="EditIcon" src={EditIcon} alt="EditIcon" style={{ width: "27px" }} />
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
          <div className="xs:p-[25px] lg:p-10 bg-about text-center">
            <h1 className=" text-center mont-serif font-extralight text-2xl text-[#005125] ml-12">
              10x Club
            </h1>
          </div>
          <div className="lg:w-[90vh] lg:mx-auto">
            <div className="flex justify-end my-6">
              <Link to="/admin/create-recurring-league">
                <button className={`mont-serif text-black btn-create`}>
                  Create
                </button>
              </Link>
            </div>
            <div className="my-6">
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
            <div className="button mx-auto flex mt-6 mb-10 justify-center">
              <Link to="/admin/dashboard">
                <button className="lg:w-[10rem] btn-dc border border-green-700 mont-serif text-black mx-auto ">
                  Go Back
                </button>
              </Link>
            </div>
          </div>
          {/* {leagues?.map((item, index) => (
            <div className="lg:w-[50%] mx-auto xs:w-[90%] lg:my-3">
              <div className="text icon-d border-b-[1px] border-[#A6A0A0]" key={index}>
                <h3 className="mont-serif font-extralight leading-relaxed text-[#005125]">
                  {index + 1}. {item.name}
                </h3>
              </div>
            </div>
          ))} */}
        </div>
      </main>
    </>
  );
}

export default AdminLeagueList;
