
import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';
import { Context } from "../store/appContext";
import { useParams, useLocation, Link } from 'react-router-dom';
import diego from "../../img/diego.jpg";
import { Comentarios } from '../component/comentarios_casas.jsx';
import { PanelCtrl } from "../component/panel_control.jsx";
import "../../styles/Details.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { Map } from 'mapbox-gl';
import { placeholder } from '@mapbox/mapbox-gl-geocoder/lib/localization.js';
// import PlacesContext from '../context';
// import { Loading } from './'
function Details() {
  const defaultUserImage = "https://www.svgrepo.com/show/335455/profile-default.svg"
  const { store, actions } = useContext(Context)
  const { isLoading, setLoading } = useContext(Context);
  let param = useParams()
  useEffect(() => {
    actions.getDetalles(param.id)
    actions.getPerfilProp(store.casa.info_propietario?.user_id)
  }, [])
  // console.log("es esteeee", store.casa?.longitud, store.casa?.latitud)
  // const mapDiv = useRef < HTMLDivElement > (null);
  // const mapaDiv2 = useRef();
  const mapa = useRef(null)
  const mapaconteiner = useRef(null)
  let markDetalle = null
  const [longituddeta, setLongituddeta] = useState(0)
  const [latituddeta, setLatitudeta] = useState(0)
  // const { isLoading, userLocation } = useState(Context)
  //api de clave de mapbox


  const longitud = parseFloat(store.casa?.longitud);
  const latitud = parseFloat(store.casa?.latitud);

  useEffect(() => {
    if (store.casa?.longitud && store.casa?.latitud) {
      setLongituddeta(parseFloat(store.casa.longitud));
      setLatitudeta(parseFloat(store.casa.latitud));
      console.log("funca")
    }
  }, [store.casa]);

  // const initializeMap = () => {
  //   if (mapa.current) {

  //     return
  //   }
  //   // Crea una nueva instancia de un mapa de Mapbox
  //   const map = new mapboxgl.Map({
  //     container: mapaconteiner.current, // Asocia el mapa al elemento con el ID 'mapi'
  //     style: 'mapbox://styles/mapbox/streets-v12', // Usa el estilo de mapa predeterminado de Mapbox
  //     center: [-56.712822, -34.340986], // Establece el centro del mapa en coordenadas específicas (longitud y latitud)
  //     zoom: 14 // Establece el nivel de zoom inicial
  //   });
  //   // if (markDetalle) {
  //   //   console.log("detalle  ", markDetalle)
  //   //   markDetalle.remove()
  //   // }

  //   mapa.current = map

  // }

  // useEffect(() => {

  //   if (!mapaconteiner.current) {
  //     return
  //   }

  //   initializeMap();

  //   if (markDetalle) {
  //     console.log(markDetalle)
  //     markDetalle.remove()
  //   }
  // }, [mapaconteiner.current, isLoading, longituddeta, latituddeta]);

  useEffect(() => {
    if (!mapaconteiner.current || !store.casa || isNaN(longitud) || isNaN(latitud)) return;

    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapaconteiner.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [store.casa?.longitud, store.casa?.latitud],
        zoom: 12,
      });

      mapa.current = newMap;
    };

    initializeMap();

    return () => {
      if (mapa.current) {
        mapa.current.remove(); // Eliminar el mapa antes de re-crear uno nuevo
      }
    };
  }, [store.casa]);

  useEffect(() => {
    if (!mapa.current) {
      return;

    }
    if (markDetalle) {
      console.log(markDetalle)
      markDetalle.remove()
    }

    // Verificar si las coordenadas son números válidos

    if (!isNaN(longitud) && !isNaN(latitud)) {
      console.log("Coordenadas válidas:", longitud, latitud);
      // Crear el marcador solo si las coordenadas son válidas

      let marker2Detalle = new mapboxgl.Marker({ color: 'red', rotation: 0 })
        .setLngLat([longitud, latitud])
        .addTo(mapa.current);
      // markDetalle = marker2Detalle
      // markDetalle.remove()
    } else {
      console.log("Coordenadas no válidas");
    }
  }, [mapa.current, store.casa?.longitud, store.casa?.latitud, store.casa],);
  return (
    <div className='details-container container mx-auto row d-flex cuerpo mt-5'>
      <Link to={"/"} className="text-decoration-none my-2 continue-navigation"><span className="text-dark w-25 my-4"><i className="fa-solid fa-arrow-left-long me-2"></i><span>Seguir navegando</span></span></Link>
      <div className="details-card-container col-12">
        <div className="card-header bigger-screen d-flex" style={{ height: "430px" }}>
          {store.casa?.images?.map((img, index) => (
            <img key={index} src={img.url} className="details-card-img" style={{ maxWidth: "100%", width: "20px", flexGrow: "1", objectFit: "cover", opacity: ".9", transition: ".5s ease" }} />
          ))}
        </div>
        <div id="carouselExampleControls" className="carousel slide mobile-images" data-bs-ride="true">
          <div className="carousel-inner" >
            <div className="carousel-inner" style={{ height: "300px" }}>
              {store.casa?.images?.map((img, index) => (
                <div key={index} className={`carousel-item justify-content-center text-center ${index === 0 && "active"}`}>
                  <img src={img.url} className="details-card-img" style={{ height: "300px" }} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="card-body details-card-body">
          <h2 className="card-title">{store.casa.title}</h2>
          <p className="text-white bg-azul-oscuro d-flex details-btn justify-content-center btn my-4">{store.casa.category}</p>
          <h6 className='disponible'>Localización: {store.casa.location}</h6>
          <div className='ubumapa' ref={mapaconteiner} id='map2'
            style={{
              // backgroundColor: 'red',
              height: '300px',
              width: '100vw',
            }
            }>
          </div>
          <p className='detalle'>{store.casa.numberOfRooms} Habitaciones - {store.casa.numberOfBathrooms} Baños - 250mt2 </p>
        </div>
        <ul className="list-group details-list-group list-group-flush">
          <div className='d-flex justify-content-between'>
            <div>
              <p className='mb-0'><strong>${store.casa.price} Mensual </strong></p>
              <p className='disponible mb-0'>Disponible ahora</p>
            </div>
            <button type="submit" className="text-white bg-azul-oscuro d-flex details-btn justify-content-center btn my-4 "><Link to={"/perfilprop"} style={{ color: '#ffffff', textDecoration: 'none' }}>Contacto</Link></button>
          </div>
          <li className="list-group-item details-list-group bg-celeste-claro mt-4 ms-0 ps-0"><p className="ps-0 ms-0">{store.casa.description}</p></li>
          <div className='d-flex mt-2 '>
            <div className=''>
              <li className="list-group-item details-list-group duenio"><p>{store.casa.info_propietario?.name} {store.casa.info_propietario?.lastname}</p> <br />
                <p className='registro'>{store.casa.info_propietario?.account_creation_date}</p>
              </li>
            </div>
            {store.casa.info_propietario?.profile_picture == ""
              ? <img src={defaultUserImage} style={{ width: "50px", height: "50px" }} className="rounded-circle " alt="profile picture" />
              : <img src={store.casa.info_propietario?.profile_picture} style={{ width: "50px", height: "50px" }} className="rounded-circle " alt="profile picture" />
            }
          </div>
          <li className="list-group-item details-list-group bg-celeste-claro ps-0 ms-0 mt-4">
            {store.casa.info_propietario?.description}
          </li>
        </ul>
        {/* <h5 className='mt-3 mb-2 comments'>Comentarios:</h5> */}
        {/* <div className="comments d-flex " style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory' }}>
          <Comentarios />
          <Comentarios />
          <Comentarios />
          <Comentarios />
          <Comentarios />
          <Comentarios />
          <Comentarios />
          <Comentarios />
        </div> */}
      </div>
      <PanelCtrl />
    </div>
  );
};



export default Details
