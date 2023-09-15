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
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_Fo7x9y_fwalgd3htKCWshtFldDPZhsgGFsSSVzLkv9cFTe6_8-Ea-ETDmgH2qwYkkc&usqp=CAU" className="img-fluid rounded-start rounded-4" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
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


