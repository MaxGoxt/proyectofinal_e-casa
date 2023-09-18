import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState, useEffect, useContext } from 'react';
import "../../styles/card_feed_alq.css";

export const CardFeedAlq = (props) => {
    const { store, actions } = useContext(Context)
    return (
        <Link to={"/details/" + props.id} className="text-decoration-none col-sm-6 col-md-4 col-lg-3 col-xl-2 product">
            <div className="thumbnail" href="#">
                <div className="img d-flex align-items-start justify-content-end">
                    <i className="position-absolute fa-regular fa-heart m-2 text-danger bg-dark p-2 bg-opacity-75 rounded"></i>
                    <img className="card-img-top" alt="" src={props.imageUrl} />
                </div>
            </div>
            <div className="azul-oscuro mb-5 rounded-bottom">
                <div className="d-flex justify-content-between">
                    <strong className="card-title">{props.ubicacion}</strong>
                </div>
                <div className="d-flex justify-content-between px-1">
                    <p className="card-text">$ {props.precio}</p>
                    <p style={{ textDecoration: "underline" }}>Ver detalles</p>
                </div>
            </div>
        </Link>
    );
};

CardFeedAlq.propTypes = {

    ubicacion: PropTypes.string,
    precio: PropTypes.number,
    id: PropTypes.number,
    imageUrl: PropTypes.string
};