import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from './../Pages/Dashboard/PaymentHistory/PaymentHistory';
import ApproveRider from "../Pages/Dashboard/ApproveRider/ApproveRider";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import AssignRIders from "../Pages/Dashboard/AssignRIders/AssignRIders";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Errorpage from "../Pages/Errorpage/Errorpage";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <Errorpage></Errorpage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/coverage',
                Component: Coverage,
                loader: ()=> fetch('servicecenter.json').then(res=>res.json())
            },
            {
                path: '/rider',
                element: <PrivateRoute><Rider></Rider></PrivateRoute>,
                loader: ()=> fetch('servicecenter.json').then(res=>res.json())
            },
            {
                path: '/parcel-track/:trackingId',
                element: <ParcelTrack></ParcelTrack>
            },
            {
                path: '/send-parcel',
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: ()=> fetch('servicecenter.json').then(res=>res.json())
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children:[
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children:[
            {
                index:true, 
                Component: DashboardHome
            }, 
            {
                path:'my-parcels',
                Component: MyParcels
            }, 
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancel
            },
            // riders only
            {
                path: 'assigned-deliveries',
                element: <RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>
            },
            {
                path: 'completed-deliveries',
                element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
            },
            // admin  only
            {
                path: 'approve-rider',
                element: <AdminRoute><ApproveRider></ApproveRider></AdminRoute>
            },
            {
                path: 'assign-rider',
                element: <AdminRoute><AssignRIders></AssignRIders></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            }
        ]
    }

]);