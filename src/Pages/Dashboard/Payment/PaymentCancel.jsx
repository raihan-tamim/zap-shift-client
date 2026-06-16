import { Link } from "react-router";


const PaymentCancel = () => {
    
    return (
        <div>
            <h1 className='text-5xl font bold'>Payment cancelled</h1>
            <Link to='/dashboard/my-parcels'>
            <button className="btn btn-primary text-black">Try again</button>
            </Link>
        </div>
    );
};

export default PaymentCancel;