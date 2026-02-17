
import React, { useEffect, useState, useCallback } from "react";

// Api
import GeneralService from '../../../services/general.services'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { Tooltip } from 'react-tooltip'

//  Image
import DefaultImage from "../../../assets/defaultImage.png"
import ViewIcon from "../../../assets/viewIcon.png"

// Component
import LeaderModal from "../../Leaderboard/LeaderModal";

export default function LeaderBoard() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [loader, setLoader] = useState(false);
    const [userID, setUserID] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const [leagID, setleagID] = useState('1');
    const [leagues, setLeagues] = useState([]);

    const getLeagues = useCallback(() => {
        (async () => {
            const response = await GeneralService.getAllLeagues();
            setLeagues(response.data.data)
        })();
    }, []);

    const getLeaderboardDetail = useCallback(() => {
        (async () => {
            setLoader(true)
            const paginate = "?page=" + currentPage + "&limit=" + pageSize;
            const leagueID = "&league_id=" + leagID;

            const response = await GeneralService.getLeaderBoard({ paginate, leagueID });
            if (response.data.status) {
                setTotalRecords(response.data.data.count);
                setData(response.data.data.data)
            }
            setLoader(false)
        })();
    }, [currentPage, pageSize, leagID]);

    useEffect(() => {
        getLeaderboardDetail();
        getLeagues();
    }, [getLeaderboardDetail, getLeagues]);

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
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <div className="main-content flex flex-col flex-grow">
                    <div className="lg:p-10 bg-about text-center">
                        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px]">
                            Leaderboard
                        </h1>
                    </div>
                    <div className="lg:w-[75%] lg:mx-auto mt-6 mb-[4rem]">
                        <div className="flex justify-end mb-6">
                            <select
                                className="lg:text-[14px] border rounded-md border-[#007033] focus:border-[#007033] outline-none p-2 mt-2 w-[35%]"
                                value={leagID}
                                onChange={e => {
                                    setleagID(e.target.value);
                                }}
                            >
                                <option value="">Select</option>
                                {leagues?.map((option, index) => (
                                    <option key={index} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
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
                <LeaderModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} userID={userID} />
            )}
        </>
    );
}
