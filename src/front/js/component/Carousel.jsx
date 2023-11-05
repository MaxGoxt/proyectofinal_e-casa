import React, { useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Carousel = (props) => {

  return (
    <div className='bg-white'>
      <div className="card-header bigger-screen d-flex" style={{ height: "430px" }}>
        {props.imagesUrl?.map((img, index) => (
          <img key={index} src={img} className="details-card-img" style={{ maxWidth: "100%", width: "20px", flexGrow: "1", objectFit: "cover", opacity: ".9", transition: ".5s ease" }} />
        ))}
      </div>
      <div id="carouselExampleControls" className="carousel slide mobile-images" data-bs-ride="true">
        <div className="carousel-inner" >
          <div className="carousel-inner" style={{ height: "300px" }}>
            {props.imagesUrl?.map((img, index) => (
              <div key={index} className={`carousel-item justify-content-center text-center ${index === 0 && "active"}`}>
                <img src={img} className="details-card-img" style={{ height: "300px" }} />
              </div>
            ))}
          </div>
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