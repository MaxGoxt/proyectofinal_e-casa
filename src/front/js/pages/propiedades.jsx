import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardProp } from "../component/card_propiedad.jsx"
import { PanelCtrl } from "../component/panel_control.jsx";



export const Propiedades = () => {
    const { store, actions } = useContext(Context)
    const param = useParams()
    useEffect( () => {
        actions.getMyPerfil(param)
        actions.getMyCasas()
        console.log("pepe", param)
    }, [])

    // console.log(store.casaPropietario)
    return (
            store.auth? 
        <div className="pt-5 row gap-1">
            <h1 className="azul-oscuro text-center my-5">Administrar mis Propiedades</h1>
            {store.casaPropietario?.map((item, index) => {
                return (
                    <CardProp
                        key={index}
                        title={item.title}
                        location={item.location}
                        price={item.price}
                        id={item.id}
                        description={item.description}
                        category={item.category}
                        parking={item.parking}
                        wifi={item.wifi}
                        images={item.images} />
                )
            })}
            <PanelCtrl />
        </div>
            : <h1 className="text-danger mx-5 my-5">🚫INAUTORIZADO🚫</h1>
    );
};