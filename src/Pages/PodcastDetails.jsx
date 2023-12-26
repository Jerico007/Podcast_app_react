// React library
import { useEffect, useState } from "react";

// Navbar component
import NavBar from "../Components/Navbar/NavBar";

// Button component
import Button from "../Components/Common components/Button/Button";

// Episode component
import Episode from "../Components/Episode Card/Episode";

// React router dom library
import { useParams, useNavigate } from "react-router-dom";

// firestore library
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

// React toastify library
import { toast } from "react-toastify";

const PodcastDetails = () => {
  // Podcast Id
  const { id } = useParams();

  //   Navigate
  const Navigate = useNavigate();

  const [podDetails, setPodDetails] = useState({});
  // useEffect for getting the data on id change
  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, [id]);

  // function to fetch the podcast details
  async function getDetails() {
    try {
      const docRef = doc(db, "podcast", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPodDetails({ id: id, ...docSnap.data() });
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="PodcastDetails">
      <NavBar />
      {podDetails.id ? (
        <div className="Pod-Details">
          <div className="Pod-title-button-holder">
            <p className="Pod-title">{podDetails.title}</p>
            {auth.currentUser.uid === podDetails.createdBy && (
              <Button
                className={"Pod-create-episode-button"}
                callback={() => {
                  Navigate(`/podcast/create-episode/${id}`);
                }}
                text={"Create Episode"}
              />
            )}
          </div>
          <div className="Pod-banner">
            <img src={podDetails.bannerImage} alt="No-Image" />
          </div>
          <p className="Pod-description">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
            aliquam assumenda ipsam corrupti quas? Accusantium rem minus sequi
            ut voluptatem repellendus quia in dolor asperiores, laudantium sit
            ratione aliquam enim unde odit cupiditate ad sint aspernatur iste
            corrupti fugiat tempore provident. Cupiditate quaerat quis ducimus
            ex dolores? Qui consectetur possimus debitis, sapiente assumenda id
            iusto magni beatae reiciendis quae repellendus nihil in eum illum
            incidunt odit? Est assumenda tempore et voluptates eaque doloremque
            praesentium repellat excepturi facilis illo porro aliquid, at
            dolorem minima harum, alias earum.
          </p>
          <Episode/>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PodcastDetails;
