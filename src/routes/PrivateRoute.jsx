import { Navigate, useLocation } from "react-router";
import UseAuth from "../Hooks/UseAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = UseAuth();
    const location = useLocation();

    if(loading){
        return <span className="loading loading-spinner text-primary loading-xl"></span>
    }

    if(!user){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    
    return children;
};

export default PrivateRoute;