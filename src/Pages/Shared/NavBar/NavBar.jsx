import { Link, NavLink} from "react-router";
import Logo from "../../../Components/Logo/Logo";
import UseAuth from "../../../Hooks/UseAuth";


const NavBar = () => {
    const {logOut, user}=UseAuth();
    const links = <>
    <li><NavLink to='/'>Services</NavLink></li>
    <li><NavLink to='/coverage'>Coverage</NavLink></li>
    <li><NavLink to='/send-parcel'>Send Parcel</NavLink></li>
    
    {
        user && <>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        </>
    }
    <li><NavLink to='/about-us'>About Us</NavLink></li>

    </>

    const handleLogout=()=>{
        logOut()
        .then(()=>{
            console.log('logged out')
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="navbar bg-base-100 shadow-sm rounded-xl w-4/5 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <span className="btn btn-ghost text-xl"><Logo></Logo></span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user? <button onClick={handleLogout} className="btn">Logout</button> :
                    <Link to='/login'  className="btn">Login</Link>
                }
                <Link to='/rider' className="btn btn-primary text-black ml-4">Be a rider</Link>
            </div>
        </div>
    );
};

export default NavBar;