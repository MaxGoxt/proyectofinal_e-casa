import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardFav } from "../component/card_favorito.jsx"
import { PanelCtrl } from "../component/panel_control.jsx";



export const Favoritos = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.getFavoritos()
      }, [])
  
 

    return (
        <div className= "mt-5 pt-3">
        <h1 className= "text-black">Tus favoritos</h1>
        {store.favoritos == "No tienes favoritos ingresados"? 
            <h2 className= "text-white bg-azul-oscuro d-flex justify-content-center btn my-4">{store.favoritos}</h2>:
            store.favoritos.map((item, index) => {
                        return (
                            <div key={index}>
                                <CardFav titulo={item.houseId.title} ubicacion={item.houseId.location} id={item.houseId.id} imageUrl={item.houseId.image_url} />
                            </div>

                            
                        )
                    })}

            <PanelCtrl/>

        </div>
    );
};
