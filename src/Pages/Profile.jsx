// Navbar component
import NavBar from "../Components/Navbar/NavBar";
// imported firebase
import { auth } from "../firebase";
//Firebase Authentication library
import { signOut } from "firebase/auth";
// Toastify library
import { toast } from "react-toastify";
// Redux library
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Slices/userSlice";
// React router library
import { useNavigate } from "react-router-dom";
// Commmon Component
import Button from "../Components/Common components/Button/Button";
// Profile default image
import ProfileImage from "../assets/Image/profile.png";
const Profile = () => {
  const { user } = useSelector((state) => state.user);

  //To navigate to sign in page
  const navigate = useNavigate();

  // Redux dispatcher
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

      <div className="Profile-holder">
        <div className="Profile-content">
          {user ? (
            <div className="Profile-img-holder">
              {user.profileURL ? (
                <img className="Profile-img" src={user.profileURL} />
              ) : (
                <img className="Profile-img" src={ProfileImage} />
              )}
            </div>
          ) : (
            ""
          )}

          {user ? (
            <h1
              style={{ textAlign: "center", color: "white", padding: "3rem" }}
            >
              Welcome {user.fullName}
            </h1>
          ) : (
            ""
          )}
          <div className="Button-holder">
            {user ? (
              <Button
                text={"Logout"}
                className={"Logout-button"}
                callback={handelSignOut}
              />
            ) : (
              ""
            )}
            {
              user ? (
                <Button text={"Edit Profile"} className={"Edit-profile-button"} callback={()=>{navigate("/editProfile")}} />
              ): ""
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
