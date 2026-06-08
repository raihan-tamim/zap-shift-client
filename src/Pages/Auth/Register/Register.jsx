import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocailLogin.jsx/SocialLogin";
import Logo from "../../../Components/Logo/Logo";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Register = () => {
    const { createUser, updateUserProfile } = UseAuth();
    const location = useLocation()
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleRegister = (data) => {
        const profileImg = data.photo[0];
        createUser(data.email, data.password)
            .then(() => {

                // store the user image in form data
                const formData = new FormData();
                formData.append('image', profileImg)

                // send the photo to store and get the url
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                        .then(res=>{
                            if(res.data.insertedId){
                                console.log('user created in the database')
                            }
                        })

                        // update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile  updated');
                                navigate(location?.state || '/')
                            })
                            .catch(err => console.log(err))

                    })
            }).catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 py-8">
            <Logo></Logo>
            <h2 className="text-3xl mt-5 font-bold text-center">Create an account !</h2>
            <p className="text-center">Please Register</p>
            <form onSubmit={handleSubmit(handleRegister)} className="card-body">
                <fieldset className="fieldset">
                    {/* Photo */}
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input file-input-md" placeholder="" />
                    {errors.photo?.type === 'required' && <p className="text-red-500">Photo must required</p>}
                    {/* Name */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className="text-red-500">Name must required</p>}
                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className="text-red-500">Email must required</p>}

                    {/* pass */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
                    })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className="text-red-500">Password must required</p>
                    }
                    {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be at least 6 character </p>}
                    {errors.password?.type === 'pattern' && <p className="text-red-500">Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character! </p>}

                    <p>Already have an account? Please <Link className="text-purple-600 font-bold" to='/login' state={location.state}>Login</Link></p>
                    <button className="btn  btn-primary text-black mt-4">Register</button>
                </fieldset>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;