import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/banner/banner1.png'
import bannerImg2 from '../../../assets/banner/banner2.png'
import bannerImg3 from '../../../assets/banner/banner3.png'
import { Link } from "react-router";

const Banner = () => {
    return (
        <div>
            <Carousel className="relative"
                autoPlay={true}
                infiniteLoop={true}
                interval={2000}
            >
                <div>
                    <img src={bannerImg1} />

                </div>
                <div>
                    <img src={bannerImg2} />
                </div>
                <div>
                    <img src={bannerImg3} />
                </div>
            </Carousel>
            <div className="absolute bottom-85 left-100 hidden lg:block">
                <Link to='/dashboard/my-parcels' className="btn btn-primary rounded-full text-black ">My parcels</Link>
                <Link to='/rider' className="btn rounded-xl text-black ml-4">Be a rider</Link>
            </div>

        </div>
    );
};

export default Banner;