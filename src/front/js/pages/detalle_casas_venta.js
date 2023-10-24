import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useParams, useLocation, Link } from 'react-router-dom';
import diego from "../../img/diego.jpg";
import { Comentarios } from '../component/comentarios_casas.jsx';
import { PanelCtrl } from "../component/panel_control.jsx";



function Detailsventas() {

  const defaultUserImage = "https://www.svgrepo.com/show/335455/profile-default.svg"

  const { store, actions } = useContext(Context)
  let param = useParams()
  useEffect(() => {
    // actions.getVentas()
    actions.getPerfilProp(store.casa.user_id)
    actions.getDetalles(param.id);
  }, [])




  return (

    <div className='row d-flex cuerpo mt-5 '>
      <div className="col-12 bg-white" style={{ width: "90rem" }}>
        <Link to={"/"}><button type="submit" className="btn text-white bg-azul-oscuro  rounded-pill w-25 my-4">Volver</button></Link>
        <img src={store.casa.image_url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h2 className="card-title">{store.casa.title}</h2>
          <p className="text-white bg-azul-oscuro d-flex justify-content-center w-25 btn my-4">{store.casa.category}</p>
          <h6 className='disponible'>Localización: {store.casa.location}</h6>
          <p className='detalle'>{store.casa.numberOfRooms} Habitaciones - {store.casa.numberOfBathrooms} Baños - 250mt2 </p>
        </div>
        <ul className="list-group list-group-flush">
          <div className='d-flex justify-content-between'>
            <p className='ms-3'><strong>U$S {store.casa.price}<br /> </strong><p className='disponible'>Disponible ahora</p></p><button type="submit" className="btn text-white bg-azul-oscuro  mx-auto rounded-pill w-25 my-4 me-3 " ><Link to={"/perfilprop"} style={{ textDecoration: "none", color: "#fff" }}>Contacto</Link></button>
          </div>
          <li className="list-group-item bg-celeste-claro mt-4">{store.casa.description} </li>
          <div className='d-flex mt-4'>
            <div className='ms-3'>
              <li className="list-group-item duenio">Dueño: {store.casa.info_propietario?.name} {store.casa.info_propietario?.lastname}<br />
                <p className='registro'>{store.casa.info_propietario?.account_creation_date}</p>
              </li>
            </div>
            {store.casa.info_propietario?.profile_picture == ""
              ? <img src={defaultUserImage} style={{ width: "50px", height: "50px" }} className="rounded-circle " alt="profile picture" />
              : <img src={store.casa.info_propietario?.profile_picture} style={{ width: "50px", height: "50px" }} className="rounded-circle " alt="profile picture" />
            }
          </div>
          <li className="list-group-item bg-celeste-claro mt-4">
            {store.casa.info_propietario?.description}
          </li>
        </ul>
      </div>
      <PanelCtrl />
    </div>
  );
};





export default Detailsventas