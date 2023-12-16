import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Navigate ,Outlet } from 'react-router-dom';
import {toast} from "react-toastify"
import "./PrivateRoute.css";
const PrivateRoute = () => {
    const [user, loading, error] = useAuthState(auth);
  
    if(loading)
    {
        return <div className='body'>
            <div className='loading'></div>
        </div>;
    }
    if(error || !user)
    {
        toast.error("Please Signup or Login");
       return <Navigate to="/" replace></Navigate>
    } 
    return <Outlet></Outlet>
}

export default PrivateRoute;
