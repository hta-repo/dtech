import React from "react";

import banner from "../Components/Aboutus/banner-a.png";
import Ourteam from "../Components/Aboutus/Ourteam";

export default function Aboutus() {
  return (
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div className="main-content flex flex-col flex-grow">
          <div className="lg:p-10 bg-about text-center">
            <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]	xs:mt-[5px] xs:p-[21px] ">
              About Us
            </h1>
          </div>
          <div className="text-gray-600 ">
            <div className="lg:container lg:px-5 py-8 mx-auto">
              <div className=" w-[89%] mx-auto text-center">
                <h1 className="mont-serif text-[#005125] font-semibold text-2xl mb-4">
                Our Vision
              </h1>
                <p className="leading-relaxed text-lg">
                  Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut interdum tellus elit sed risus.
                  Maecenas eget condimentum velit, sit amet feugiat lectus.
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Praesent auctor rhoncus ex.
                  Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut interdum tellus elit sed risus.
                </p>
              </div>
            </div>
          </div>
          <Ourteam />
          <div className="mb-8">
            <section className=" body-font">
              <h1 className="text-2xl title-font mb-4 text-[#005125] tracking-tight text-center mont-serif font-semibold flex flex-col">
                OUR Community
              </h1>
              <div className="lg:container mx-auto flex flex-col justify-center items-center">
                <img
                  className="lg:w-[1110px] lg:h-[439px] md:w-3/6 w-5/6 mb-10  object-center rounded"
                  src={banner}
                  alt=""
                />
                <div className="lg:w-[86%] xs:w-[80%] lg:mx-auto">
                  <p className="mb-2 leading-relaxed mont-serif">
                    Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                    turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
                    nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
                    tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                    feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                  </p>

                  <p className="mt-2 leading-relaxed mont-serif">
                    Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                    turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
                    nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
                    tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                    feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                  </p>

                  <p className=" mb-6 mt-2 leading-relaxed mont-serif">
                    Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                    turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
                    nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
                    tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                    feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
  );
}
