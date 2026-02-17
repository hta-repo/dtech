import React, { useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";

//  Api
import { get_roster_testimonials } from "../../../services/roaster.services";

//  Image
import DefaultImage from "../../../assets/defaultImage.png"

// Rating
import StarRatings from 'react-star-ratings';

function RoastTestimonials() {
    const [roasterTestimonials, setRoasterTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRoasterTestimonials = useCallback(() => {
        (async () => {
            setLoading(true)
            const response = await get_roster_testimonials("?page=1&limit=20");
            if (response.status) {
                setRoasterTestimonials(response.data.data)
            }
            setLoading(false)
        })();
    }, []);

    useEffect(() => {
        getRoasterTestimonials();
    }, [getRoasterTestimonials])

    return (
        <div className="lg:container lg:mx-auto">
            <div className="lg:w-[80%] mx-auto overflow-auto">
                {loading ? (
                    <div className="mt-[3rem]">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                            {roasterTestimonials.map((item, index) => (
                                <div className="p-2" key={index}>
                                    <div className="image flex justify-center relative top-[4.25rem]">
                                        <img
                                            src={item.user?.avatar ? process.env.REACT_APP_API_IMAGE_URL + item.user?.avatar : DefaultImage}
                                            className="relative z-30 inline w-[100px] h-[100px] border-2 border-white rounded-[103.5px]"
                                            alt=""
                                        />
                                    </div>
                                    <div className="xs:h-max bg-gray-900 bg-opacity-75 px-5 pt-[2rem] rounded-lg overflow-hidden text-center relative intrest-card team-card">
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
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="20px"
                                                    starSpacing="2px"
                                                />
                                            </div>
                                        </div>
                                        <div className="decription h-[110px] my-[20px] overflow-auto">
                                            <p className="mont-serif text-[#424242] text-[14px] text-left">
                                                {item.review}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="button mx-auto flex justify-center mt-8 xxl:mb-16">
                <Link to="/league">
                    <button className="lg:w-[10rem] btn-dc border border-green-700 mont-serif text-black mx-auto ">
                        Go Back
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default RoastTestimonials;
