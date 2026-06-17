import { Navigate, useLocation } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import LoadingPage from "../Components/Loading/LoadingPage";


const PrivateRoute = ({children}) => {
    const {user, loading} = UseAuth();
    const location = useLocation();

    if(loading){
        return <LoadingPage></LoadingPage>
    }

    if(!user){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    
    return children;
};

export default PrivateRoute;