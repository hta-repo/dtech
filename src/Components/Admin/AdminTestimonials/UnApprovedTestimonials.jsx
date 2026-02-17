import React, { useEffect, useState, useCallback } from "react";

//  Image
import SettingIcon from "../../../assets/settingIcon.png"
import DefaultImage from "../../../assets/defaultImage.png"
import ViewIcon from "../../../assets/viewIcon.png"
import { RxCross1 } from "react-icons/rx";

import {
    getAllTestimonials,
    ApproveTestimonials,
} from "../../../services/cencom/cencomGeneral.services"

//  Alerts
import MessageAlerts from "../MessageAlerts";

// Swal
import Swal from "sweetalert2";
import moment from 'moment';

import { Tooltip } from 'react-tooltip'

// Rating
import StarRatings from 'react-star-ratings';

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function UnApprovedTestimonials() {
    const [pendingData, setPendingData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [approved, setApproved] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [loader, setLoader] = useState(false);
    const [detail, setDetail] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const getCencomPendingData = useCallback(() => {
        (async () => {
            setLoader(true)
            const approval = "?cencom_approval=0";
            const paginate = "&page=" + currentPage + "&limit=" + pageSize;

            const response = await getAllTestimonials({ approval, paginate });
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
            title: 'Are you sure you want to approve the testimonial?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const formData = new FormData();
                for (let index = 0; index < id.length; index++) {
                    formData.append("testimonial_id[]", id[index]);
                }
                try {
                    const response = await ApproveTestimonials(formData);
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
            field: "avatar",
            headerName: "Member Image",
            flex: 1,
            valueGetter: ({ row }) => row.user?.avatar || "",
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
            headerName: "Member Name",
            flex: 1,
            valueGetter: (params) => {
                return params.row?.user?.name ?? "";
            },
        },
        {
            field: "company?.name",
            headerName: "Company Name",
            flex: 1,
            valueGetter: (params) => {
                return params.row?.user?.company?.name ?? "";
            },
        },
        {
            field: "rating",
            headerName: "Rating",
            flex: 1,
        },
        {
            headerName: "Action",
            field: "action",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <>
                        <Tooltip anchorSelect=".approvedIcon" place="top">
                            <span style={{ fontSize: '12px' }}>Approve</span>
                        </Tooltip>
                        <Tooltip anchorSelect=".ViewIconDetail" place="top">
                            <span style={{ fontSize: '12px' }}>View Detail</span>
                        </Tooltip>
                        <div className="flex flex-row items-center lg:gap-[15px]">
                            <div className="flex flex-col item-center cursor-pointer"
                                onClick={() => {
                                    openAlert([row.id])
                                }}>
                                <img className="approvedIcon" src={SettingIcon} alt="viewIcon" style={{ width: "27px" }} />
                            </div>
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
                            Pending Testimonials
                        </h1>
                    </div>
                    <div className="lg:w-[145vh] lg:mx-auto mb-10">
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
                    </div>
                </div>
            </main>
            {error && message?.length > 0 && message?.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
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
                            className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-5 sm:align-middle w-[608px] h-full scale-in-center"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white flex flex-col items-center">
                                <span
                                    onClick={() => setModalOpen(false)}
                                    className="relative left-[15rem] mt-[15px] text-[29px] cursor-pointer text-black"
                                >
                                    <RxCross1 />
                                </span>
                                <div className="img">
                                    <img id="uploadPreview"
                                        src={detail.user?.avatar ? process.env.REACT_APP_API_IMAGE_URL + detail.user?.avatar : DefaultImage}
                                        style={{ width: "110px", height: "110px", borderRadius: "50%", }} alt="avatarImage" />
                                </div>
                                <div className=" mont-serif text-2xl text-[#005125] font-semibold mt-3">
                                    {detail.user?.name}
                                </div>
                                <hr className="border-b border-[#007033] w-[20%]" />
                                <div className="rating-star my-5">
                                    <div className="flex justify-center">
                                        <StarRatings
                                            rating={Math.ceil(detail.rating)}
                                            starRatedColor="#1F814C"
                                            starEmptyColor="gray"
                                            starHoverColor="#1F814C"
                                            isSelectable={false}
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="30px"
                                            starSpacing="3px"
                                        />
                                    </div>
                                </div>
                                <div className="w-[70%] mx-auto my-[1rem]">
                                    <div className="mont-serif text-lg text-[#005125] text-left font-semibold mt-3">
                                        Review
                                    </div>
                                    <div className="mt-[5px] mb-[20px]">
                                        <div className="text-black mont-serif text-sm">
                                            {detail.review}
                                        </div>
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
