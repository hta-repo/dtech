import React from 'react'

export default function Loader() {
  return (
    <>
<div className="flex items-center justify-center mx-auto">
  <div
    className=" animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-green-700 rounded-full"
    role="status"
    aria-label="loading"
  >
   
  </div>
  </div>

    </>
  )
}
