import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState, useEffect, useContext } from 'react';
import "../../styles/card_feed_alq.css";

export const CardFeedAlq = (props) => {
    const { store, actions } = useContext(Context)
    return (
        <div className="text-decoration-none col-sm-6 col-md-4 col-lg-3 col-xl-2 product">
            <div className="thumbnail">
                <div id={"carouselExampleControls" + props.id} className="carousel slide" data-bs-ride="carousel" data-bs-interval="false" data-interval="false" data-mdb-interval="false">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide-to="4" aria-label="Slide 5"></button>
                    </div>
                    <div className="carousel-inner d-flex align-items-center" style={{ height: "250px" }}>
                        {props.images?.map((img, index) => (
                            <div key={index} className={`carousel-item text-center w-100 ${index === 0 && "active"}`}>
                                <img src={img.url} className="w-100 object-fit-cover" />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/*<div className="img d-flex align-items-start justify-content-end">
                    <i className="position-absolute fa-regular fa-heart m-2 text-danger bg-dark p-2 bg-opacity-75 rounded"></i>
                    <img className="card-img-top" alt="" src={props.imageUrl} />
                </div>*/}
            </div>
            <div className="azul-oscuro mb-5 rounded-bottom">
                <div className="d-flex justify-content-between">
                    <strong className="card-title">{props.ubicacion}</strong>
                </div>
                <div className="d-flex justify-content-between px-1">
                    <p className="card-text">$ {props.precio}</p>
                    <Link to={"/details/"} style={{ textDecoration: "underline" }}>Ver detalles</Link>
                </div>
            </div>
        </div>
    );
};

CardFeedAlq.propTypes = {

    ubicacion: PropTypes.string,
    precio: PropTypes.number,
    id: PropTypes.number,
    imageUrl: PropTypes.array
};