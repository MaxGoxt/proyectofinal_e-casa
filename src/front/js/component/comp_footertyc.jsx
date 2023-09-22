import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import  { useState, useEffect, useContext } from 'react';
import axios from "axios";
import "../../styles/home.css";

const Footertyc = () => {
    return (
        <div>
            <h1>Este es mi footer Terminos y condiciones</h1>
        </div>

    );
};

export default Footertyc;