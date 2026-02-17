import React, { useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";

//  Image
import ViewIcon from "../../../assets/viewIcon.png"
import SettingIcon from "../../../assets/settingIcon.png"

import {
    getAllCencomPendingEvents,
    ApprovedEvents,
} from "../../../services/cencom/cencomGeneral.services"

//  Alerts
import MessageAlerts from "../MessageAlerts";

// Swal
import Swal from "sweetalert2";

// Component
import { DetailPopUp } from "../DetailPopUp"

import { Tooltip } from 'react-tooltip'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function PendingEvents() {
    const [pendingData, setPendingData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [approved, setApproved] = useState(false);
    const [approvedDetailObject, setApprovedDetailObject] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [loader, setLoader] = useState(false);

    // Modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [detail, setDetail] = useState({});

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const getCencomPendingData = useCallback(() => {
        (async () => {
            setLoader(true)
            const status = "?status=0";
            const paginate = "&page=" + currentPage + "&limit=" + pageSize;

            const response = await getAllCencomPendingEvents({ status, paginate });
            if (response.status) {
                setTotalRecords(response.data.count);
                setPendingData(response.data.data)
            }
            setLoader(false)
        })();
    }, [currentPage, pageSize]);

    useEffect(() => {
        getCencomPendingData();
    }, [getCencomPendingData])

    useEffect(() => {
        if (approved) {
            openAlert(selectedIds)
        }
    }, [approved, selectedIds, getCencomPendingData]);

    const openAlert = (id) => {
        Swal.fire({
            icon: 'info',
            title: 'Are you sure you want to approve the event?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const formData = new FormData();
                for (let index = 0; index < id.length; index++) {
                    formData.append("id[]", id[index]);
                }
                try {
                    const response = await ApprovedEvents(formData);
                    if (response.status) {
                        getCencomPendingData();
                        setSelectedIds([])
                        setApproved(false)
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                    }
                } catch (error) {
                    setApproved(false)
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
        if (approvedDetailObject && Object.entries(approvedDetailObject).length > 0) {
            const updatedArray = pendingData.filter((item) => item.id !== approvedDetailObject.id);
            setPendingData(updatedArray);
        }
    }, [approvedDetailObject]);

    const handlePageChange = (params) => {
        setCurrentPage(params + 1);
    };

    const handlePageSizeChange = (params) => {
        setPageSize(params);
    };

    const handleSelectionChange = (selectionModel) => {
        setSelectedIds(selectionModel);
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
                        <Tooltip anchorSelect=".approvedIcon" place="top">
                            <span style={{ fontSize: '12px' }}>Approve</span>
                        </Tooltip>
                        <div className="flex flex-row items-center lg:gap-[10px]">
                            <div className="flex flex-col items-center cursor-pointer"
                                onClick={() => {
                                    setDetail(row)
                                    setModalOpen(true)
                                }}
                            >
                                <img className="ViewIconDetail" src={ViewIcon} alt="viewIcon" style={{ width: "27px" }} />
                            </div>
                            <div className="flex flex-col item-center cursor-pointer"
                                onClick={() => {
                                    openAlert([row.id])
                                }}>
                                <img className="approvedIcon" src={SettingIcon} alt="viewIcon" style={{ width: "27px" }} />
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
                        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px]">
                            Pending Events
                        </h1>
                    </div>
                    <div className="lg:w-[130vh] lg:mx-auto">
                        <div className="flex justify-end my-6">
                            <button className={`mont-serif text-black ${selectedIds.length === 0 ? 'btn-create-disabled' : 'btn-create'}`} disabled={selectedIds.length === 0} onClick={() => setApproved(true)}>
                                Approve
                            </button>
                        </div>
                        <div className="my-6">
                            <Box height="75vh">
                                <DataGrid
                                    rows={pendingData.map((row, index) => ({ ...row, index: pageIndex + index + 1 }))}
                                    columns={columns}
                                    pagination
                                    pageSize={pageSize}
                                    rowsPerPageOptions={[10, 25, 50]}
                                    rowCount={totalRecords}
                                    paginationMode="server"
                                    onPageChange={handlePageChange}
                                    onPageSizeChange={handlePageSizeChange}
                                    checkboxSelection
                                    selectionModel={selectedIds}
                                    onSelectionModelChange={handleSelectionChange}
                                />
                            </Box>
                        </div>
                        <div className="button mx-auto flex mt-8 xxl:mb-16 lg:mb-16  justify-center">
                            <Link to="/admin/events">
                                <button className="lg:w-[10rem] btn-dc border border-green-700 mont-serif text-black mx-auto ">
                                    Go Back
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            {error && message?.length > 0 && message?.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
            {isModalOpen && (
                <DetailPopUp isModalOpen={isModalOpen} setModalOpen={setModalOpen} detail={detail} setApprovedDetailObject={setApprovedDetailObject} />
            )}
        </>
    );
}
