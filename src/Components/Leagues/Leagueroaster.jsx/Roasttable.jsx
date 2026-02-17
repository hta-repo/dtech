import React, { useEffect, useState, useCallback } from "react";

import { RxCross1 } from "react-icons/rx";

import { Link } from "react-router-dom";

//  Api
import { get_lg_roster } from "../../../services/roaster.services";

//  Image
import DefaultImage from "../../../assets/defaultImage.png"
import PhoneIcon from "../../../assets/phoneIcon.png"
import MessageIcon from "../../../assets/messageIcon.png"
import ViewIcon from "../../../assets/viewIcon.png"
import GlobeIcon from "../../../assets/globeIcon.png"

import { Tooltip } from 'react-tooltip'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function Roasttable() {
  const [lgRoaster, setLgRoaster] = useState([]);
  const [detail, setDetail] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loader, setLoader] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const getLeagueRoaster = useCallback(() => {
    (async () => {
      setLoader(true)
      const paginate = "?page=" + currentPage + "&limit=" + pageSize;

      const response = await get_lg_roster(paginate);
      if (response.status) {
        setTotalRecords(response.data.count);
        setLgRoaster(response.data.data)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize]);

  useEffect(() => {
    getLeagueRoaster();
  }, [getLeagueRoaster]);

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
      field: "email",
      headerName: "Email",
      flex: 1,
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
            <Tooltip anchorSelect=".phoneIcon" place="top">
              <span style={{ fontSize: '12px' }}>Call</span>
            </Tooltip>
            <Tooltip anchorSelect=".websiteIcon" place="top">
              <span style={{ fontSize: '12px' }}>Website</span>
            </Tooltip>
            <Tooltip anchorSelect=".emailIcon" place="top">
              <span style={{ fontSize: '12px' }}>Email</span>
            </Tooltip>

            <div className="flex flex-row items-center lg:gap-[10px]">
              <Link to={`tel:${row.phone}`}>
                <div className="flex flex-col item-center cursor-pointer">
                  <img className="phoneIcon" src={PhoneIcon} alt="PhoneIcon" style={{ width: "27px" }} />
                </div>
              </Link>
              <Link to={`mailto:${row.email}`}>
                <div className="flex flex-col items-center cursor-pointer">
                  <img className="emailIcon" src={MessageIcon} alt="MessageIcon" style={{ width: "27px" }} />
                </div>
              </Link>
              <a href={row.company?.website} target="_blank" rel="noreferrer">
                <div className="flex flex-col items-center">
                  <img className="websiteIcon" src={GlobeIcon} alt="GlobeIcon" style={{ width: "27px" }} />
                </div>
              </a>
              <div className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  setDetail(row)
                  setModalOpen(true)
                }}>
                <img className="ViewIconDetail" src={ViewIcon} alt="ViewIcon" style={{ width: "27px" }} />
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
      <div className="lg:container lg:mx-auto mt-[2.5rem]">
        <div className="lg:w-[80%] mx-auto overflow-auto">
          <Box height="80vh">
            <DataGrid
              rows={lgRoaster.map((row, index) => ({ ...row, index: pageIndex + index + 1 }))}
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
        <div className="button mx-auto flex justify-center mt-8 xxl:mb-16">
          <Link to="/league">
            <button className="lg:w-[10rem] btn-dc border border-green-700 mont-serif text-black mx-auto ">
              Go Back
            </button>
          </Link>
        </div>
      </div>
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
                </div>
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  );
}

export default Roasttable;
