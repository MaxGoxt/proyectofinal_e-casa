import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardFav } from "../component/card_favorito.jsx"



export const Favoritos = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.getFavoritos()
      }, [])
  

    


    

    return (
        <div className= "mt-5">
        <h1>Tus favoritos</h1>

        <CardFav/>
        <CardFav/>
        <CardFav/>
        <CardFav/>
        <CardFav/>

        </div>
    );
};
