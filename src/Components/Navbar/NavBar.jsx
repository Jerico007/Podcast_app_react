
import { NavLink } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
    return (
        <div className='NavBar' >
            
                <NavLink to={"/"}>Signup</NavLink>
                <NavLink to={"/Podcasts"}>Podcasts</NavLink>
                <NavLink to={"/StartAPodcast"}>Start A Podcast</NavLink>
                <NavLink to={"/Profile"}>Profile</NavLink>
        </div>
    );
}

export default NavBar;
