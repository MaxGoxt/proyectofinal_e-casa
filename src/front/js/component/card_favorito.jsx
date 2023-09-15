import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import  { useState, useEffect, useContext } from 'react';

export const CardFav = (props) => {
    const { store, actions } = useContext(Context)
    return (
    <>
    <div className="card mb-3" style={{maxWidth: "540px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={props.imageUrl} className="img-fluid rounded-start rounded-4" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.titulo}</h5>
                        <p className="card-text"><small className="text-body-secondary">{props.ubicacion}</small></p>
                    </div>
                    <div className="d-flex justify-content-between px-1">
                    <i className="fa-regular fa-heart"></i>
                    {/* <Link to={"" + props.id}><p>Ver detalles</p></Link> */}
                </div>
                    
                </div>
            </div>
        </div>
        </>

    );
}

CardFav.propTypes = {
    
    ubicacion: PropTypes.string,
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    titulo: PropTypes.string
};


