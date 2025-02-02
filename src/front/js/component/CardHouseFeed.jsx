import React from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState, useEffect, useContext } from 'react';
import "../../styles/card_feed_alq.css";

export const CardHouseFeed = (props) => {
    const { store, actions } = useContext(Context)
    const nav = useNavigate()

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
        <figure
            className="snip1369 green pb-4 animated animatedFadeInUp fadeInUp mb-5 bg-white azul-oscuro col-sm-6 col-md-4 col-lg-3 col-xl-3 mx-auto product shadow pb-1 px-2 rounded">

            {store.auth ?
                <button className="position-absolute btn demo-boton border-0 rounded-circle second mt-2"
                    style={{ zIndex: "2", cursor: "pointer" }}
                    onClick={() => toggleFavorito(props.id)}>
                    <i
                        className={
                            Array.isArray(store.favoritos) &&
                                store.favoritos.some((item) => item.houseId.id === props.id)
                                ? " fa-solid fa-heart text-danger "
                                : " fa-regular fa-heart text-white "
                        }
                    ></i>
                </button> :
                <button className="position-absolute btn demo-boton border-0 rounded-circle second mt-2"
                    style={{ zIndex: "2", cursor: "pointer" }}
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fa-regular fa-heart text-white"></i>
                </button>
            }
            {/* {props.images?.map((i)=>(
                <img src={i.url} alt="" />
            ))} */}

            <div className="image">
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
            <figcaption>
                <h3 className="mb-3 mt-2" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{props.title}</h3>
                <p className="mb-3" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{props.location}.</p>
                {props.category == "Venta" ?
                    <p className="card-text">US${props.price}</p> :
                    <p className="card-text">${props.price}</p>}
            </figcaption>
            <span className="read-more">
                <Link to={"/details/" + props.id}>
                    Ver detalles <i className="ion-android-arrow-forward"></i>
                </Link>
            </span>
        </figure>
    );
};

CardHouseFeed.propTypes = {
    location: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
    id: PropTypes.number,
    images: PropTypes.array,
    category: PropTypes.string,
};