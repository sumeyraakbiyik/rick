import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useLocation, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Episode = () => {
  const location = useLocation();
  const ids = location.state.id;
  const [episode, setEpisode] = useState([]);
  const [character, setCharacter] = useState([]);
  const [previousCharacter, setPreviousCharacter] = useState([]);
  async function getData() {
    let response = await axios.get(
      process.env.REACT_APP_WEBSITE_EPISODE + "/" + ids
    );
    let episode = await response.data;
    setEpisode(episode);
    console.log(episode);
    let list = [];
    episode.characters.forEach((element) => {
      var d = element.split("/character/")[1];
      list.push(d);
    });
    console.log(list.toString());
    var liste = list.toString();
    getList(liste);
  }
  async function getList(liste) {
    let response = await axios.get(
      process.env.REACT_APP_WEBSITE_CHARACTER + "/" + liste
    );
    console.log(process.env.REACT_APP_WEBSITE_CHARACTER + "/" + liste);
    let character = await response.data;
    setCharacter(character);
    setPreviousCharacter(character);
    console.log(character);
  }

  useEffect(() => {
    getData();
  }, []);

  const getInitialStateGender = () => {
    const gender = "none";
    return gender;
  };
  const [gender, setGender] = useState(getInitialStateGender);

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };
  const getInitialStateStatus = () => {
    const valueStatus = "none";
    return valueStatus;
  };
  const [valueStatus, setValueStatus] = useState(getInitialStateStatus);

  const handleChangeStatus = (e) => {
    setValueStatus(e.target.value);
  };

  const SelectFilter = () => {
    var person1 = previousCharacter
    if (gender !== "none") {
      if (valueStatus !== "none") {
        person1 = previousCharacter
          .filter((val) => val.gender === gender)
          .filter((val) => val.status === valueStatus);
      } 
      else {
        person1 = previousCharacter.filter((val) => val.gender === gender);
      }
    } 
    else {
      if (valueStatus !== "none") {
        person1 = previousCharacter.filter(
          (val) => val.status === valueStatus
        );
      } 
    }
    setCharacter(person1)
  };

  const Sorting = () => {
    const person = [...character].sort((a, b) => a.name.localeCompare(b.name));
    setCharacter(person);
    console.log(person);
  };

  if (!episode)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div className="container mt-4">
      <div className="row mb-5">
        <div className="text-center">
          <div className="post-thumb mb-3">
            <img
              src={process.env.REACT_APP_WEBSITE_DEFAULT_IMGURL}
              alt={episode.name}
              className="img-fluid rounded-circle"
              style={{ maxHeight: "150px" }}
            />
          </div>
        </div>
        <div className="text-center">
          <div className="post-content">
            <h3 className="post-title">
              {"Episode " + ids + " - "} {episode.name}
            </h3>
            <span>{episode.air_date}</span>
          </div>
        </div>
      </div>

      {character.length > 0 && (
        <div className="row">
          <h2 className="pt-2 pb-2 mb-4">Characters</h2>
          <div className="col-md-3 ">
            Gender
            <select
              value={gender}
              onChange={handleChangeGender}
              className="form-control"
            >
              <option value="none">All</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Genderless">Genderless</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <div className="col-md-3">
            Status
            <select
              value={valueStatus}
              onChange={handleChangeStatus}
              className="form-control"
            >
              <option value="none">All</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <div className="col-md-3 mt-4">
            <button
              className="btnPrimary btn btn100"
              variant="dark"
              onClick={(e) => {
                SelectFilter();
              }}
            >
              Filter
            </button>
          </div>
          <div className="col-md-3 mt-4">
            <button className="btnPrimary btn btn100" variant="dark" onClick={Sorting}>
              Sorting Name
            </button>
          </div>
          <div className="row mt-4">
            {character.map((media, index) => {
              return (
                <div className="col-6 col-md-2" key={index}>
                  <Link
                    to={{
                      pathname: "/Detail",
                    }}
                    state={{ id: media.id }}
                  >
                    <div className="mediaItem">
                      <div className="posterItem">
                        <LazyLoadImage
                          alt={media.alt}
                          effect="blur"
                          className="img-fluid rounded-circle"
                          src={media.image}
                          threshold="300"
                          onError={(e) => this.addDefaultSrc(e)}
                        />
                      </div>
                      <div className="titleItem text-center">
                        <h1 className="title">{media.name}</h1>
                        <span className="descr">
                          {media.status} - {media.species}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Episode;
