import truckImg from '../../../assets/bookingIcon.png'

const HowItWorks = () => {

    return (
        <div className="p-10">
            <h1 className="text-2xl text-secondary font-bold my-4">How it works</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {/* card-1 */}
                <div className="card bg-base-100 shadow-sm ">
                    
                    <div className="card-body">
                        <img className='w-15' src={truckImg} alt="" />
                        <h2 className="card-title">Booking Pick & Drop</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                {/* card-2 */}
                <div className="card bg-base-100 shadow-sm ">
                    
                    <div className="card-body">
                        <img className='w-15' src={truckImg} alt="" />
                        <h2 className="card-title">Cash On Delivery</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                {/* card-3 */}
                <div className="card bg-base-100 shadow-sm ">
                    
                    <div className="card-body">
                        <img className='w-15' src={truckImg} alt="" />
                        <h2 className="card-title">Delivery Hub</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                {/* card-4 */}
                <div className="card bg-base-100 shadow-sm ">
                    
                    <div className="card-body">
                        <img className='w-15' src={truckImg} alt="" />
                        <h2 className="card-title">Booking SME & Corporate</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;