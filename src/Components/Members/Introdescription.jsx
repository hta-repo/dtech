import React, { useEffect } from 'react'

export default function Introdescription(props) {

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);

  return (
    <section className="w-[80%] mx-auto mt-7 mb-[5rem]">
      {props.detail.banner && (
        <img src={process.env.REACT_APP_API_IMAGE_URL + props.detail.banner} alt="banner" style={{ width: "100%", height: "50vh", borderRadius: "15px", objectFit: "cover" }} />

      )}
      {props.detail.description && (
        <>
          <div className="py-6 px-2">
            <h1 className="mont-serif font-semibold text-2xl text-[#005125]">
              Introduction
            </h1>
          </div>
          <div className='p-5 [#000000] mont-serif'>
            {props && (
              <div
                dangerouslySetInnerHTML={{ __html: props.detail.description }}
              />
            )}
          </div>
        </>
      )}
      {props.detail.intro && (
        <>
          <div className="py-6 px-2">
            <h1 className="mont-serif font-semibold text-2xl text-[#005125]">
              What offer
            </h1>
          </div>
          <div className='p-5 [#000000] mont-serif'>
            {props && (
              <div
                dangerouslySetInnerHTML={{ __html: props.detail.intro }}
              />
            )}
          </div>
        </>
      )}
    </section>
  )
}
