import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Faq from "../FAQ/Faq";
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
            <Faq></Faq>
        </div>
    );
};

export default Home;