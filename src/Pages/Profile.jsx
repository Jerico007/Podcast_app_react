// Navbar component
import NavBar from "../Components/Navbar/NavBar";
// imported firebase 
import { auth } from "../firebase";
//Firebase Authentication library
import { signOut } from "firebase/auth";
// Toastify library
import { toast } from "react-toastify";
// Redux library
import { useDispatch ,useSelector} from "react-redux";
import { setUser } from "../Slices/userSlice";
// React router library
import { useNavigate } from "react-router-dom";
// Commmon Component
import Button from "../Components/Common components/Button/Button";
const Profile = () => {
  const { user } = useSelector((state) => state.user);


  //To navigate to sign in page
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handelSignOut() {
    signOut(auth)
      .then(() => {
         navigate("/");
         toast.success("Logout Success!");
         dispatch(setUser(""));
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <div className="Profile">
      <NavBar />
      {user  ? (
        <h1 style={{ textAlign: "center", color: "white", padding: "3rem" }}>
          Welcome {user.fullName}
        </h1>
      ) : ""}
      <div>{user  ? <Button text={"Logout"} className={"Logout-button"} callback={handelSignOut} /> : ""}</div>
    </div>
  );
};

export default Profile;
