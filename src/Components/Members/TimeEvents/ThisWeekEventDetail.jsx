import React, { useEffect } from "react";


export default function ThisWeekEventDetail({ event, onClear }) {
  useEffect(() => {

    window.scrollTo(0, 0);
  }, []);
  return (
    <>

   
    <div className=" z-10  absolute  bg-[#f0f8ff] right-[-8%]  shadow-md rounded-md  w-[50%]  mx-auto fade-in-top fade-in-left   top-[4rem]  left-[3rem]  ">

<button     onClick={onClear}  className=" text-black font-all mont-serif  relative top-[-3rem] gap-[6px] flex flex-row items-center bg-[#f0f8ff] p-[15px]"> <p> &#x2190;</p>  Go back  </button>



<div className="--event-image bg-[#f0f8ff]">
 <img  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" className="mx-auto rounded-md shaodw-md drop-shadow h-[17rem] " alt="" />
</div>

<div className="event-details p-6 bg-[#f0f8ff shadow-md">
<table className="w-full  border-gray-300 rounded-md">
  <tbody>
    <tr className="border-b border-gray-300">
      <td   className="font-all mont-serif font-semibold pr-4 py-2">Event Name:</td>
      <td className="py-2">{event.EventName}</td>
    </tr>
    <tr className="border-b border-gray-300">
      <td className="font-all mont-serif font-semibold  pr-4 py-2">Email:</td>
      <td className="font-all mont-serif py-2">{event.EmailAddress}</td>
    </tr>
    <tr className="font-all mont-serif font-semibold  border-gray-300">
      <td className="font-all mont-serif font-semibold pr-4 py-2">Description:</td>
      <td className="font-all mont-serif py-2">{event.Description}</td>
    </tr>
    <tr className="border-b border-gray-300">
      <td className="font-all mont-serif font-semibold  pr-4 py-2">Event Date:</td>
      <td className="font-all mont-serif py-2">{event.EventDate}</td>
    </tr>
    <tr className="border-b border-gray-300">
      <td className="font-bold pr-4 py-2">Time:</td>
      <td className="font-all mont-serif py-2">
        {event.FromTime} - {event.ToTime}
      </td>
    </tr>
    {/* You can add more rows here */}
  </tbody>
</table>

</div>

    </div>
    </>
  );
}
