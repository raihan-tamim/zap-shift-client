
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";



const MyParcels = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })

    const handleDeleteParcel = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });}
                    })
            }
        });
    }

    const handlePayment = async(parcel) =>{
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }

        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)
        console.log(res.data)
        window.location.assign(res.data.url);
    }

    return (
        <div>
            <h1>all of my parcels: {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>
                                    {
                                        parcel.paymentStatus === 'paid' ?
                                        <span className="text-green-400 font-bold">Paid</span>
                                        : 
                                        <button onClick={()=>handlePayment(parcel)} className="btn btn-primary btn-sm text-black">Pay</button>
                                        // take to another page for payment
                                        // <Link to={`/dashboard/payment/${parcel._id}`}>
                                        // <button className="btn btn-primary btn-sm text-black">Pay</button>
                                        // </Link>
                                    }
                                </td>
                                <td>Blue</td>
                                <td>
                                    <button className="btn btn-square hover:bg-primary">
                                        <FaMagnifyingGlass />
                                    </button>
                                    <button className="btn btn-square mx-2 hover:bg-primary">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDeleteParcel(parcel._id)} className="btn btn-square hover:bg-primary">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;