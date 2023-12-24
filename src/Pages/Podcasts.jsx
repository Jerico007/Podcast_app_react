// React library
import { useEffect } from "react";
// Navbar component
import NavBar from "../Components/Navbar/NavBar";
// Commmon component
import Input from "../Components/Common components/Input/Input";
// Firebase library component
import { onSnapshot, collection } from "firebase/firestore";
// imported firebase file
import { db } from "../firebase";
// Redux slice
import { setPodcasts, setFilterPodcasts } from "../Slices/podcastsSilce";

// React redux
import { useDispatch, useSelector } from "react-redux";
// Podcast Card
import PodcastCard from "../Components/Podcast Card/PodcastCard";

const Podcasts = () => {
  // dispatch
  const dispatch = useDispatch();
  // podcasts Array
  const { podcasts, filterPodcasts } = useSelector((state) => state.podcasts);

  // Getting the list of podcasts that are currently available
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Podcast"), (snapshot) => {
      const podcasts = [];
      snapshot.forEach((doc) => {
        podcasts.push(doc.data());
      });
      dispatch(setPodcasts(podcasts));
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  //   Function to search for podcast
  function handelSearch(e) {
    if (e.target.value === "") {
      dispatch(setFilterPodcasts([]));
    }
    // Filtering out the podcast
    let newArray = podcasts.filter(
      (val) =>
        val.title.toLowerCase().substring(0, e.target.value.length) ===
        e.target.value.toLowerCase()
    );
    dispatch(setFilterPodcasts(newArray));
  }

  //   console.log(podcasts);
  return (
    <div className="Podcasts">
      <NavBar />
      <div className="Podcasts-holder">
        <h1 className="Podcasts-heading">Discover Podcasts</h1>
        <Input
          type="text"
          placeholder={"Search for a title"}
          className={"Podcasts-search"}
          onInput={handelSearch}
        />
        <div className="Podcasts-cards">
            {
                podcasts.length > 0 ? "" : <h1 style={{color:"white"}} className="Podcasts-not-avail">No podcast available</h1>
            }
          {filterPodcasts.length > 0
            ? filterPodcasts.map((val) => (
                <PodcastCard
                  key={val.createdBy}
                  createdBy={val.createdBy}
                  image={val.bannerImage}
                  title={val.title}
                />
              ))
            : podcasts.length > 0 &&
              podcasts.map((val) => (
                <PodcastCard
                  key={val.createdBy}
                  createdBy={val.createdBy}
                  image={val.bannerImage}
                  title={val.title}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
