import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState, useEffect, useContext } from 'react';
import { Carousel } from "./Carousel.jsx";


export const CardFav = (props) => {
    const { store, actions } = useContext(Context)
    const nav = useNavigate()
    const [isFavorito, setIsFavorito] = useState(true);

    let imagesUrl = props.images.map((i) => { return i.url })

    const toggleFavorito = () => {
        setIsFavorito(!isFavorito);
        if (isFavorito) {
            // Llama a la función para eliminar el favorito
            actions.deleteFavoritos(props.id);
        } else {
            actions.createFavoritos(props.id)
        }
    };

    return (
        <>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-5 mx-auto my-2 bg-white shadow border border-2 rounded-3 azul-oscuro">
                <div className="m-1 row px-2 py-3">
                    <div className="col-12">
                        <div className="col-sm-12 col-xl-12">
                            <Carousel imagesUrl={imagesUrl} />
                        </div>
                        <div className="card-body px-0 py-0 col-sm-12 col-xl-12">
                            <h4 className="fw-bold m-2" style={{overflow:"hidden",textOverflow: "ellipsis", whiteSpace:"nowrap"}}>{props.title}</h4>
                            <p className="card-text m-2" style={{overflow:"hidden",textOverflow: "ellipsis", whiteSpace:"nowrap"}}><small>{props.description}</small></p>
                            <p className="card-text m-2">{props.wifi ? <small>Wifi: ✔️</small> : <small>Wifi: ✖️</small>}</p>
                            <p className="card-text m-2">{props.parking ? <small>Estacionamiento: ✔️</small> : <small>Estacionamiento: ✖️</small>}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between px-3 float-end">
                        <div>
                            <p className="card-text col-10" style={{overflow:"hidden",textOverflow: "ellipsis", whiteSpace:"nowrap"}}><small className="text-body-secondary text-break">{props.location}</small></p>
                            <p className="card-text">
                                <small className="text-body-secondary">{props.category} a </small>{props.category == "Venta" ?
                                    <small>USD${props.price}</small> :
                                    <small>${props.price}</small>}
                            </p>
                        </div>
                        <div className="my-auto row">
                            <button onClick={toggleFavorito} className="btn m-0 p-0" > {isFavorito ?
                                <i style={{ fontSize: "20px", color: "red" }} className="fa-solid fa-heart px-1 fs-3"></i> :
                                <i style={{ fontSize: "20px", color: "red" }} className="fa-regular fa-heart px-1 fs-3"></i>
                            }</button>
                            <button className="boton demo-boton second" onClick={() => nav("/details/" + props.id)}>Ver detalles</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

CardFav.propTypes = {

    location: PropTypes.string,
    id: PropTypes.number,
    imageUrl: PropTypes.array,
    titulo: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string

};




