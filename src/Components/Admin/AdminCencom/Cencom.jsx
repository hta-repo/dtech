import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GetAllCencoms } from "../../../services/cencom/cencomGeneral.services";
import { DeleteAdmin } from "../../../services/cencom/cencomUser.services";

//  Image
import DefaultImage from "../../../assets/defaultImage.png"
import EditIcon from "../../../assets/editIcon.png"
import { FaTrashAlt } from "react-icons/fa";

import { Tooltip } from 'react-tooltip'

//  Material ui
import { CircularProgress, Backdrop, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Swal
import Swal from "sweetalert2";
import MessageAlerts from "../MessageAlerts";

function Cencom() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loader, setLoader] = useState(false);

  //  Show Messages
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const getCencoms = useCallback(() => {
    (async () => {
      setLoader(true)
      const paginate = "?page=" + currentPage + "&limit=" + pageSize;
      const response = await GetAllCencoms(paginate);
      if (response.status) {
        setTotalRecords(response.data.count);
        setData(response.data.data)
      }
      setLoader(false)
    })();
  }, [currentPage, pageSize]);

  useEffect(() => {
    getCencoms();
  }, [getCencoms]);

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
    { field: "index", headerName: "#", width: 50 },
    {
      field: "avatar",
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
      width: 180,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 80,
      valueGetter: (params) => {
        return params.row?.is_active === 1 ? "Active" : "InActive";
      },
    },
    {
      headerName: "Action",
      field: "action",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <div className="flex flex-row items-center lg:gap-[12px]">
            <Tooltip anchorSelect=".EditIcon" place="top">
              <span style={{ fontSize: '12px' }}>Edit Admin</span>
            </Tooltip>
            <Tooltip anchorSelect=".deleteIcon" place="top">
              <span style={{ fontSize: '12px' }}>Delete Admin</span>
            </Tooltip>
            <div className="flex flex-col item-center cursor-pointer"
              onClick={() => {
                navigate("/admin/edit-admin", { state: { data: row } })
              }}
            >
              <img className="EditIcon" src={EditIcon} alt="EditIcon" style={{ width: "22px" }} />
            </div>
            <div className="flex flex-col item-center cursor-pointer"
              onClick={() => {
                openAlert(row.id)
              }}
            >
              <FaTrashAlt className="deleteIcon" style={{ fontSize: "17px" }} />
            </div>
          </div>
        );
      },
    },
  ];

  const openAlert = (id) => {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure want to delete Admin user?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const response = await DeleteAdmin(id);
          if (response.status) {
            getCencoms();
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
              Cencom Admin List
            </h1>
          </div>
          <div className="lg:w-[115vh] lg:mx-auto">
            <div className="flex justify-end my-6">
              <Link to="/admin/create-admin">
                <button className={`mont-serif text-black btn-create`}>
                  Create Admin
                </button>
              </Link>
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
          <div className="button mx-auto flex mt-6 mb-10 justify-center">
            <Link to="/admin/dashboard">
              <button className="lg:w-[10rem] btn-dc border border-green-700 mont-serif text-black mx-auto ">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </main>
      {
        error && message?.length > 0 && message?.map((msg) => (
          <MessageAlerts message={msg} variant={variant} setError={setError} />
        ))
      }
    </>
  );
}

export default Cencom;
