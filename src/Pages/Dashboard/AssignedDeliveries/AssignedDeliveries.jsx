import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AssignedDeliveries = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'rider-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=rider-assigned`)
            return res.data;
        }
    })

    const handleChangeDeliveryStatus = (parcel, status) => {
        const statusInfo = {
            deliveryStatus: status,
            riderId: parcel.riderId
        };
        let message = `Parcel status updated to ${status.split('-').join(' ')}`
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    return (
        <div>
            <h2 className="text-4xl font-bold">Parcels to pickup: {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Confirm</th>
                            <th>Other Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => <tr key={parcel._id}>
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>
                                {
                                    parcel.deliveryStatus === 'rider-assigned' ?
                                        <>
                                            <button onClick={() => { handleChangeDeliveryStatus(parcel, 'rider-arriving') }} className="btn btn-primary text-black">Accept</button>
                                            <button className="btn btn-warning ms-2">Reject</button>
                                        </> : <button className="btn btn-disabled text-black">Accepted</button>
                                }
                            </td>
                            <td>
                                {
                                    parcel.deliveryStatus === 'rider-assigned' ?
                                        <button className="btn btn-disabled text-black">Accept to get actions</button>
                                        : <>
                                            <button onClick={() => { handleChangeDeliveryStatus(parcel, 'parcel-picked') }} className="btn btn-primary text-black">Mark as picked-up</button>
                                            <button onClick={() => { handleChangeDeliveryStatus(parcel, 'parcel-delivered') }} className="btn btn-primary ms-2 text-black">Mark as Delivered</button>
                                        </>
                                }

                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;