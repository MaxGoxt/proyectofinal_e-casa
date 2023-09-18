import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useParams, useLocation, Link } from 'react-router-dom';
import diego from "../../img/diego.jpg";
import { Comentarios } from '../component/comentarios_casas.jsx';
import { PanelCtrl } from "../component/panel_control.jsx";
import "../../styles/Details.css";

function Details() {
  const { store, actions } = useContext(Context)
  let param = useParams()
  useEffect(() => {
    // actions.getAlquileres()
    actions.getDetalles(param.id)
  }, [])




  return (
    <div className='details-container container mx-auto row d-flex cuerpo mt-5'>
      <div className="mt-3 d-block"></div>
      <Link to={"/"} className="text-decoration-none my-2 continue-navigation"><span className="text-dark w-25 my-4"><i class="fa-solid fa-arrow-left-long me-2"></i><span>Seguir navegando</span></span></Link>
      <div className="details-card-container col-12">
        <div className="card-header d-flex gap-2">
          <div className="col-12 main-image text-center col-md-6 rounded-start overflow-hidden">
            <img src={store.casa.image_url} className="object-fit-cover col-12" alt="..." />
          </div>
          <div className="d-flex flex-column smaller-images col-md-3 ">
            <img src={store.casa.image_url} className="object-fit-cover col-12 overflow-hidden" alt="..." />
            <img src={store.casa.image_url} className="object-fit-cover col-12 overflow-hidden" alt="..." />
          </div>
          <div className="d-flex flex-column smaller-images col-md-3 rounded-end overflow-hidden">
            <img src={store.casa.image_url} className="object-fit-cover h-50 overflow-hidden" alt="..." />
            <img src={store.casa.image_url} className="object-fit-cover h-50 overflow-hidden" alt="..." />
          </div>
        </div>


        <div className="card-body details-card-body">
          <h2 className="card-title">{store.casa.title}</h2>

          <p className="text-white bg-azul-oscuro d-flex details-btn justify-content-center btn my-4">{store.casa.category}</p>
          <h6 className='disponible'>Localización: {store.casa.location}</h6>
          <p className="card-text"><strong>Alojamiento entero: departamento con servicios incluidos. <br />Anfitrión: Armando A.</strong></p>
          <p className='detalle'>{store.casa.numberOfRooms} Habitaciones - {store.casa.numberOfBathrooms} Baños - 250mt2 </p>

        </div>
        <ul className="list-group details-list-group list-group-flush">
          <div className='d-flex justify-content-between'>
            <div>
              <p className='mb-0'><strong>${store.casa.price} Mensual </strong></p>
              <p className='disponible mb-0'>Disponible ahora</p>
            </div>
            <Link to={"/perfilprop"}><button type="submit" className="btn text-white bg-azul-oscuro  mx-auto rounded my-4 me-3 details-btn">Alquilar</button></Link>
          </div>
          <li className="list-group-item details-list-group bg-celeste-claro mt-4 ms-0 ps-0"><p className="ps-0 ms-0">{store.casa.description}</p></li>
          <div className='d-flex mt-2 '>
            <div className=''>
              <li className="list-group-item details-list-group duenio"><p>Dueño: Pablo Bullor</p> <br />
                <p className='registro'>Se registró en mayo del 2015</p>
              </li>
            </div>

            <img src={diego} style={{ width: "50px", height: "50px" }} className="rounded-circle" alt="..." />
          </div>

          <li className="list-group-item details-list-group bg-celeste-claro ps-0 ms-0 mt-4">Soy de Uruguay, Sudamérica

            Alterno viviendo entre la capital Montevideo y Punta del Este en el departamento de Maldonado. Punta Ballena es uno de los lugares más bonitos de Sudamérica en Punta del Este.</li>
        </ul>
        <h5 className='mt-3 mb-2 comments'>Comentarios:</h5>
        <div className="comments d-flex " style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory' }}>
          <Comentarios />
          <Comentarios />
          <Comentarios />
          <Comentarios />
          <Comentarios />
          <Comentarios />
          <Comentarios />
          <Comentarios />

        </div>

      </div>{
        store.auth ?
          <PanelCtrl /> : null
      }</div>
  );
};





export default Details
