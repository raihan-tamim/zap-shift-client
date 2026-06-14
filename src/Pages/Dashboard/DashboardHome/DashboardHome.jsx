import useRole from "../../../Hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";


const DashboardHome = () => {
    const {role, roleLoading} = useRole()


    if(roleLoading){
        return <span className="loading loading-spinner text-primary loading-xl"></span>
    }
    if(role === 'admin'){
        return <AdminDashboardHome></AdminDashboardHome>
    }
    if(role === 'rider'){
        return <RiderDashboardHome></RiderDashboardHome>
    }
    
        return <UserDashboardHome></UserDashboardHome>
};

export default DashboardHome;