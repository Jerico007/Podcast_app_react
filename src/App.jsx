import { Routes,Route } from "react-router-dom";

import Signup from "./Pages/Signup";

import Podcasts from "./Pages/Podcasts";

import StartAPodcast from "./Pages/StartAPodcast";

import Profile from "./Pages/Profile";
function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Signup/>}></Route>
      <Route path="/podcasts" element={<Podcasts/>}></Route>
      <Route path="/startAPodcast" element={<StartAPodcast/>}></Route>
      <Route path="/Profile" element={<Profile/>}></Route>
    </Routes>
    </>
  )
}

export default App
