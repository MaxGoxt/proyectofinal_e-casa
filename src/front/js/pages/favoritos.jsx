import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/favoritos.css";
import { CardFav } from "../component/card_favorito.jsx"
import { PanelCtrl } from "../component/panel_control.jsx";

export const Favoritos = () => {
    const { store, actions } = useContext(Context);
   

    const navigate = useNavigate();

    useEffect(() => {
        actions.validToken()
            .then((isLogged) => {
                if (isLogged === false) {
                    navigate("/");
                } else { 
                    actions.getFavoritos();
                }
            })
    }, [])

    return (
        <div className="mt-5 pt-3">
            { store.auth ? 
            <>
                <h2 className="azul-oscuro">Tus favoritos</h2>
                {store.favoritos == "No tienes favoritos ingresados" || store.favoritos.length == 0
                    ? <div className="no-favorites-container">
                        <img className="" src="https://res.cloudinary.com/dslz0zdlc/image/upload/v1695155559/Miroodles_-_Color_Comp_sptmxy.png" height="400" />
                        <h3 className="colorido fs-1 col-4 my-auto">No tienes favoritos ingresados</h3>
                    </div>
                    : <div className="row gap-1 d-flex justify-content-center">
                        {store.favoritos?.map((item, index) => (
                                <CardFav
                                    key={index}
                                    title={item.houseId.title}
                                    location={item.houseId.location}
                                    id={item.houseId.id}
                                    images={item.houseId.images}
                                    price={item.houseId.price}
                                    category={item.houseId.category}
                                    description={item.houseId.description}
                                    />
                            )
                        )}
                    </div>
                }
            </>
            : null}
            <PanelCtrl />
        </div>
    );
};
