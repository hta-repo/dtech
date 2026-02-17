import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center m-auto">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 text-green-700 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
