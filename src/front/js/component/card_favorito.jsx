import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import  { useState, useEffect, useContext } from 'react';
import { PanelCtrl } from "../component/panel_control.jsx";


export const CardFav = (props) => {
    const { store, actions } = useContext(Context)
    
    const [isFavorito, setIsFavorito] = useState(false);

    const toggleFavorito = () => {
      setIsFavorito(!isFavorito);
      if (isFavorito) {
        // Llama a la función para eliminar el favorito
        props.onEliminarFavorito(props.id);
      }

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
                        <button onClick={toggleFavorito} className="btn" style={{ color: 'red', border: 'none', cursor: 'pointer' }}>
                            <i style={{ fontSize: "30px", color: isFavorito ? 'red' : 'black' }} className="fa-regular fa-heart px-3 px-1 "></i>
                        </button>
                    </div>
                </div>
            </div>

        </> <div className="container-fluid bg-celeste-claro py-2 fixed-bottom mt-auto text-center azul-oscuro d-flex justify-content-between">
      <div className="float-end">
        <p>footer foto del Sr</p>
      </div>
      <div className="float-start">
        <Link to={"/"}>
          <i style={{ fontSize: "40px" }} className="fa-regular fa-heart px-3 px-1 "></i>
        </Link>
      </div>
    </div></>
    


    );
}

CardFav.propTypes = {
    
    ubicacion: PropTypes.string,
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    titulo: PropTypes.string
};




