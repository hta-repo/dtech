
import React, { useEffect, useState } from "react";
// moment
import moment from 'moment';
// Icon
import { RxCross1 } from "react-icons/rx";

// Api
import GeneralService from '../../services/general.services'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function LeaderModal(props) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            setLoader(true)
            const paginate = "?page=" + currentPage + "&limit=" + pageSize;
            const user_id = "&user_id=" + props.userID;

            const response = await GeneralService.getPoints({ paginate, user_id });
            if (response.data.status) {
                setTotalRecords(response.data.data.count);
                setData(response.data.data.data)
            }
            setLoader(false)
        })();
    }, [props, currentPage, pageSize]);

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
            field: "description",
            headerName: "Description",
            flex: 1,
        },
        {
            field: "created_at",
            headerName: "Date",
            flex: 1,
            valueGetter: (params) => {
                return moment(params.row?.created_at).format("DD MMM, YYYY");
            },
        },
        {
            field: "points",
            headerName: "Points Earned",
            flex: 1,
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
            <div className="xs:hidden lg:block fade-in-top fixed z-10 overflow-y-auto top-0 w-full left-0">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-black opacity-75" />
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                        &#8203;
                    </span>
                    <div
                        className="inline-block align-center  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[750px] h-full scale-in-center"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="bg-white flex flex-col items-center">
                            <span
                                onClick={() => props.setModalOpen(false)}
                                className="relative left-[20rem] mt-[17px] text-[29px] cursor-pointer text-black"
                            >
                                <RxCross1 />
                            </span>
                            <div className="lg:w-[90%] lg:mx-auto mt-6 mb-[4rem]">
                                <Box height="60vh">
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
                    </div>
                </div>
            </div>
        </>
    );
}