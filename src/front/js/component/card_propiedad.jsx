import React, { useContext, useEffect }  from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Carousel } from "./Carousel.jsx";

export const CardProp = (props) => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const param = useParams()
    let images = props.images.map((i)=>{return(i.url)});
    
    return (
        store.auth? 
        <>
            <div className="col-12 my-2">
                <div className="m-1 border border-2 rounded-3 row px-2 py-3">
                    <div className="col-12">
                        <div className="col-sm-12 col-xl-12">
                            <Carousel imagesUrl={images}/>
                        </div>
                        <div className="card-body px-0 py-0 col-sm-12 col-xl-12">
                            <h4 className="fw-bold m-2">{props.title}</h4>
                            <p className="card-text m-2"><small>{props.description}</small></p>
                            <p className="card-text m-2">{props.wifi ? <small>Wifi: ✔️</small> : <small>Wifi: ✖️</small>}</p>
                            <p className="card-text m-2">{props.parking ? <small>Estacionamiento: ✔️</small> : <small>Estacionamiento: ✖️</small>}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between px-3 float-end">
                        <div>
                            <p className="card-text col-10"><small className="text-body-secondary">{props.location}</small></p>
                            <p className="card-text">
                                <small className="text-body-secondary">{props.category} a </small>{props.category == "Venta" ? 
                                <small>USD${props.price}</small> : 
                                <small>${props.price}</small>}
                            </p>
                        </div>
                        <div className="my-auto">
                            <button className="btn" onClick={()=>{navigate("/editar/mis-propiedades/" + props.id)}}>
                                <i className="fa-solid fa-pencil"></i>
                            </button>
                            <button className="btn" onClick={async() => {await actions.deletePost(props.id), window.location.reload(true)}}>
                                <i className="fa-solid fa-trash text-danger"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        : null
    );
}

CardProp.propTypes = {

    location: PropTypes.string,
    id: PropTypes.number,
    images: PropTypes.array,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    parking: PropTypes.bool,
    wifi: PropTypes.bool,

};