import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Footertyc from "../component/comp_footertyc.jsx"; // Importo mi componente

const VistaFooter = () => {
  return (
    <div>
      <h1>Mi Vista Footer</h1>
      <Footertyc />
    </div>
  );
};

export default VistaFooter;