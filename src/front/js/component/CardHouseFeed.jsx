import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState, useEffect, useContext } from 'react';
import "../../styles/card_feed_alq.css";


export const CardHouseFeed = (props) => {
    const { store, actions } = useContext(Context)

    const [isFavorito, setIsFavorito] = useState(
        Array.isArray(store.favoritos) && store.favoritos.some((item) => item.houseId.id === props.id)
      );

    useEffect(() => {
        actions.getFavoritos()
    }, [])
 
    const toggleFavorito = async () => {
        setIsFavorito(!isFavorito);      
        if (isFavorito) {
            // Llama a la función para eliminar el favorito
           await actions.deleteFavoritos(props.id);
        } else {
           await actions.createFavoritos(props.id)
        }
        actions.getFavoritos()

    };

    return (
        <div className="bg-white text-decoration-none col-sm-6 col-md-4 col-lg-3 col-xl-3 mx-auto product shadow pt-3 rounded">
            <div className="thumbnail">
                <i
                    onClick={() => toggleFavorito(props.id)}
                    className={
                        Array.isArray(store.favoritos) &&
                            store.favoritos.some((item) => item.houseId.id === props.id)
                            ? "position-absolute fa-solid fa-heart m-3 text-danger bg-dark p-2 bg-opacity-75 rounded-circle"
                            : "position-absolute fa-regular fa-heart m-3 text-danger bg-dark p-2 bg-opacity-75 rounded-circle"
                    }
                    style={{ zIndex: "2", cursor: "pointer" }}
                ></i>  
                <div id={"carouselExampleControls" + props.id} className="carousel slide" data-bs-ride="carousel" data-bs-interval="false" data-interval="false" data-mdb-interval="false">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide-to="4" aria-label="Slide 5"></button>
                    </div>
                    <div className="carousel-inner d-flex align-items-center" style={{ height: "250px", zIndex: "1" }}>
                        {props.images?.map((img, index) => (
                            <div key={index} className={`carousel-item text-center w-100 ${index === 0 && "active"}`}>
                                <img src={img.url} className="w-100 object-fit-cover" />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleControls" + props.id} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="azul-oscuro mb-5 rounded-bottom">
                <div className="d-flex justify-content-between">
                    <strong className="card-title">{props.location}</strong>
                </div>
                <div className="d-flex justify-content-between px-1">
                    <p className="card-text"><small className="text-body-secondary">
                        </small>{props.category == "Venta" ? <small>US${props.price}</small> : <small>${props.price}</small>}</p>
                    <Link to={"/details/" + props.id} style={{ textDecoration: "underline" }}>Ver detalles</Link>
                </div>
            </div>
        </div>
    );
};

CardHouseFeed.propTypes = {
    location: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number,
    images: PropTypes.array,
    category: PropTypes.string,
};