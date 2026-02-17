import React, { useEffect, useState, useCallback } from "react";

import AdminCarousel from "../AdminCarousel";

// Api
import {
  getAllCencomPendingEvents,
  getAllCencomApprovedEvents
} from "../../../services/cencom/cencomGeneral.services"

function AdminEventmain() {

  const [cencomPendingEvents, setCencomPendingEvents] = useState([]);
  const [loadCencomPendingEvents, setLoadCencomPendingEvents] = useState(false);

  const [cencomApprovedEvents, setCencomApprovedEvents] = useState([]);
  const [loadCencomApprovedEvents, setLoadCencomApprovedEvents] = useState(false);

  const getCencomPendingEvents = useCallback(() => {
    (async () => {
      setLoadCencomPendingEvents(true)
      const status = "?status=0";
      const paginate = "&page=1&limit=20"

      const response = await getAllCencomPendingEvents({ status, paginate });
      if (response.status) {
        setCencomPendingEvents(response.data.data)
      }
      setLoadCencomPendingEvents(false)
    })();
  }, []);

  const getCencomApprovedEvents = useCallback(() => {
    (async () => {
      setLoadCencomApprovedEvents(true)
      const status = "?status=1";
      const paginate = "&page=1&limit=20"

      const response = await getAllCencomApprovedEvents({ status, paginate });
      if (response.status) {
        setCencomApprovedEvents(response.data.data)
      }
      setLoadCencomApprovedEvents(false)
    })();
  }, []);

  useEffect(() => {
    getCencomPendingEvents();
    getCencomApprovedEvents();
  }, [getCencomPendingEvents, getCencomApprovedEvents])

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:p-10 bg-about text-center">
          <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125] xs:p-[21px] xs:mt-[3px] ">
            Events
          </h1>
        </div>
        <div className="lg:w-[145vh] lg:mx-auto my-5">
          <div className="mt-5">
            <AdminCarousel title="Event Request Pending" id="pending_slider" carouselArray={cencomPendingEvents} loadSpinner={loadCencomPendingEvents} isPending={true} />
          </div>
          <div className="mt-5">
            <AdminCarousel title="Approved Events" id="approved_slider" className="mt-10" carouselArray={cencomApprovedEvents} loadSpinner={loadCencomApprovedEvents} isPending={false} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminEventmain;
