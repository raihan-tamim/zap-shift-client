import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
    const {parcelId} = useParams()
    const axiosSecure = useAxiosSecure();

    const {isLoading, data:parcel, } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })

    const handlePayment = async()=>{
        const parcelInfo = {
            cost : parcel.cost,
            parcelName: parcel.parcelName,
            parcelEmail: parcel.senderEmail,
            parcelId: parcel._id
        }
        const res = await axiosSecure.post('/create-checkout-session', parcelInfo);
        console.log(res.data)

        window.location.href = res.data.url;
    }

    if(isLoading){
        return <span className="loading loading-spinner text-primary loading-xl "></span>
    }

    return (
        <div className="p-10">
            <h1>Please pay ${parcel.cost} for : {parcel.parcelName} </h1>
            <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
        </div>
    );
};

export default Payment;