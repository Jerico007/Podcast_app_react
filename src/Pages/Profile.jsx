
import NavBar from '../Components/Navbar/NavBar';
import { useSelector } from 'react-redux';

const Profile = () => {

    const {user} = useSelector(state => state.user);
    // console.log(user);
    return (
        <div>
            <NavBar/>
            {
                user && <h1 style={{textAlign:"center",color:"white",padding:"3rem"}}>Welcome {user.fullName}</h1>
            }
        </div>
    );
}

export default Profile;
