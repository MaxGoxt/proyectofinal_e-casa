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
    let lastMarker = null
    let lastMarker2 = null


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
            zoom: 1, // Establece el nivel de zoom inicial
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


    useLayoutEffect(() => {
        // console.log(mapa.current)
        if (!mapa.current) {
            return
        }
        function marcador(lat, lon, des) {
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                'Construction on the Washington Monument began in 1848.'
            );

            // if (mark) {
            //     console.log(mark)
            //     mark.remove()
            // }

            if (des == "Alquiler") {
                if (lastMarker) {
                    lastMarker.remove()

                }

                if (lastMarker2) {
                    lastMarker2.remove()
                }

                let marker2 = new mapboxgl.Marker({ color: 'red', rotation: 0 })
                    .setLngLat([lon, lat])
                    .setPopup(popup)

                lastMarker2 = marker2
                // setLatituD(lat.toString())
                // setLongituD(lon.toString())

                marker2.addTo(mapa.current);
                // mark = marker2
                // console.log(lastMarker)
            } else {


                if (lastMarker2) {
                    lastMarker2.remove()

                }
                if (lastMarker) {
                    lastMarker.remove()

                }

                let marker1 = new mapboxgl.Marker({ color: 'red', rotation: 0 })
                    .setLngLat([lon, lat])
                    .setPopup(popup)

                lastMarker = marker1
                // setLatituD(lat.toString())
                // setLongituD(lon.toString())

                marker1.addTo(mapa.current);
                // mark = marker2
                // console.log(lastMarker)
            }



        }
        if (props.Datos_Casas) {
            let pepe = []
            if (props.Datos_Casas.category = "Alquiler") {
                const alquileres_casas = props.Datos_Casas?.map((item, index) => {
                    pepe.push(item)
                    console.log(item.longitud, item.latitud, item.category)
                    marcador(item.longitud, item.latitud, item.category)

                });
            } else {
                const ventas_casas = props.Datos_Casas?.map((item, index) => {
                    pepe.push(item)
                    console.log(item.longitud, item.latitud, item.category)
                    marcador(item.longitud, item.latitud, item.category)

                });
            }

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

    }, [mark, mapa.current, store.alquileres, props.Datos_Casas])

    function name() {
        //   if (mark) {
        // console.log(mark)
        lastMarker.remove()
        // }
    }

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




MapaHome.propTypes = {

    Datos_Casas: PropTypes.array,


};

export default MapaHome;