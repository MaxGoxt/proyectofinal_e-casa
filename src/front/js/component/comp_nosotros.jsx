import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import  { useState, useEffect, useContext } from 'react';
import axios from "axios";
import "../../styles/home.css";


const Nosotros = () => {
  return (
    <div className= "container bg-azul-oscuro py-4 px-4 rounded" style= {{ maxWidth: "600px"}}>
      <h1 className= "texto-amarillo d-flex justify-content-center py-3 mx-5 border-bottom border-3 border-warning">
        Sobre Nosotros
      </h1>
      
      <div className="container">
      <div className="p-5">
      <p className=" text-white">VISION: Somos un grupo de desarrolladores junior, que motivados por la necesidad del acceso a la vivienda, creamos esta aplicación para que nuestros usuarios encuentren la opción más adecuada de acuerdo a sus preferencias y necesidades dentro de todo el territorio nacional.</p>
      <p className=" text-white">Nos adaptamos a los cambios del mercado que siempre está en continuo movimiento.</p>
      <p className="text-white">Nuestro equipo, formado por &nbsp;
      <a href="https://www.linkedin.com/in/cristian-d%C3%ADaz-390971222" target="_blank" style={{ color: '#FDBE34', textDecoration: 'none' }}><strong>Cristian Díaz</strong></a>,&nbsp; 
      <a href="https://www.linkedin.com/in/maximiliano-gomez-coitino" target="_blank" style={{ color: '#FDBE34', textDecoration: 'none' }}><strong>Maximiliano Gómez</strong></a>,&nbsp;
      <a href="https://www.linkedin.com/in/agustin-rolando-538148287" target="_blank" style={{ color: '#FDBE34', textDecoration: 'none' }}><strong>Agustín Rolando</strong></a>&nbsp; y &nbsp;
      <a href="https://www.linkedin.com/in/claudia-salituro-7151b2250 " target="_blank" style={{ color: '#FDBE34', textDecoration: 'none' }}><strong>Claudia Salituro</strong> </a>
      &nbsp;ha trabajando con mucha responsabilidad y compromiso para facilitarles y garantizarles una gestión efectiva y que tengan una experiencia única para lograr la satisfacción de nuestros clientes.</p>
    </div>
    </div>
    <div className="container d-flex justify-content-center align-items-center" >
    <div className="texto-amarillo border border-2 border-warning rounded p-2 mb-2" >
    <Link to="/contacto" className="texto-amarillo border border-2 border-warning rounded p-2 mb-2">
          Contáctanos
        </Link></div>
    </div>
    </div>
  );vista
};

export default Nosotros;