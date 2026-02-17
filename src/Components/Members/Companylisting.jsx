import React, { useEffect, useState, useCallback } from "react";

// Api
import { GetLeagueMembers } from "../../services/companies.services"

import { RxCross1 } from "react-icons/rx";

// Default Image
import DefaultImage from "../../assets/defaultImage.png"
import ViewIcon from "../../assets/viewIcon.png"

//  Redux
import { useSelector } from "react-redux";

import { Tooltip } from 'react-tooltip'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function Companylisting() {
  const [leagueMembers, setLeagueMembers] = useState([]);
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const [detail, setDetail] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loader, setLoader] = useState(false);

  const getLeagueMem = useCallback(() => {
    (async () => {
      setLoader(true)
      const paginate = "?page=" + currentPage + "&limit=" + pageSize;

      const response = await GetLeagueMembers(paginate);
      if (response.status) {
        setTotalRecords(response.data.count);
        setLeagueMembers(response.data.data)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize]);

  useEffect(() => {
    getLeagueMem();
  }, [getLeagueMem])

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

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
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "company?.name",
      headerName: "Company",
      flex: 1,
      valueGetter: (params) => {
        return params.row?.company?.name ?? "";
      },
    },
    {
      field: "designation?.name",
      headerName: "Designation",
      flex: 1,
      valueGetter: (params) => {
        return params.row?.designation?.name ?? "";
      },
    },
    {
      field: "phone",
      headerName: "Phone #",
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
            <div className="flex flex-col items-center cursor-pointer"
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
      <section className="text-gray-600 body-font">
        <div className="lg:container px-5 py-12 mx-auto">
          <div className="flex flex-row w-full lg:justify-start xs:justify-start xs:gap-[3rem] xs:h-[36px]">
            <h1 className="xs:ml-[9px] lg:ml-[80px] text-[#005125] mont-serif text-2xl title-font mb-9">
              Member Listing
            </h1>
          </div>
          <div className="w-[90%] mx-auto overflow-auto mb-[2rem]">
            <Box height="80vh">
              <DataGrid
                rows={leagueMembers.map((row, index) => ({ ...row, index: pageIndex + index + 1 }))}
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
        </div>
      </section>
      {isModalOpen && (
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
                      {loggedUserInfo.league?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  );
}
