import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaRegTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";


const ApproveRider = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const {refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders')
            return res.data;
        }
    })

    const updateUser = (rider, status) => {
        const updateInfo = {
            status: status,
            email: rider.riderEmail
        }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: `Rider has been ${status}!`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApprove = rider => {
        updateUser(rider, 'approved')
    }

    const handleReject = (rider) => {
        updateUser(rider, 'rejected')
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-secondary">Request pending for approval: {riders.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.riderName}</td>
                                <td>{rider.riderEmail}</td>
                                <td>{rider.riderDistrict}</td>
                                <td className={`${rider.status === 'approved' ? 'text-green-400 font-semibold' : 'text-red-500 font-semibold'}`}>
                                    {rider.status}
                                </td>
                                <td className="space-x-2">
                                    <button onClick={() => handleApprove(rider)} className="btn btn-sm hover:bg-primary">
                                        <FaUserCheck />
                                    </button>
                                    <button onClick={() => handleReject(rider)} className="btn btn-sm hover:bg-red-400">
                                        <IoPersonRemoveSharp />
                                    </button>
                                    <button className="btn btn-sm hover:bg-red-700">
                                        <FaRegTrashAlt />
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

export default ApproveRider;