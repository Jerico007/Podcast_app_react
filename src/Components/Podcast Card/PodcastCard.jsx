/* eslint-disable react/prop-types */

// Podcast-Card CSS
import "./PodcastCard.css";

// React router dom
import { Link } from "react-router-dom";

const PodcastCard = ({ image, title ,createdBy }) => {

  
  return (
    <Link to={`/PodcastDetails${createdBy}`}>
     <div className="PodcastCard">
      <div className="PodcastCard-content">
        <img className="PodcastCard-bannerImage" src={image} />
        <p className="PodcastCard-title">{title}</p>
      </div>
    </div>
    </Link>
   
  );
};

export default PodcastCard;