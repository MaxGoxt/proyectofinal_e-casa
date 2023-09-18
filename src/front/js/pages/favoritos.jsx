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

      const handleEliminarFavorito = (id) => {
        // Llama a la acción para eliminar un favorito
        actions.eliminarFavorito(id);
      };
  


    

    return (
        <div className= "mt-5">
        <h1 className= "text-white">Tus favoritos</h1>
        {store.favoritos.map((item, index) => {
                        return (
                            <div key={index}>
                                <CardFav titulo={item.houseId.title} ubicacion={item.houseId.location} id={index} imageUrl={item.houseId.image_url} />
                               {() => handleEliminarFavorito(index)} 
                            </div>

                            
                        )
                    })}

            <PanelCtrl/>

        </div>
    );
};
