import NavBar from "../Components/Navbar/NavBar";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button/Button";
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
      <div>{user  ? <Button text={"Logout"} callback={handelSignOut} /> : ""}</div>
    </div>
  );
};

export default Profile;
