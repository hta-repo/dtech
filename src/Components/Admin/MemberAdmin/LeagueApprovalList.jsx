import React, { useEffect, useState, useCallback } from "react";

//  Image
import DefaultImage from "../../../assets/defaultImage.png"
import SettingIcon from "../../../assets/settingIcon.png"

// Api
import { getUserLeagueApprovalList, userLeagueApproval } from '../../../services/cencom/cencomUser.services';

//  Alerts
import MessageAlerts from "../MessageAlerts";

import { Tooltip } from 'react-tooltip'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Swal
import Swal from "sweetalert2";

function LeagueApprovalList() {
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

    const getDetail = useCallback(() => {
        (async () => {
            setLoader(true)
            const paginate = "?page=" + currentPage + "&limit=" + pageSize;

            const response = await getUserLeagueApprovalList({ paginate });
            if (response.status) {
                setTotalRecords(response.data.count);
                setData(response.data.data)
            }
            setLoader(false)
        })();
    }, [currentPage, pageSize]);

    useEffect(() => {
        getDetail();
    }, [getDetail]);

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
            field: "cover",
            headerName: "Image",
            width: 100,
            valueGetter: ({ row }) => row.user_id?.avatar || "",
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
            field: "pre_league_id",
            headerName: "Previous League",
            width: 200,
            valueGetter: (params) => {
                return params.row?.pre_league_id?.name ?? "";
            },
        },
        {
            field: "league_id",
            headerName: "Approval League",
            width: 200,
            valueGetter: (params) => {
                return params.row?.league_id?.name ?? "";
            },
        },
        {
            headerName: "Action",
            field: "action",
            width: 100,
            renderCell: ({ row }) => {
                return (
                    <div className="flex flex-row items-center lg:gap-[6px]">
                        <Tooltip anchorSelect=".approval" place="top">
                            <span style={{ fontSize: '12px' }}>Approve</span>
                        </Tooltip>
                        <div className="flex flex-col items-center cursor-pointer"
                            onClick={() => {
                                openAlert(row.id)
                            }}
                        >
                            <img className="approval" src={SettingIcon} alt="SettingIcon" style={{ width: "22px" }} />
                        </div>
                    </div>
                );
            },
        },
    ];

    const openAlert = (id) => {
        Swal.fire({
            icon: 'info',
            title: 'Are you sure to change the Club?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await userLeagueApproval(id);
                    if (response.status) {
                        getDetail()
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
            <div className="mx-auto">
                <div className="my-6">
                    <Box height="100vh">
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
            {
                error && message?.length > 0 && message?.map((msg) => (
                    <MessageAlerts message={msg} variant={variant} setError={setError} />
                ))
            }
        </>
    );
}

export default LeagueApprovalList;
