import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import  { useState, useEffect, useContext } from 'react';
import axios from "axios";
import "../../styles/home.css";

const Footertyc = () => {
    return (
        <><div className="container bg-azul-oscuro rounded py-4 mt-4" style={{ maxWidth: "600px" }}>
            <h4 className=" text-white"> <a href="https://glowing-waffle-69ggqq776xqg3xrvp-3000.app.github.dev/comp-nosotros" target="_blank" style={{ color: '#ffffff', textDecoration: 'none' }}>Sobre nosotros</a></h4>
            <h5 className=" text-white"><i class="fa-solid fa-square-check fa-xs" style={{color: "#ffffff;"}}></i>   Términos y condiciones</h5>
            <h4 className=" text-white border-bottom border-2 py-3" style={{ maxWidth: "500px" }}></h4>
            <h4 className=" text-white"><i class="fa-solid fa-location-dot fa-xs" style={{color: "#ffffff;"}}></i>   Ubicación</h4>
            <h4 className=" text-white" ><i class="fa-solid fa-phone fa-xs" style={{color: "#ffffff;"}}></i>  Teléfono</h4>
            <h4 className=" text-white"> <i class="fa-solid fa-envelope fa-xs" style={{color: "#ffffff;"}}></i>  Mail</h4>
            <h4 className=" text-white border-bottom border-2 py-3"  style={{ maxWidth: "500px" }}></h4>
            <h4 className=" text-white text-center justify-content-center"><i class="fa-regular fa-copyright fa-xs" style={{color: "#ffffff;"}}></i>   e-casas.company</h4>
        
        </div>
            <div>
                
            </div></>


    );
};

export default Footertyc;