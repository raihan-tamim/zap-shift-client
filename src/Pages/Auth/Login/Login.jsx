import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import SocialLogin from "../SocailLogin.jsx/SocialLogin";
import Logo from "../../../Components/Logo/Logo";


const Login = () => {
    const {signInUser} = UseAuth();
    const location = useLocation();
    const navigate =useNavigate();
    const {register, handleSubmit, formState: {errors}}= useForm();

    const onSubmit=(data)=>{
        signInUser(data.email, data.password)
        .then(()=>{
            navigate(location?.state || '/')
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 py-8">
            <Logo></Logo>
            <h2 className="text-3xl mt-5 font-bold text-center">Welcome back!</h2>
            <p className="text-center">Please login</p>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" /> 
                    {errors.email?.type === 'required' && <p className="text-red-500">Email must required</p>}
                    {/* pass */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {required: true})} className="input" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className="text-red-500">Password must required</p>}
                    <div><a className="link link-hover">Forgot password?</a>
                    <p>Don't have an account? Please <Link className="text-purple-600 font-bold " to='/register' state={location.state}>Register</Link></p>
                    </div>
                    <button className="btn btn-primary text-black mt-4">Login</button>
                </fieldset>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;