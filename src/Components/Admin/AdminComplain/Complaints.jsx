import React, { useEffect, useState, useCallback } from "react";

//  Image
import ViewIcon from "../../../assets/viewIcon.png"
import SettingIcon from "../../../assets/settingIcon.png"

import {
  GetAllComplaints,
  ChangeComplainStatus,
} from "../../../services/cencom/cencomGeneral.services"

// Icons
import { RxCross1 } from "react-icons/rx";

import { Tooltip } from 'react-tooltip'

import moment from 'moment';

//  Alerts
import MessageAlerts from "../../MessageAlerts";

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Swal
import Swal from "sweetalert2";

function capitalLetter(value) {
  if (!value) {
    return '';
  }
  return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function Complaints() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [detail, setDetail] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [complainStatus, setComplainStatus] = useState('');

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const AllComplaints = useCallback(() => {
    (async () => {
      setLoader(true)
      const paginate = "?page=" + currentPage + "&limit=" + pageSize;
      const status = "&status=" + complainStatus;

      const response = await GetAllComplaints({ paginate, status });
      if (response.status) {
        setTotalRecords(response.data.count);
        setData(response.data.data)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize, complainStatus]);

  useEffect(() => {
    AllComplaints();
  }, [AllComplaints]);

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
      field: "accused?.name",
      headerName: "Acused",
      flex: 1,
      valueGetter: (params) => {
        return params.row?.accused?.name ? capitalLetter(params.row?.accused?.name) : "";
      },
    },
    {
      field: "complaint_by?.name",
      headerName: "Complaint By",
      flex: 1,
      valueGetter: (params) => {
        return params.row?.complaint_by?.name ? capitalLetter(params.row?.complaint_by?.name) : "";
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      valueGetter: (params) => {
        return capitalLetter(params.row?.status);
      },
    },
    {
      field: "created_at",
      headerName: "Date of complaint",
      flex: 1,
      valueGetter: (params) => {
        return moment(params.row?.created_at).format("DD MMM, YYYY") ?? "";
      },
    },
    {
      field: "resolve_date",
      headerName: "Date of resolve",
      flex: 1,
      valueGetter: (params) => {
        return params.row?.resolve_date ? moment(params.row?.resolve_date).format("DD MMM, YYYY") : "";
      },
    },
    {
      headerName: "Action",
      field: "action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <div className="flex flex-row items-center gap-[8px]">
            <Tooltip anchorSelect=".ViewIconDetail" place="top">
              <span style={{ fontSize: '12px' }}>View Detail</span>
            </Tooltip>
            <Tooltip anchorSelect=".approval" place="top">
              <span style={{ fontSize: '12px' }}>Resolve</span>
            </Tooltip>
            <div className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                setDetail(row)
                setModalOpen(true)
              }}
            >
              <img className="ViewIconDetail" src={ViewIcon} alt="viewIcon" style={{ width: "22px" }} />
            </div>
            {row.status === "pending" && (
              <div className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  openAlert(row.id)
                }}
              >
                <img className="approval" src={SettingIcon} alt="SettingIcon" style={{ width: "22px" }} />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const openAlert = (id) => {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure to resolve the complain?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const formData = new FormData();
        formData.append("complaintId", id);
        formData.append("Status", 'resolve');

        try {
          const response = await ChangeComplainStatus(formData);
          if (response.status) {
            AllComplaints();
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
              Complaints
            </h1>
          </div>
          <div className="lg:w-[90%] lg:mx-auto mb-10">
            <div className="my-[20px]">
              <div className="flex flex-row justify-end">
                <select
                  className="lg:text-[14px] border rounded-md border-[#007033] focus:border-indigo-500 outline-none p-2 w-[30%]"
                  name="complainStatus"
                  value={complainStatus}
                  onChange={e => {
                    setComplainStatus(e.target.value);
                  }}
                >
                  <option value="">Both</option>
                  <option value="pending">Pending</option>
                  <option value="resolve">Resolve</option>
                </select>
              </div>
            </div>
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
        </div>
      </main>
      {isModalOpen && (
        <div className="xs:hidden lg:block fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[608px] scale-in-center"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white flex flex-col items-center px-[15px]">
                <span
                  onClick={() => setModalOpen(false)}
                  className="relative left-[15rem] mt-[15px] text-[29px] cursor-pointer text-black"
                >
                  <RxCross1 />
                </span>
                <div className="lg:w-[85%] mont-serif text-[#005125] leading-relaxed mt-3">
                  <div className="mont-serif text-2xl text-center text-[#005125] font-semibold leading-relaxed mt-3">
                    Complaint Detail
                  </div>
                  <hr className="border-b border-[#007033] w-[30%] mx-auto mb-[1.5rem]" />
                  <div className="my-2">
                    <div className="mb-2">
                      <span className="text-sm text-[#005125] mont-serif font-bold">Accused:   </span>
                      <span className="text-[#005125] pl-3">
                        {detail?.accused?.name}
                      </span>
                    </div>
                    <div className="my-1">
                      <span className="text-sm text-[#005125] mont-serif font-bold">Complaint By:   </span>
                      <span className="text-[#005125] pl-3">
                        {detail?.complaint_by?.name}
                      </span>
                    </div>
                    <div className="my-1">
                      <span className="text-sm text-[#005125] mont-serif font-bold">Date:   </span>
                      <span className="text-[#005125] pl-3">
                        {moment(detail.created_at).format("DD MMM, YYYY")}
                      </span>
                    </div>
                    {detail.resolve_date && (
                      <div className="my-1">
                        <span className="text-sm text-[#005125] mont-serif font-bold">Resolve Date:   </span>
                        <span className="text-[#005125] pl-3">
                          {moment(detail.resolve_date).format("DD MMM, YYYY")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mont-serif text-[#005125] font-semibold leading-relaxed mt-3">
                    Message
                  </div>
                  <div className="min-h-[10rem] text-[#005125] text-sm mt-2 mb-6">
                    {detail?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && message?.length > 0 && message?.map((msg) => (
        <MessageAlerts message={msg} variant={variant} setError={setError} />
      ))
      }
    </>
  );
}
