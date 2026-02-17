import React, { useEffect, useState } from "react";

// Api
import { get_meeting_detail } from '../../../../services/meetings.services'

import moment from 'moment';

//  Redux
import { useSelector } from "react-redux";

export default function GuestMeetingDetail() {
    const { loggedUserInfo } = useSelector((state) => state.auth);
    const [detail, setDetail] = useState(null);
    const [isCurrentDateSameOrAfter, setIsCurrentDateSameOrAfter] = useState(false);

    useEffect(() => {
        if (loggedUserInfo?.meeting_id) {
            (async () => {
                const response = await get_meeting_detail(loggedUserInfo?.meeting_id);
                setDetail(response.data)
                const endDate = moment(response.data.end_date + ' ' + response.data.end_time, 'YYYY-MM-DD HH:mm:ss');
                const currentDate = moment();
                const isGreater = currentDate.isSameOrAfter(endDate);
                setIsCurrentDateSameOrAfter(isGreater)
            })();
        }
    }, [loggedUserInfo]);

    return (
        <section className="body-font mt-8">
            <div className="container mx-auto flex flex-col justify-center items-center">
                {detail && (
                    <div className="lg:w-[50%] lg:mx-auto">
                        <h1 className="text-2xl title-font mb-4 text-[#005125] tracking-tight mont-serif font-semibold flex flex-col">
                            {detail.name}
                        </h1>
                        <p className=" text-[#424242] mb-2 leading-relaxed mont-serif">
                            {detail.description}
                        </p>
                        <div className="mt-[2rem]">
                            <ul className="flex flex-col text-[#424242] list-disc list-none">
                                <li className="list-dic text-[#424242] mont-serif mt-2">
                                    <span className="text-lg text-[#005125] mont-serif font-bold">No. of attendees:   </span>
                                    {detail.attendees_users ? detail.attendees_users?.length : 0}
                                </li>
                                <li className="list-dic text-[#424242] mont-serif mt-2">
                                    <span className="text-lg text-[#005125] mont-serif font-bold">Start Date:   </span>
                                    {moment(detail.start_date).format("DD MMM, YYYY")},  {moment(detail.start_date + ' ' + detail.start_time).format("hh:mm A")}
                                </li>
                                <li className={`list-dic mont-serif mt-2 ${isCurrentDateSameOrAfter === false ? 'text-[#424242]' : 'text-[#FF0000] font-semibold'}`}>
                                    <span className="text-lg text-[#005125] mont-serif font-bold">End Date:   </span>
                                    {moment(detail.end_date).format("DD MMM, YYYY")},  {moment(detail.end_date + ' ' + detail.end_time).format("hh:mm A")}
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
