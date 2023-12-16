import { Routes, Route } from "react-router-dom";

import Signup from "./Pages/Signup";

import Podcasts from "./Pages/Podcasts";

import StartAPodcast from "./Pages/StartAPodcast";

import { useEffect } from "react";

import Profile from "./Pages/Profile";

import { useDispatch } from "react-redux";

import { auth, db } from "./firebase";

import { onAuthStateChanged } from "firebase/auth";

import { ToastContainer,toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { doc, getDoc } from "firebase/firestore";

import { setUser } from "./Slices/userSlice";

import PrivateRoute from "./Components/Private Route/PrivateRoute";
function App() {
  const dispatch = useDispatch();

  //useEffect to authorize user if already authorized
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            // console.log(docSnap.data());
            const docData = docSnap.data();
            dispatch(
              setUser({
                fullName: docData.fullName,
                email: docData.email,
                uid: docData.uid,
              })
            );
          }
        });
      } else {
        // No user is signed in.
        toast.success("Welcome Anonymous");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/podcasts" element={<Podcasts />}></Route>
          <Route path="/startAPodcast" element={<StartAPodcast />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
