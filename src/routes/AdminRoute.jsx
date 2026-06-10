
import UseAuth from "../Hooks/UseAuth";
import useRole from "../Hooks/useRole";


const AdminRoute = ({children}) => {
    const {loading} = UseAuth();
    const {role, roleLoading} = useRole()

    if(loading || roleLoading){
        return <span className="loading loading-spinner text-secondary loading-xl"></span>
    }

    if(role !== 'admin'){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-5xl font-bold text-secondary">
                    Forbidden Access
                </p>
            </div>
        );
    }
    return children;
};

export default AdminRoute;