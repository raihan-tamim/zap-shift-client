import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    const [paymentInfo, setPaymentInfo] = useState({})

    useEffect(()=>{
        axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data)
            setPaymentInfo({
                trackingId: res.data.trackingId,
                transactionId: res.data.transactionId
            })
        })
    },[sessionId, axiosSecure])
    return (
        <div>
            <h1 className='text-5xl font bold'>Payment Successful</h1>
            <p>Your transactionId: {paymentInfo.transactionId}</p>
            <p>Your parcel Tracking id: {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;