import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "./Loading";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null, isLoading: true };
  }
  componentDidMount() {
    this.getData();
  }
  getData(url) {
    var str = process.env.REACT_APP_WEBSITE_CHARACTER;
    if(url!==undefined && url !==""){
      str=url
    }
    axios
      .get(str)
      .then((response) => response.data)
      .then((data) => this.setState({ data: data, isLoading: false }))
      .catch(function(error) {
        console.log(error);
      });
  }
  selectPage(e,value){
    if(value!==null && value!==""){
      this.getData(value)
    }
  }
  addDefaultSrc=(e)=>{
    e.target.src=process.env.REACT_APP_WEBSITE_DEFAULT_IMGURL
}
  render() {
    console.log(this.state.data)
    return (
      <>
        {this.state.isLoading && <Loading />}
        {!this.state.isLoading && this.state.data && (
          <div className="container">
            <div className="row mt-4">
            {this.state.data.results.map((media, index) => {
              return (
                <div className="col-6 col-md-3" key={index}>
                    <Link
                      to={{
                        pathname: "Detail",
                       
                      }}
                      state={{ id: media.id }}
                    >
                      <div className="mediaItem">
                        <div className="posterItem">
                        <LazyLoadImage
                              alt={media.alt}
                              effect="blur"
                              className="img-fluid"
                              src={media.image} 
                              threshold="300"
                              onError={(e)=>this.addDefaultSrc(e)}
                            />
                        </div>
                        <div className="titleItem">
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
          <div className="row col-md-3">
            <div className="btn-group" role="group" >
            <button className="btnPrimary btn " disabled={this.state.data.info.prev===null ? true:false} onClick={(e) => {this.selectPage(e.currentTarget,this.state.data.info.prev)}} >Previous</button>
            <button className="btnPrimary btn " disabled={this.state.data.info.next===null ? true:false} onClick={(e) => {this.selectPage(e.currentTarget,this.state.data.info.next)}}>Nex</button>
          </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Home;
