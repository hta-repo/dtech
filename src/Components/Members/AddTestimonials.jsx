import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

// APi
import { AddCompTestimonials } from "../../services/companies.services";

//  Loader
import Spinner from "../Spinner/Spinner";

//  Alerts
import MessageAlerts from "../MessageAlerts";

// Rating
import StarRatings from 'react-star-ratings';

const AddTestimonials = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ratingValue, setRatingValue] = useState("");

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            cmp_id: "",
            rating: "",
            review: "",
        },
        validationSchema: yup.object({
            cmp_id: yup.string(),
            rating: yup.string(),
            review: yup.string().required("This field is required"),
        }),
        onSubmit: (values) => {
            values.cmp_id = id;
            if (rating === 0) {
                setRatingValue("This field is required")
            } else {
                values.rating = rating
            }
            (async () => {
                setLoading(true)
                try {
                    const response = await AddCompTestimonials(values);
                    if (response.status) {
                        setError(true)
                        setVariant('success')
                        setMessage([response.message])
                        setLoading(false)
                        navigate(`/description/` + id);
                    }
                } catch (error) {
                    setError(true)
                    setVariant('error')
                    const err = error.response.data.errors;
                    setMessage(err)
                    setLoading(false)
                }
            })();
        },
    });

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (
        <>
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <div className="main-content flex flex-col flex-grow">
                    <div className="lg:p-10 bg-about text-center">
                        <h1 className="text-center mont-serif font-semibold text-2xl text-[#005125]">
                            Add Testimonials
                        </h1>
                    </div>
                    <div className="mb-8 mt-5">
                        <div className="lg:w-[60%] xs:w-[80%] mx-auto mb-4 xs:mt-8">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mt-6">
                                    <label className="block text-[#005125] font-bold mb-2 mont-serif">
                                        Rating
                                    </label>
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="#1F814C"
                                        starEmptyColor="gray"
                                        starHoverColor="#1F814C"
                                        changeRating={handleRatingChange}
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="35px"
                                    />
                                    {ratingValue && (
                                        <div className='text-red-500 text-sm text-left relative mt-2'>{ratingValue}</div>
                                    )}
                                </div>

                                <div className="mt-8">
                                    <label className="block text-[#005125] font-bold mb-2 mont-serif">
                                        Review
                                    </label>
                                    <textarea
                                        className="mont-serif appearance-none border border-[#007033] focus:border-indigo-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none rounded-md"
                                        rows="8"
                                        name="review"
                                        value={formik.values.review}
                                        onChange={e => {
                                            formik.setFieldValue("review", e.target.value);
                                        }}
                                    />
                                    {formik.touched.review && formik.errors.review ? (
                                        <div className='text-red-500 text-sm text-left relative mt-2'>{formik.errors.review}</div>
                                    ) : null}
                                </div>

                                <div className="flex flex-col justify-center items-center gap-2 mt-[3rem] mb-4">
                                    <button type="submit" className="btn-create mont-serif text-black">
                                        {loading ? <Spinner /> : 'Create'}
                                    </button>
                                    <button onClick={() => navigate('/members')} className="lg:w-[8rem] btn-dc border border-green-700 mont-serif text-black">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            {error && message?.length > 0 && message?.map((msg) => (
                <MessageAlerts message={msg} variant={variant} setError={setError} />
            ))
            }
        </>
    );
};

export default AddTestimonials;
