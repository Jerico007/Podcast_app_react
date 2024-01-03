import "./Form.css";

// React-router-dom library
import { useNavigate } from "react-router-dom";

// React library
import { useReducer } from "react";

// Redux library
import { setUser } from "../../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

// Firebase library
import { auth, storage, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Common Component
import Button from "../Common components/Button/Button";
import FileInput from "../Common components/File Input/FileInput";

// React toastify library
import { toast } from "react-toastify";

const Form = () => {
  // Redux dispatch
  const dispatch = useDispatch();

  // Redux state
  const { user } = useSelector((state) => state.user);

  // Navigate
  const Navigate = useNavigate();

  //useReducer to handel form state
  const [formState, formDispatch] = useReducer(formReducer, {
    profileImage: "",
    loading: false,
  });

  //   Validate form
  async function validateForm() {
    if (formState.profileImage === "") {
      toast.error("Please select a profile image");
      return;
    }

    try {
      formDispatch({ type: "LOADING", payLoad: true });
      //Storing the user profile in storage
      const profileImgRef = ref(
        storage,
        `images/profile_images/${auth.currentUser.uid}/${Date.now()}`
      );

      // uploading the profile image
      await uploadBytes(profileImgRef, formState.profileImage);

      // Downloading the profile image URL
      const profileURL = await getDownloadURL(profileImgRef);

      // Updating the user profile image in database
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        profileURL: profileURL,
      });

      // Storing the data in redux store
      dispatch(setUser({ ...user, profileURL: profileURL }));

      // Showing success message
      formDispatch({ type: "SUCCESS" });
      toast.success("Profile Pic updated successfully");
      //   Navigate to profile
      Navigate("/profile");
    } catch (e) {
      formDispatch({ type: "LOADING", payLoad: false });
      toast.error(e.message);
    }
  }

  //   Function to handleSubmit
  function handleSubmit(e) {
    e.preventDefault();
    if (formState.loading) {
      return;
    }
    validateForm();
  }

  //   Form Reducer function
  function formReducer(state, action) {
    if (action.type === "PROFILE") {
      return { ...state, profileImage: action.payLoad };
    } else if (action.type === "LOADING") {
      return { ...state, loading: action.payLoad };
    } else if (action.type === "SUCCESS") {
      return { ...state, loading: false, profileImage: "" };
    }
    return state;
  }

  return (
    <div className="Form">
      <h1>Edit profile picture</h1>
      <form onSubmit={handleSubmit}>
        <FileInput
          id={"Profile-img"}
          name={"Profile"}
          accept={"image/*"}
          callback={formDispatch}
        ></FileInput>
        {!formState.loading ? (
          <Button type={"submit"} text={"Change now"} />
        ) : (
          <Button
            type={"button"}
            className={"Loading"}
            text={"L O A D I N G . . ."}
          />
        )}
      </form>
    </div>
  );
};

export default Form;
