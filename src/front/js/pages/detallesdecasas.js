
import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';
import { Context } from "../store/appContext";
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  const nav = useNavigate()
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
        center: [longitud, latitud],
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
    <div className='details-container mx-auto row d-flex cuerpo mt-5 azul-oscuro bg-celeste-claro'>
      <div className="details-card-container col-12 mt-4">
        {/* <button onClick={()=>{navigate("/")}} className="btn btn-outline-secondary rounded-pill my-4"><span class="w-25 my-5 pb-3 fs-4"><i class="fa-solid fa-arrow-left-long me-2"></i>Seguir navegando</span></button> */}
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
            <button className="carousel-control-prev bg-black" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next bg-black" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="card-body details-card-body">
          <h2 className="mb-3">{store.casa.title}</h2>
          <p className="text-white footer col-12 text-center p-2 rounded mb-5">{store.casa.category}</p>
          <h6 className='disponible'>Localización: {store.casa.location}</h6>
          <div className='ubumapa' ref={mapaconteiner} id='map2'
            style={{
              // backgroundColor: 'red',
              height: '300px',
              width: '100%',
            }
            }>
          </div>
          <p className='detalle'>{store.casa.numberOfRooms} Habitaciones - {store.casa.numberOfBathrooms} Baños - 250mt2 </p>
          <ul className="list-group list-group-flush azul-oscuro">
            <div className='px-3 mt-2 row'>
              <p className="bg-celeste-claro mt-4 col-md-10">{store.casa.description}</p>
              <div className='col-md-2 mb-5'>
                <li className="list-group-item border-0 bg-celeste-claro"><strong>${store.casa.price} {store.casa.category == "Alquiler" ? "Mensual" : null} </strong></li>
                <li className='list-group-item bg-celeste-claro border-0'>Disponible ahora</li>
              </div>
              <div className='text-center col-md-3'>
                {store.casa.info_propietario?.profile_picture == ""
                  ? <img src={defaultUserImage} style={{ width: "50px", height: "50px" }} className="rounded-circle my-3 mx-5" alt="profile picture" />
                  : <img src={store.casa.info_propietario?.profile_picture} style={{ width: "50px", height: "50px" }} className="rounded-circle my-3 mx-5" alt="profile picture" />
                }
                <li className='list-group-item border-0 bg-celeste-claro'>{store.casa.info_propietario?.name} {store.casa.info_propietario?.lastname}</li>
                <li className='list-group-item border-0 bg-celeste-claro'>{store.casa.info_propietario?.account_creation_date}</li>
                <button onClick={() => { nav("/perfilprop") }} className="text-white bg-azul-oscuro btn my-auto px-5">Contacto</button>
              </div>
              <li className="list-group-item bg-celeste-claro border-0 col-md-9 m-auto">{store.casa.info_propietario?.description}</li>
            </div>
          </ul>
        </div>
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
