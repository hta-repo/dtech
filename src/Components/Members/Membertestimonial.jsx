import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// Default Image
import DefaultImage from "../../assets/defaultImage.png"

// APi
import { GetCompanyTestimonials } from "../../services/companies.services";

// Rating
import StarRatings from 'react-star-ratings';

//  Loader
import Spinner from "../Spinner/Spinner";

export default function Membertestimonial() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loadDetail, setLoadDetail] = useState(false);

  const scrollLeft = () => {
    document.getElementById("testimonal_id").scrollLeft -= 400;
  };
  const scrollRight = () => {
    document.getElementById("testimonal_id").scrollLeft += 400;
  };

  const getCompDetail = useCallback((id) => {
    (async () => {
      setLoadDetail(true)
      const paginate = "?page=1&limit=20"
      const response = await GetCompanyTestimonials({ id, paginate });
      if (response.status) {
        setDetail(response.data.data)
      }
      setLoadDetail(false)
    })();
  }, []);

  useEffect(() => {
    if (id) {
      getCompDetail(id);
    }
  }, [id, getCompDetail])

  return (
    <>
      <div className="relative lg:w-[135vh] xs:w-[48vh] lg:h-[auto] lg:mx-auto mb-[4rem]">
        <div className="flex justify-end">
          <div className="mont-serif text-center btn-create font-semibold text-[#005125] mt-5 cursor-pointer" onClick={() => navigate('/add-testimonials/' + id)}>
            Add Testimonial
          </div>
        </div>
        {loadDetail ? (
          <div className="flex justify-center my-10">
            <Spinner />
          </div>
        ) : (
          <>
            {detail.length > 0 ? (
              <>
                <div className="absolute w-full flex flex-row justify-end lg:justify-between right-0 lg:mt-[200px] lg:flex lg:gap-[9rem]">
                  <button
                    onClick={scrollLeft}
                    className="lg:w-[33px] relative lg:top-[56px] lg:right-[70px] xxl:right-[80px] lg:h-[4rem] p-2 m-2 rounded-full carousel-bg"
                  >
                    <FiChevronLeft className="relative text-white" />
                  </button>
                  <button
                    onClick={scrollRight}
                    className="lg:w-[33px] relative lg:top-[56px] lg:h-[4rem] p-2 m-2 rounded-full carousel-bg lg:left-[90px] xxl:left-[73px]"
                  >
                    <FiChevronRight className="relative text-white" />
                  </button>
                </div>

                <div
                  id="testimonal_id"
                  className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth scrollbar-hide lg:h-[auto]"
                >
                  {detail.map((item, index) => (
                    <div className="carousel-card lg:ml-[-18px]" key={index}>
                      <div className="p-4 lg:w-[390px]  xxl:w-[349px]">
                        <div className="image flex justify-center relative lg:top-[4.25rem]">
                          <img
                            src={item.user?.avatar ? process.env.REACT_APP_API_IMAGE_URL + item.user?.avatar : DefaultImage}
                            className="relative z-30 inline lg:w-[100px] lg:h-[100px] border-2 border-white rounded-[103.5px] xxl:h-[100px]"
                            alt=""
                          />
                        </div>
                        <div className="lg:h-[290px] xs:h-max bg-gray-900 bg-opacity-75 px-8 pt-[2rem] pb-24 rounded-lg overflow-hidden text-center relative intrest-card h-[137px] team-card">
                          <h4 className="text-[#005125] mont-serif font-extrabold text-center relative mt-[50px]">
                            {item.user?.name}
                          </h4>
                          <div className="rating-star mt-2">
                            <div className="flex justify-center">
                              <StarRatings
                                rating={Math.ceil(item.rating)}
                                starRatedColor="#1F814C"
                                starEmptyColor="gray"
                                starHoverColor="#1F814C"
                                isSelectable={false}
                                numberOfStars={Math.ceil(item.rating)}
                                name='rating'
                                starDimension="20px"
                                starSpacing="2px"
                              />
                            </div>
                          </div>
                          <div className="decription p-[7px] mt-[12px]">
                            <p className="mont-serif text-[#424242] text-left lg:text-[14px] xxl:text-[12px]">
                              {item.review}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="m-[2rem]">No Testimonials Found</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
