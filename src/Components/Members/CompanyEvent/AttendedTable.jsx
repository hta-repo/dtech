import React from 'react'
import { Link } from 'react-router-dom'

export default function AttendedTable() {
  return (
   
   <>
      <section   className="text-gray-600 body-font">
        <div   className="lg:container px-5 py-12 lg:mx-auto">
          <div   className="flex flex-row text-center w-full justify-center lg:gap-[55rem] xxl:gap-[44rem] xs:gap-8 mb-4">
            <h1   className="xs:text-[21px]  text-[#005125] mont-serif text-2xl title-font mb-9">
              Previously Attended
            </h1>
            <button     className="xs:h-[30px]  flex items-center lg:h-[34px] rounded-md text-[#005125] border py-2 px-8 focus:outline-none border-[#005125]">
              Filter by
            </button>
          </div>
          <div   className="lg:w-[auto] w-full mx-auto overflow-auto">
            <table   className="table-auto w-[85%] lg:mx-auto text-left whitespace-no-wrap">
              <thead>
                <tr   className="border-y-2">
                  <th   className="px-4 py-3 title-font tracking-wider   mont-serif text-[#005125] font-semibold text-sm border-y-2 rounded-tl rounded-bl"></th>

                  <th   className="px-4 py-3 title-font tracking-wider   mont-serif text-[#005125] font-semibold text-sm border-y-2 rounded-tl rounded-bl">
                   Name
                  </th>
                  <th   className="px-4 py-3 title-font tracking-wider   mont-serif text-[#005125] font-semibold text-sm border-y-2">
                  Date
                  </th>
                  <th   className="px-4 py-3 title-font tracking-wider   mont-serif text-[#005125] font-semibold text-sm border-y-2">
                   Attende
                  </th>
                  <th   className="px-4 py-3 title-font tracking-wider   mont-serif text-[#005125] font-semibold text-sm border-y-2">
                    Information
                  </th>
                  <th   className="w-10 title-font tracking-wider   mont-serif text-[#005125] font-semibold text-sm border-y-2 rounded-tr rounded-br" />
                </tr>
              </thead>
              <tbody>
                <tr   className="border-y-2">
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    <div   className="">
                      <img
                        src=""
                          className="lg:h-[41px] img-table"
                        alt=""
                      />
                    </div>
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    Confrence{" "}
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                   26 February, 2023
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    34
                  </td>
                  <td   className="px-4 py-3 mont-serif text-black lg:mr-[6rem]  xxl:mr-[6rem] ">
                 <button   className="btn-table">
                   view details
                    </button>
      </td>
                </tr>
                <tr   className="border-y-2">
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    <div   className="">
                      <img
                        src=""
                          className="lg:h-[41px] img-table"
                        alt=""
                      />
                    </div>
                  </td>

                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    Confrence{" "}
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                   26 February, 2023
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    34
                  </td>
                  <td   className="px-4 py-3 mont-serif text-black ">
                    {" "}
                    <button   className="btn-table"> view details</button>
                  </td>
                </tr>
                <tr   className="border-y-2">
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    <div   className="">
                      <img
                        src=""
                          className="lg:h-[41px] img-table"
                        alt=""
                      />
                    </div>
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    Confrence{" "}
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                   26 February, 2023
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    34
                  </td>
                  <td   className="px-4 py-3 mont-serif text-black ">
                    {" "}
                    <button   className="btn-table"> view details</button>
                  </td>
                </tr>
                <tr   className="border-y-2">
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    <div   className="">
                      <img
                        src=""
                          className="lg:h-[41px] img-table"
                        alt=""
                      />
                    </div>
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    Confrence{" "}
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                   26 February, 2023
                  </td>
                  <td   className="px-4 py-3 mont-serif text-[#005125]">
                    34
                  </td>
                  <td   className="px-4 py-3 mont-serif text-black ">
                   
                    <button   className="btn-table"> view details</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div   className="float-right mt-4 xs:hidden lg:block">
              <a   className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                view more
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                    className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          <div   className="flex mx-auto mt-2 justify-center">
     
     <Link to="/members"    >
     
          <button     className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black mx-auto justify-center">Go Back</button>
          </Link>
     
          </div>
        </div>
      </section>
   </>
  )
}
