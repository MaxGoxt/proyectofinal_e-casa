import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/favoritos.css";
import { CardFav } from "../component/card_favorito.jsx"
import { PanelCtrl } from "../component/panel_control.jsx";



export const Favoritos = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.getFavoritos()
    }, [])

    return (
        <div className="mt-5 pt-3 container">
            <h1 className="text-black">Tus favoritos</h1>
            {store.favoritos == "No tienes favoritos ingresados"
                ? <div className="no-favorites-container">
                    <img className="" src="https://res.cloudinary.com/dslz0zdlc/image/upload/v1695155559/Miroodles_-_Color_Comp_sptmxy.png" height="400" />
                    <p className="fs-1 col-4 my-auto">No tienes favoritos ingresados</p>
                </div>
                : <div className="row justify-content-center">
                    {store.favoritos.map((item, index) => {
                        return (
                            <CardFav
                                key={index}
                                titulo={item.houseId.title}
                                ubicacion={item.houseId.location}
                                id={item.houseId.id}
                                images={item.houseId.images} />
                        )
                    })}
                </div>
            }
            <PanelCtrl />
        </div>
    );
};


/*
    <div className= "mt-5 pt-3">
        <h1 className= "text-black">Tus favoritos</h1>
        {store.favoritos == "No tienes favoritos ingresados"? 
            <h2 className= "text-white bg-azul-oscuro d-flex justify-content-center btn my-4">{store.favoritos}</h2>:
            <div>

            {store.favoritos.map((item, index) => {
                    return (
                        <CardFav key={index} titulo={item.houseId.title} ubicacion={item.houseId.location} id={item.houseId.id} images={item.houseId.images} />
                    )
                })}
            </div>
            }
            <PanelCtrl/>
        </div>

 */