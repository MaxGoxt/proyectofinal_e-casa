import React, { useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";

export const Carousel = (props) => {

  console.log(props.imagesUrl.length);
  const defaultIMG = "https://www.wellingmobilityscooters.co.uk/wp-content/uploads/2016/04/dummy-post-vertical-1-thegem-blog-default-large.jpg"

  return (
    <div className='bg-white'>
      {props.imagesUrl.length !== 0 ?
        <div className="card-header bigger-screen d-flex" style={{ height: "430px" }}>
          {props.imagesUrl?.map((img, index) => (
            <img key={index} src={img} className="details-card-img" style={{ maxWidth: "100%", width: "20px", flexGrow: "1", objectFit: "cover", opacity: ".9", transition: ".5s ease" }} />
          ))}
        </div>
        : <div className="card-header bigger-screen d-flex" style={{ height: "430px" }}>
          <img src={defaultIMG} className="details-card-img" style={{ maxWidth: "100%", width: "20px", flexGrow: "1", objectFit: "cover", opacity: ".9", transition: ".5s ease" }} />
        </div>}
      <div id="carouselExampleControls" className="carousel slide mobile-images" data-bs-ride="true">
        <div className="carousel-inner" >
          {props.imagesUrl.length !== 0 ?
            <div className="carousel-inner" style={{ width: "-webkit-fill-available" }}>
              {props.imagesUrl?.map((img, index) => (
                <div key={index} className={`carousel-item justify-content-center text-center ${index === 0 && "active"}`}>
                  <img src={img} className="details-card-img" style={{ width: "-webkit-fill-available" }} />
                </div>
              ))}
            </div>
            :
            <div className="carousel-item justify-content-center text-center active">
              <img src={defaultIMG} className="details-card-img" style={{ width: "-webkit-fill-available" }} />
            </div>}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  imagesUrl: PropTypes.array
}