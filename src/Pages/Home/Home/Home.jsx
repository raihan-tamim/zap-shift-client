import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import HowItWorks from "../HowItworks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import Reviews from "../Reviews/Reviews";


const reviewPromise = fetch('/reviews.json').then(res=>res.json());

const Home = () => {
    return (
        <div className=" p-10">
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <Reviews reviewPromise={reviewPromise}></Reviews>
        </div>
    );
};

export default Home;