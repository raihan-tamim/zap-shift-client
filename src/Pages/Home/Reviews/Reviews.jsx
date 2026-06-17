import { use } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsCard from "./ReviewsCard";


const Reviews = ({ reviewPromise }) => {
    const reviewsData = use(reviewPromise);

    return (
        <div>
            <div className="my-10">
                <h1 className="text-4xl text-secondary font-bold text-center">What our customers are sayings</h1>
                <p className="text-center my-5">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>
                <>
                    <Swiper 
                        loop={true}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={3}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: '50%',
                            scale: 1,
                            depth: 200,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[EffectCoverflow, Autoplay]}
                        className="mySwiper"
                    >
                        <div className="">
                            {
                            reviewsData.map(reviews => <SwiperSlide key={reviews.id}>
                                <ReviewsCard reviews={reviews}></ReviewsCard>
                            </SwiperSlide>)
                        }
                        </div>
                    </Swiper>
                </>
            </div>
        </div>
    );
};

export default Reviews;