import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import TerminosYCondiciones from "../component/comp_terminos.jsx";
    
  const VistaTerminos = () => {
  return (
    <div>
      <h1>Vista de Términos y Condiciones</h1>
      <TerminosYCondiciones />
    </div>
  );
}

export default VistaTerminos;