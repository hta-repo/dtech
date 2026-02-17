
import React, { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";

import AdminMeetingCarousel from "../AdminMeetingCarousel";

// Api
import {
    // GetAllCencomPendingMeetings,
    GetAllCencomApprovedMeetings
} from "../../../services/cencom/cencomGeneral.services"

function AdminMeetingmain() {

    // const [cencomPendingMeetings, setCencomPendingMeetings] = useState([]);
    // const [loadCencomPendingMeetings, setLoadCencomPendingMeetings] = useState(false);

    const [cencomApprovedMeetings, setCencomApprovedMeetings] = useState([]);
    const [loadCencomApprovedMeetings, setLoadCencomApprovedMeetings] = useState(false);

    // const getCencomPendingMeetings = useCallback(() => {
    //     (async () => {
    //         setLoadCencomPendingMeetings(true)
    //         const status = "?status=0";
    //         const paginate = "&page=1&limit=20"

    //         const response = await GetAllCencomPendingMeetings({ status, paginate });
    //         if (response.status) {
    //             setCencomPendingMeetings(response.data.data)
    //         }
    //         setLoadCencomPendingMeetings(false)
    //     })();
    // }, []);

    const getCencomApprovedMeetings = useCallback(() => {
        (async () => {
            setLoadCencomApprovedMeetings(true)
            const status = "?status=1";
            const paginate = "&page=1&limit=20"

            const response = await GetAllCencomApprovedMeetings({ status, paginate });
            if (response.status) {
                setCencomApprovedMeetings(response.data.data)
            }
            setLoadCencomApprovedMeetings(false)
        })();
    }, []);

    useEffect(() => {
        getCencomApprovedMeetings();
    }, [getCencomApprovedMeetings])

    return (
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
            <div className="main-content flex flex-col flex-grow">
                <div className="lg:p-10 bg-about text-center">
                    <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px] ">
                        Meetings
                    </h1>
                </div>
                <div className="lg:w-[145vh] lg:mx-auto my-7">
                    {/* <div className="flex justify-end">
                        <div className="mont-serif text-black btn-create text-center mb-6" style={{ width: "250px" }}>
                            <Link to="/admin/create-meeting">
                                Create Recurring Meeting
                            </Link>
                        </div>
                    </div>
                    <div className="mt-5">
                        <AdminMeetingCarousel title="Meeting Request Pending" id="pending_slider" carouselArray={cencomPendingMeetings} loadSpinner={loadCencomPendingMeetings} isPending={true} />
                    </div> */}
                    <div className="mt-5">
                        <AdminMeetingCarousel title="10X Summary" id="approved_slider" className="mt-10" carouselArray={cencomApprovedMeetings} loadSpinner={loadCencomApprovedMeetings} isPending={false} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminMeetingmain;
