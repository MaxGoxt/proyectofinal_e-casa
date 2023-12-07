
import React, { useContext, useState, useRef, useEffect, useLayoutEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { GSignUp } from "./signup_google.jsx";
import { useFormik } from "formik";
import * as Yup from 'yup';
import "../../styles/SingUp.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { Map } from 'mapbox-gl';
// import { Loading } from './'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '../../styles/prueba.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import PropTypes from "prop-types";

export const MapaHome = (props) => {
    // useEffect(() => {
    // }, []);
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    let mark = null
    // console.log("este", mark)
    const [longituD, setLongituD] = useState()
    const [latituD, setLatituD] = useState()
    const [prueba, setPrueba] = useState()



    // console.log(longituD, latituD)
    // console.log(lati, long)
    // const [mapa, setMapa] = useState(null)
    const mapa = useRef(null)
    const mapaconteiner = useRef(null)
    // console.log("propsHome ", props.Datos_Casas)

    const misEstilos = {
        display: "table",
        position: "relative",
        wordWrap: "anywhere",
        whiteSpace: "pre - wrap",
        margin: "0px auto",
        padding: "10px",
        border: "none",
        borderRadius: "3px",
        fontSize: "12px",
        textAlign: "center",
        color: "#222",
        background: "#fff"
    };

    // let lastMarker3 = null
    // const lastMarker2 = null
    // const [lastMarker, setLastMarker] = useState(null)
    // const [lastMarker2, setLastMarker2] = useState(null)
    useEffect(() => {
        setPrueba(props.Datos_Casas)
    }, [props.Datos_Casas]);
    // console.log(mapa)


    // useEffect(() => {
    //     if (lastMarker != null) {
    //         lastMarker.remove()
    //     }
    // }, [lastMarker2]);
    // // console.log(mapa)

    // useEffect(() => {
    //     if (lastMarker2 != null) {
    //         lastMarker2.remove()
    //     }
    // }, [lastMarker]);
    // // console.log(mapa)
    if (props.marcador) {
        props.marcador.remove()
    }
    // console.log("maxi_no_sabe ", prueba)
    const initializeMap = () => {
        if (mapa.current) {
            return
        }
        // Crea una nueva instancia de un mapa de Mapbox
        const map = new mapboxgl.Map({
            container: mapaconteiner.current, // Asocia el mapa al elemento con el ID 'mapi'
            style: 'mapbox://styles/mapbox/streets-v12', // Usa el estilo de mapa predeterminado de Mapbox
            center: [-56.712822, -34.340986], // Establece el centro del mapa en coordenadas específicas (longitud y latitud)
            zoom: 14, // Establece el nivel de zoom inicial
            // cooperativeGestures: true
        });

        mapa.current = map


        // Crea una nueva instancia del geocodificador de Mapbox
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken, // Asigna el token de acceso de Mapbox
            language: 'en-EN', // Establece el idioma del geocodificador (en inglés)
            mapboxgl: mapboxgl // Asigna la biblioteca de Mapbox a utilizar
        });
        // Agrega el geocodificador al mapa
        map.addControl(geocoder);
    };
    // Llama a la función de inicialización del mapa cuando el componente se monta
    useEffect(() => {
        if (!mapaconteiner.current) {
            return
        }
        initializeMap();
    }, [mapaconteiner.current, props.Datos_Casas]);



    // function marcador(lat, lon) {
    //     console.log(lat, lon)
    //     const popup = new mapboxgl.Popup({ offset: 25 }).setText(
    //         'Construction on the Washington Monument began in 1848.'
    //     );
    //     // if (lastMarker3 != null) {

    //     // }
    //     let marker2 = new mapboxgl.Marker({ color: 'red', rotation: 0 })
    //         .setLngLat([lat, lon])
    //         .setPopup(popup)


    //     marker2.addTo(mapa.current);


    //     lastMarker3 = marker2
    //     console.log(lastMarker3)
    //     lastMarker3.remove()

    //     // setTimeout(() => {

    //     //     marker2.remove()


    //     // }, 3000);

    // }
    let lastMarkers = []; // Almacena los marcadores anteriores
    console.log("pepeeeeee => ", lastMarkers)
    let lastPopups = []; // Almacena los popups asociados a los marcadores

    useEffect(() => {
        // console.log(mapa.current)

        if (!mapa.current) {
            return
        }



        function marcador(lat, lon) {
            console.log(lat, lon);
            // Crear un nuevo marcador y popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                'Construction on the Washington Monument began in 1848.'
            );
            let marker = new mapboxgl.Marker({ color: 'red', rotation: 0 })
                .setLngLat([lat, lon])
                .setPopup(popup)
                .addTo(mapa.current); // Asumiendo que `mapa.current` es tu mapa
            // Agregar el nuevo marcador y popup a las listas correspondientes
            lastMarkers.push(marker);
            // lastPopups.push(popup);
            // Eliminar los marcadores y popups anteriores del mapa
            // if (lastMarkers.length > 1) {
            //     let removedMarker = lastMarkers.shift();
            //     let removedPopup = lastPopups.shift();
            //     removedMarker.remove();
            //     removedPopup.remove();
            // }
        }
        // if (props.Datos_Casas) {
        const alquileres_casas = props.Datos_Casas?.map((item, index) => {
            // console.log(item.longitud, item.latitud, item.category)
            if (lastMarkers[0]) {
                lastMarkers.map((item) => {
                    // item.remove()
                    return item.remove()
                })
            }
            // lastMarkers = []
            return marcador(item.longitud, item.latitud, item.category)
        });

        console.log("propsHome ", props.Datos_Casas[0]?.category)



    }, [lastMarkers, props.Datos_Casas[0]?.category])




    return (
        <div className=" ">
            <div className=''>
                <pre id="info" style={misEstilos}></pre>
                {/* <div id="geocoder" className="  geocoder"></div> */}
                <div className='col-12 '>
                    <div id='mapi' ref={mapaconteiner}
                        style={{
                            // backgroundColor: 'red',
                            height: '500px',
                            width: '100vw',
                        }}
                    >
                    </div>
                </div>
            </div>
        </div>
    )
}



MapaHome.propTypes = {
    Datos_Casas: PropTypes.array,


};
export default MapaHome;
