import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from './../../Hooks/UseAuth';


const SendParcel = () => {
    const { register, control, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure()
    const { user } = UseAuth()
    const serviceCenters = useLoaderData();
    const navigate = useNavigate()
    const duplicateRegions = serviceCenters.map(c => c.region);
    const regions = [...new Set(duplicateRegions)]
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    const districtByRegion = region => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const handleSendParcel = data => {
        console.log(data)
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight)

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        data.cost = cost;

        Swal.fire({
            title: "Are you sure?",
            text: `You will be charged ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and continue payment!"
        }).then((result) => {
            if (result.isConfirmed) {
                // save the parcel info to db
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log(res.data)
                        if(res.data.insertedId){
                            navigate('/dashboard/my-parcels')
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Parcel has created. Please pay!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        }
                    })
            }
        });
    }

    return (
        <div className="my-15 p-15 ">
            <h1 className="text-5xl font-bold text-secondary">Send a parcel</h1>
            <h2 className="text-3xl font-bold text-secondary my-5">Enter your parcel details</h2>
            <div className="divider"></div>
            <form onSubmit={handleSubmit(handleSendParcel)}>
                {/* parcel type */}
                <div>
                    <label className="label mr-4">
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>

                {/* parcel info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-6">
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight (Kg)" />
                    </fieldset>
                </div>
                <div className="divider"></div>
                {/* two column */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-6">
                    {/* sender info */}
                    <fieldset className="fieldset ">
                        <h4 className="text-2xl font-semibold text-secondary">Sender Details</h4>
                        {/* sender name */}
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')}
                            defaultValue={user?.displayName}
                            className="input w-full" placeholder="Sender Name" />
                        {/* sender email */}
                        <label className="label">Sender email</label>
                        <input type="email" {...register('senderEmail')}
                            defaultValue={user?.email}
                            className="input w-full" placeholder="Sender email" />

                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Regions</legend>
                            <select {...register('senderRegion')} defaultValue="Pick a region" className="select w-full">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* sender district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Districts</legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a district" className="select w-full">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(senderRegion).map((r, i) => <option key={i}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* sender Address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />
                        {/* sender Phone */}
                        <label className="label mt-4">Sender Phone No</label>
                        <input type="number" {...register('senderPhone')} className="input w-full" placeholder="Sender Phone No" />
                        {/* Pickup instruction */}
                        <label className="label mt-4">Pickup instruction</label>
                        <input type="text" {...register('pickupInstruction')} className="input w-full" placeholder="Pickup instruction" />
                    </fieldset>

                    {/* receiver info */}
                    <fieldset className="fieldset ">
                        <h4 className="text-2xl font-semibold text-secondary">Receiver Details</h4>
                        {/* Receiver name */}
                        <label className="label">Receiver Name</label>
                        <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />
                        {/* receiver email */}
                        <label className="label">Sender email</label>
                        <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver email" />

                        {/* receiver region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Regions</legend>
                            <select {...register('receiverRegion')} defaultValue="Pick a region" className="select w-full">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* receiver District */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Districts</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select w-full">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(receiverRegion).map((r, i) => <option key={i}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* receiver Address */}
                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />
                        {/* receiver Phone */}
                        <label className="label mt-4">Receiver Phone No</label>
                        <input type="number" {...register('receiverPhone')} className="input w-full" placeholder="Receiver Phone No" />
                        {/* Delivery instruction */}
                        <label className="label mt-4">Delivery instruction</label>
                        <input type="text" {...register('deliveryInstruction')} className="input w-full" placeholder="Delivery instruction" />
                    </fieldset>
                </div>
                <p className="text-black font-bold my-8">* PickUp Time 4pm-7pm Approx.</p>
                {/* submit */}
                <input type="submit" className="btn btn-primary  text-black" value="Proceed to Confirm Booking" />
            </form>
        </div>
    );
};

export default SendParcel;