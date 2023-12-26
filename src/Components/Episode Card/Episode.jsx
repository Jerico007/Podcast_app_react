import "./Episode.css";

import Button from "../Common components/Button/Button";


const Episode = () => {
    return (
        <>
              <div className="Pod-episodes">
            <h3 className="Episode-heading" style={{color:"white"}}>Episodes</h3>

            <div className="Pod-episode">
              <p className="Pod-episode-name">1.) Episode 1 Name</p>
              <p className="Pod-episode-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laudantium aliquam assumenda ipsam corrupti quas? Accusantium
                rem minus sequi ut voluptatem repellendus quia in dolor
                asperiores, laudantium sit ratione aliquam enim unde odit
                cupiditate ad sint aspernatur iste corrupti fugiat tempore
                provident. Cupiditate quaerat quis ducimus ex dolores? Qui
                consectetur possimus debitis, sapiente assumenda id iusto magni
                beatae reiciendis quae repellendus nihil in eum illum incidunt
                odit? Est assumenda tempore et voluptates eaque doloremque
                praesentium repellat excepturi facilis illo porro aliquid, at
                dolorem minima harum, alias earum.
              </p>
              <Button className={"Pod-episode-play-button"} text={"Play"} />
            </div>
          </div>
        </>
    );
}

export default Episode;
