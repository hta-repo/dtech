import React, { useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";

//  Image
import ViewIcon from "../../../assets/viewIcon.png"

import {
    GetAllCencomApprovedMeetings,
} from "../../../services/cencom/cencomGeneral.services"

// Component
import { MeetingDetailPopUp } from "../DetailPopUp"

import moment from 'moment';

import { Tooltip } from 'react-tooltip'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function ApprovedMeetings() {
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

            const response = await GetAllCencomApprovedMeetings({ status, paginate });
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
        { field: "index", headerName: "#", width: 50 },
        {
            field: "league_id",
            headerName: "League Name",
            width: 180,
            valueGetter: (params) => {
                return params.row?.league_id?.name ?? '';
            },
        },
        {
            field: "name",
            headerName: "Meeting Title",
            width: 250,
        },
        {
            field: "start_date",
            headerName: "Date",
            width: 120,
            valueGetter: (params) => {
                return moment(params.row?.start_date).format("DD MMM, YYYY");
            },
        },
        {
            headerName: "Action",
            field: "action",
            width: 50,
            renderCell: ({ row }) => {
                return (
                    <>
                        <Tooltip anchorSelect=".ViewIconDetail" place="top">
                            <span style={{ fontSize: '12px' }}>View Detail</span>
                        </Tooltip>
                        <div className="flex justify-center">
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
                        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px]">
                            Meetings
                        </h1>
                    </div>
                    <div className="lg:w-[70%] lg:mx-auto my-10">
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
                            <Link to="/admin/meetings">
                                <button className="lg:w-[10rem] btn-dc border border-green-700 mont-serif text-black mx-auto">
                                    Go Back
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            {isModalOpen && (
                <MeetingDetailPopUp isModalOpen={isModalOpen} setModalOpen={setModalOpen} detail={detail} />
            )}
        </>
    );
}
