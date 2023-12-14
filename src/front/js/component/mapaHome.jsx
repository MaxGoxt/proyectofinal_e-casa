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
import { element } from "prop-types";

export const MapaHome = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    let mark = null
    // console.log("este", mark)
    const [longituD, setLongituD] = useState()
    const [latituD, setLatituD] = useState()




    console.log(longituD, latituD)
    // console.log(lati, long)
    // const [mapa, setMapa] = useState(null)
    const mapa = useRef(null)
    const mapaconteiner = useRef(null)


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
    let lastMarker = ""


    // console.log(mapa)

    const initializeMap = () => {

        if (mapa.current) {
            return

        }
        // Crea una nueva instancia de un mapa de Mapbox
        const map = new mapboxgl.Map({
            container: mapaconteiner.current, // Asocia el mapa al elemento con el ID 'mapi'
            style: 'mapbox://styles/mapbox/streets-v12', // Usa el estilo de mapa predeterminado de Mapbox
            center: [-56.712822, -34.340986], // Establece el centro del mapa en coordenadas específicas (longitud y latitud)
            zoom: 14 // Establece el nivel de zoom inicial
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
    }, [mapaconteiner.current]);


    useLayoutEffect(() => {
        // console.log(mapa.current)
        if (!mapa.current) {
            return
        }
        function marcador(lat, lon, des) {


            // if (mark) {
            //     console.log(mark)
            //     mark.remove()
            // }

            let marker2 = new mapboxgl.Marker({ color: 'red', rotation: 0 })
                .setLngLat([lon, lat])

            // // lastMarker = marker2
            // setLatituD(lat.toString())
            // setLongituD(lon.toString())

            marker2.addTo(mapa.current);
            // mark = marker2
            // console.log(lastMarker)

        }
        if (store.alquileres) {
            let pepe = []

            const demo = store.alquileres?.map((item, index) => {
                pepe.push(item)
                console.log(item)
                marcador(item.longitud, item.latitud)

            });
            console.log("prueñashe ", pepe)

        }


        // store.alquileres?.map((item, index) => {
        //     pepe = console.log("prueba ", item, index)
        //     return pepe
        // })


        // // Define un evento que se activa cuando el mapa se hace clic
        // mapa.current.on('click', (e) => {

        //     // Actualiza el contenido del elemento con ID 'info' con información sobre el clic
        //     document.getElementById('info').innerHTML =
        //         JSON.stringify(e.point.x + " . " + e.point.y) + // Coordenadas del clic en la pantalla
        //         '<br />' +
        //         JSON.stringify(e.lngLat.wrap().lng + "." + JSON.stringify(e.lngLat.wrap().lat)); // Coordenadas de longitud y latitud

        //     // Extrae la latitud y longitud del evento de clic
        //     let latitud = ""
        //     let longitud = ""

        //     latitud = parseFloat(JSON.stringify(e.lngLat.wrap().lat))
        //     longitud = parseFloat(JSON.stringify(e.lngLat.wrap().lng))

        //     // Crea un nuevo marcador de color rojo en la ubicación del clic
        //     // marcador(latitud, longitud,)


        // });

    }, [mark, mapa.current, store.alquileres])


    return (

        <div>
            <div className='row col-12'>
                <pre id="info" style={misEstilos}></pre>
                {/* <div id="geocoder" className="  geocoder"></div> */}
                <div className='row col-12 '>
                    <div id='mapi' ref={mapaconteiner}
                        style={{
                            // backgroundColor: 'red',
                            height: '500px',
                            width: '100vw',
                        }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapaHome;