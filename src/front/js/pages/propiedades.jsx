import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardProp } from "../component/card_propiedad.jsx"
import { PanelCtrl } from "../component/panel_control.jsx";


export const Propiedades = () => {
    const { store, actions } = useContext(Context)

    return (
        <div className="mt-5 pt-3 row">
            <h1 className="text-black">Tus favoritos</h1>
            <CardProp/>
            <CardProp/>
            <CardProp/>
            <PanelCtrl/>
        </div>
    );
};