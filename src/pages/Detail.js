import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useLocation, Link } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const ids = location.state.id;
  const [character, setCharacter] = useState([]);
  const [episode, setEpisode] = useState([]);
  async function getData() {
    let response = await axios.get(
      process.env.REACT_APP_WEBSITE_CHARACTER + "/" + ids
    );
    let character = await response.data;
    setCharacter(character);
    setEpisode(character.episode);
    console.log(character);
  }
  useEffect(() => {
    getData();
  }, []);

  if (!character)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-4">
          <div className="post-thumb">
            <img
              src={character.image}
              alt={character.name}
              className="img-fluid rounded-circle"
            />
          </div>
        </div>
        <div className="col-8">
          <div className="post-content">
            <h3 className="post-title">{character.name}</h3>
            <p>
              {" "}
              {character.status} - {character.species}
            </p>
            <span>
              Create Date: {new Date(character.created).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <h2 className="pt-2 pb-2">Episodes</h2>
        {episode
          .map((epi) => epi.split("/episode/")[1])
          .map((epi) => (
            <div className="col-4 col-md-2 " key={epi.id + epi}>
              <Link
                className="btnPrimary btn btn100"
                to={{
                  pathname: "/Episode",
                }}
                state={{ id: epi }}
                variant="dark"
            
              >
                Episode {epi}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Detail;
