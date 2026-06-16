import { Outlet } from "react-router";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";

;

const RootLayout = () => {
    return (
        <div className="max-w-7xl mx-auto bg-base-300">
            <div className="px-10 pt-6"><NavBar></NavBar></div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;