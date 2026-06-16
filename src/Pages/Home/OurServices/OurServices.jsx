import cardLogo from '../../../assets/service.png'

const OurServices = () => {
    return (
        <div className="bg-[#03373D] p-20 rounded-3xl">
            <h1 className="text-3xl text-white font-bold text-center">Our Services</h1>
            <p className="text-white text-center my-6">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* card -1 */}
                <div className="card bg-base-100 shadow-sm hover:bg-primary hover:scale-105 ">
                    <figure className=" px-10 pt-10">
                        <img
                            src={cardLogo}
                            alt="Shoes"
                            className="bg-gray-200 p-5 rounded-full " />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Express  & Standard Delivery</h2>
                        <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                        <div className="card-actions">
                        </div>
                    </div>
                </div>
                {/* card -2 */}
                <div className="card bg-base-100  shadow-sm hover:bg-primary hover:scale-105">
                    <figure className=" px-10 pt-10">
                        <img
                            src={cardLogo}
                            alt="Shoes"
                            className="bg-gray-200 p-5 rounded-full " />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Express  & Standard Delivery</h2>
                        <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                        <div className="card-actions">
                        </div>
                    </div>
                </div>
                {/* card -3 */}
                <div className="card bg-base-100  shadow-sm hover:bg-primary hover:scale-105">
                    <figure className=" px-10 pt-10">
                        <img
                            src={cardLogo}
                            alt="Shoes"
                            className="bg-gray-200 p-5 rounded-full " />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Express  & Standard Delivery</h2>
                        <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                        <div className="card-actions">
                        </div>
                    </div>
                </div>
                {/* card -4 */}
                <div className="card bg-base-100  shadow-sm hover:bg-primary hover:scale-105">
                    <figure className=" px-10 pt-10">
                        <img
                            src={cardLogo}
                            alt="Shoes"
                            className="bg-gray-200 p-5 rounded-full " />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Express  & Standard Delivery</h2>
                        <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                        <div className="card-actions">
                        </div>
                    </div>
                </div>
                {/* card -5 */}
                <div className="card bg-base-100  shadow-sm hover:bg-primary hover:scale-105">
                    <figure className=" px-10 pt-10">
                        <img
                            src={cardLogo}
                            alt="Shoes"
                            className="bg-gray-200 p-5 rounded-full " />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Express  & Standard Delivery</h2>
                        <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                        <div className="card-actions">
                        </div>
                    </div>
                </div>
                {/* card -6 */}
                <div className="card bg-base-100 shadow-sm hover:bg-primary hover:scale-105">
                    <figure className=" px-10 pt-10">
                        <img
                            src={cardLogo}
                            alt="Shoes"
                            className="bg-gray-200 p-5 rounded-full " />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Express  & Standard Delivery</h2>
                        <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                        <div className="card-actions">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OurServices;