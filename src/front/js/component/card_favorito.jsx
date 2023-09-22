import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState, useEffect, useContext } from 'react';


export const CardFav = (props) => {
    const { store, actions } = useContext(Context)

    const [isFavorito, setIsFavorito] = useState(true);

    

    const toggleFavorito = () => {
        setIsFavorito(!isFavorito);
        if (isFavorito) {
            // Llama a la función para eliminar el favorito
            actions.deleteFavoritos(props.id);
        }else{
            actions.createFavoritos(props.id)
        }
    };

    return (
        <>
            <div className="col-12 col-md-6 col-xl-4">
                <div className="m-1 border border-2 rounded-3 row px-2 py-3">
                    <div className="d-flex mb-3">
                        <img src={props.images[0].url} className="rounded rounded-4" style={{ width: "80px", height: "60px", objectFit: "cover" }} alt="..." />
                        <div className="mt-0 p-0 ms-4">
                            <p className="m-0  fw-bold fs-5">{props.title}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between float-end">
                        <p className="m-0" style={{ textDecoration: "underline" }}>{props.location}</p>
                        <button onClick={toggleFavorito} className="btn m-0 p-0" > {isFavorito ?
                            <i style={{ fontSize: "20px", color: "red" }} className="fa-solid fa-heart px-1 fs-3"></i> :
                            <i style={{ fontSize: "20px", color: "red" }} className="fa-regular fa-heart px-1 "></i>
                        }</button>
                    </div>
                </div>
            </div>
        </>




    );
}

CardFav.propTypes = {

    ubicacion: PropTypes.string,
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    titulo: PropTypes.string,
};




