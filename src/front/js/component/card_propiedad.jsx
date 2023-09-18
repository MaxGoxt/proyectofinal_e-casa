import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import  { useState, useEffect, useContext } from 'react';


export const CardProp = (props) => {
    const { store, actions } = useContext(Context)


    return (
    <>
            <div className="m-3 col-sm-6 col-md-4 col-lg-3 col-xl-2" style={{ maxWidth: "440px" }}>
                <div className="row g-0 h-4">
                    <div className="">
                        <img src="https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/yfsd0ivntxrgifwgsbgx.webp" className="img-fluid rounded-start rounded-4" alt="..." />
                    </div>
                    <div className="">
                        <div className="card-body">
                            <h5 className="card-title">Titulo</h5>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between px-1 float-end">
                        <p className="card-text"><small className="text-body-secondary">Ubicacion</small></p>
                        <div>
                            <button className="btn" onClick={() => {alert("deberia borrarse pero no lo hace")}}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                            <button className="btn">
                                <Link to={"/upload"}><i className="fa-solid fa-pencil"></i></Link>
                            </button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

CardProp.propTypes = {
    
    ubicacion: PropTypes.string,
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    titulo: PropTypes.string,
};