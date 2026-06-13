import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const CompletedDeliveries = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = []} = useQuery({
        queryKey: ['parcels', user.email, 'rider-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel-delivered`)
            return res.data;
        }
    })

    const calculatePayout = parcel =>{
        if(parcel.senderDistrict === parcel.receiverDistrict){
            return parcel.cost*0.80
        }else{
            return parcel.cost*0.60;
        }
    }


    return (
        <div>
            <h1 className="text-3xl font-bold">Completed Deliveries: {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>{parcel.cost}</td>
                                <td>{calculatePayout(parcel)}</td>
                                <td>
                                    <button className="btn btn-primary text-black">Cash out</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;