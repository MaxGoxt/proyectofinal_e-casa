import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import  { useState, useEffect, useContext } from 'react';


export const CardFav = (props) => {
    const { store, actions } = useContext(Context)
    
    const [isFavorito, setIsFavorito] = useState(true);

    const toggleFavorito = () => {
      setIsFavorito(!isFavorito);
    //   if (isFavorito) {
    //     // Llama a la función para eliminar el favorito
    //     props.eliminar_casa_favorita(props.id);
    //   }

    };



    return (
    <><>
            <div className="card mb-3" style={{ maxWidth: "440px" }}>
                <div className="row g-0 h-4">
                    <div className="col-md-4">
                        <img src={props.imageUrl} className="img-fluid rounded-start rounded-4" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.titulo}</h5>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between px-1 float-end">
                        <p className="card-text"><small className="text-body-secondary">{props.ubicacion}</small></p>
                        <button onClick={toggleFavorito} className="btn" > { isFavorito?
                            <i style={{ fontSize: "20px", color: "red" }} className="fa-solid fa-heart px-3 px-1 "></i> :
                            <i style={{ fontSize: "20px", color: "red" }} className="fa-regular fa-heart px-3 px-1 "></i>
                        }</button>
                    </div>
                </div>
            </div>

        </> 
    </>
    


    );
}

CardFav.propTypes = {
    
    ubicacion: PropTypes.string,
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    titulo: PropTypes.string,
};




