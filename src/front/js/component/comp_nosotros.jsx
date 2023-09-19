import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import  { useState, useEffect, useContext } from 'react';
import axios from "axios";
import "../../styles/card_feed_alq.css";


const Nosotros = () => {
  return (
    <div className= "bg-azul-oscuro py-4" >
      <h1 className= "text-FDBE34 bg-azul-oscuro d-flex justify-content-center btn my-4 d-inline-block position-relative" style={{ color: '#FDBE34' }}><strong>Sobre Nosotros</strong></h1>
      <span className="linea-amarilla"></span>
      
      <div className="container">
      <div className="row"></div>
      <div className="col-md-12">
      <p className=" text-left text-white">VISION: Somos un grupo de desarrolladores junior, que motivados por la necesidad del acceso a la vivienda, creamos esta aplicación para que nuestros usuarios encuentren la opción más adecuada de acuerdo a sus preferencias y necesidades dentro de todo el territorio nacional.</p>
      <p className=" text-left text-white">Nos adaptamos a los cambios del mercado que siempre está en continuo movimiento.</p>
      <p className="text-white">Nuestro equipo, formado <strong>Christian Díaz</strong>, <strong>Maximiliano Gómez</strong>, <strong>Agustín Rolando</strong> y <strong>Claudia Salituro</strong> ha trabajando con mucha responsabilidad y compromiso para facilitarles y garantizarles una gestión efectiva y que tengan una experiencia única para lograr la satisfacción de nuestros clientes.</p>
    </div>
    </div>
    </div>
  );
};

export default Nosotros;