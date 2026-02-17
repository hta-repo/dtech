
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Icon
import { RxCross1 } from "react-icons/rx";
import { MdOutlineCategory } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { Tooltip } from 'react-tooltip'

// Api
// import GeneralService from '../../../services/general.services'
import { AllBussinessSubCategories } from '../../../services/cencom/businessCategory.services'

//  Material ui
import { Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export function SubcategoryModal(props) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [subCatData, setSubCatData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);

    // console.log(props, 'props subcategory')

    useEffect(() => {
        (async () => {
            setLoader(true);
            const id = subCatData ? subCatData.id : props.catData.id;
            const paginate = "?page=" + currentPage + "&limit=" + pageSize;

            const response = await AllBussinessSubCategories({ id, paginate });
            if (response.status) {
                setTotalRecords(response.data.count);
                setData(response.data.data)
              }
            setLoader(false);
        })();
    }, [props, subCatData, currentPage, pageSize]);

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
            headerName: "SubCategory Name",
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
                            <Tooltip anchorSelect=".SubcategoryIcon" place="top">
                                <span style={{ fontSize: '12px' }}>Create Sub Category</span>
                            </Tooltip>
                            <Tooltip anchorSelect=".editIcon" place="top">
                                <span style={{ fontSize: '12px' }}>Edit</span>
                            </Tooltip>
                            <div className="flex flex-col items-center cursor-pointer"
                                onClick={() => {
                                    navigate("/admin/edit-business-subcategory", { state: { data: row } })
                                }}
                            >
                                <CiEdit className="editIcon" style={{ fontSize: "22px" }} />
                            </div>
                            {!subCatData && (
                                <div className="flex flex-col items-center cursor-pointer"
                                    onClick={() => {
                                        setSubCatData(row)
                                    }}
                                >
                                    <MdOutlineCategory className="SubcategoryIcon" style={{ fontSize: "22px" }} />
                                </div>
                            )}
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
                            <div className="flex justify-end mt-3 mb-1">
                                <button className="mont-serif text-black btn-create"
                                    onClick={() => {
                                        navigate("/admin/create-business-subcategory", { state: { data: subCatData ? subCatData : props.catData } })
                                    }}
                                >
                                    Create Subcategory
                                </button>
                            </div>
                            <div className="lg:w-[90%] lg:mx-auto mt-4 mb-[4rem]">
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
