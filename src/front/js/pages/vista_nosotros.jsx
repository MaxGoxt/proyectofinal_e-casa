import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Nosotros from "../component/comp_nosotros.jsx"; // Importo mi componente

const VistaNosotros = () => {
  return (
    <div>
      <h1>Mi Vista</h1>
      <Nosotros />
    </div>
  );
};

export default VistaNosotros;