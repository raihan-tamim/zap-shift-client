import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import { useLoaderData } from "react-router";
import riderImg from "../../assets/agent-pending.png"
import Swal from "sweetalert2";


const Rider = () => {
    const { register, control, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure()
    const { user } = UseAuth()
    const serviceCenters = useLoaderData();

    const duplicateRegions = serviceCenters.map(c => c.region);
    const regions = [...new Set(duplicateRegions)]
    const riderRegion = useWatch({ control, name: 'riderRegion' })

    const districtByRegion = region => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const handleRegisterRider = data => {
        console.log(data)
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You submitted successfully. Please wait 14 days until checking complete!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div className="p-8">
            <h1 className="text-5xl font-bold text-secondary">Be a Rider</h1>
            <p className="text-gray-500 w-2/3 my-4">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <form onSubmit={handleSubmit(handleRegisterRider)}>
                {/* two column */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-6">
                    {/* sender info */}
                    <fieldset className="fieldset ">
                        <h4 className="text-3xl font-semibold text-secondary">Tell us about yourself</h4>
                        {/*  name */}
                        <label className="label">Rider Name</label>
                        <input type="text" {...register('riderName')}
                            defaultValue={user?.displayName}
                            className="input w-full" placeholder="Rider Name" />
                        {/* email */}
                        <label className="label">Rider email</label>
                        <input type="email" {...register('riderEmail')}
                            defaultValue={user?.email}
                            className="input w-full" placeholder="Rider email" />
                        {/* Driving License Number*/}
                        <label className="label mt-4">Driving License Number</label>
                        <input type="number" {...register('licenseNo')} className="input w-full" placeholder="Driving License Number" />

                        {/*region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Regions</legend>
                            <select {...register('riderRegion')} defaultValue="Pick a region" className="select w-full">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Districts</legend>
                            <select {...register('riderDistrict')} defaultValue="Pick a district" className="select w-full">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(riderRegion).map((r, i) => <option key={i}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/*Address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />
                        {/* NID */}
                        <label className="label mt-4">NID No</label>
                        <input type="number" {...register('nid')} className="input w-full" placeholder="Rider NID No" />
                        {/* Phone */}
                        <label className="label mt-4">Rider Phone No</label>
                        <input type="number" {...register('riderPhone')} className="input w-full" placeholder="Rider Phone No" />
                        {/* Bike */}
                        <label className="label mt-4">Bike brand and year</label>
                        <input type="text" {...register('bikeInfo')} className="input w-full" placeholder="Bike brand and year" />
                        {/* Phone */}
                        <label className="label mt-4">Bike Registration Number</label>
                        <input type="number" {...register('regNumber')} className="input w-full" placeholder="Bike Registration Number" />
                        {/* Delivery instruction */}
                        <label className="label mt-4">Tell Us About Yourself</label>
                        <input type="text" {...register('riderBio')} className="input w-full" placeholder="Tell Us About Yourself" />

                    </fieldset>

                    {/* logo*/}
                    <div className="">
                        <img src={riderImg} alt="" />
                    </div>
                </div>
                <p className="text-black font-bold my-8">* PickUp Time 4pm-7pm Approx.</p>
                {/* submit */}
                <input type="submit" className="btn btn-primary  text-black" value="Submit your information" />
            </form>
        </div>
    );
};

export default Rider;