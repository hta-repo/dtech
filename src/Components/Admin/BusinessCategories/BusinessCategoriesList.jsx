import React, { useEffect, useState, useCallback } from "react";

import { useNavigate } from "react-router-dom";

// APi
import GeneralService from "../../../services/general.services";

import { Tooltip } from 'react-tooltip'

import { MdOutlineCategory } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

//  Alerts
import { SubcategoryModal } from "./SubcategoryModal";

export default function BusinessCategoriesList() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [catData, setCatData] = useState(null);
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const getCencomApprovedData = useCallback(() => {
        (async () => {
            setLoader(true)
            const paginate = "?page=" + currentPage + "&limit=" + pageSize;

            const response = await GeneralService.getAllBusinessCategories({ paginate });
            if (response.data.status) {
                setTotalRecords(response.data.data.count);
                setData(response.data.data.data)
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
        { field: "index", headerName: "#", flex: 0.5 },
        {
            field: "name",
            headerName: "Category Name",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },
        {
            headerName: "Action",
            field: "action",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <>
                        <div className="flex flex-row items-center lg:gap-[6px]">
                            <Tooltip anchorSelect=".editIcon" place="top">
                                <span style={{ fontSize: '12px' }}>Edit</span>
                            </Tooltip>
                            <Tooltip anchorSelect=".SubcategoryIcon" place="top">
                                <span style={{ fontSize: '12px' }}>View Sub Category</span>
                            </Tooltip>
                            <div className="flex flex-col items-center cursor-pointer"
                                onClick={() => {
                                    navigate("/admin/edit-business-category", { state: { data: row } })
                                }}
                            >
                                <CiEdit className="editIcon" style={{ fontSize: "22px" }} />
                            </div>
                            <div className="flex flex-col items-center cursor-pointer"
                                onClick={() => {
                                    setCatData(row)
                                    setModalOpen(true)
                                }}
                            >
                                <MdOutlineCategory className="SubcategoryIcon" style={{ fontSize: "22px" }} />
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
                            Business Categories
                        </h1>
                    </div>
                    <div className="lg:w-[70%] lg:mx-auto mt-5 mb-[2rem]">
                        <div className="flex justify-end mb-6">
                            <button className="mont-serif text-black btn-create" onClick={() => navigate('/admin/create-business-category')}>
                                Create
                            </button>
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
                <SubcategoryModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} catData={catData} />
            )}
        </>
    );
}
