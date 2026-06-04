    import { Outlet } from "react-router";

    import authImg from "../assets/authImage.png"

    const AuthLayout = () => {
        return (

            <div className="flex items-center max-w-7xl mx-auto">
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
                <div className="flex-1 bg-[#FAFDF0] hidden md:block">
                    <div className="lg:h-[620px] flex justify-between items-center">
                    <img src={authImg} alt="" className=""/>
                    </div>
                </div>
            </div>

        );
    };

    export default AuthLayout;