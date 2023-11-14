
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from '../component/Carousel.jsx';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { Map } from 'mapbox-gl';
// import { Loading } from './'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '../../styles/prueba.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
export const EditProp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const param = useParams()
    const [imagesUrl, setImagesUrl] = useState([]);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
<<<<<<< HEAD

=======
>>>>>>> cda70dfdd531346436e871c7373c989ac75271a7
    let casa = store.casaPropietario[parseInt(param.id) - 1]
    let images = casa?.images.map((i) => { return (i.url) })
    let alquilerBtn, ventaBtn = undefined
    console.log("E", store.casaPropietario[parseInt(param.id) - 1])

    useEffect(() => {
        actions.getMyCasas();
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: process.env.CLOUDNAME,
            uploadPreset: process.env.UPLOAD_PRESET
        }, function (error, result) {
            if (result?.event === "success") {
                setImagesUrl((imagesUrl) => {
                    return [...imagesUrl, result.info.secure_url]
                })
            }
        });
        actions.getMyCasas()
        console.log(casa);

    }, [])
    const title = useRef();
    const description = useRef();
    const category = useRef();
    const location = useRef();
    const number_of_rooms = useRef();
    const number_of_bathrooms = useRef();
    const parking = useRef();
    const wifi = useRef();
    const price = useRef();


    //-------------Mapbox-------------//
    const mapaEdit = useRef(null)
    const mapaconteinerEdit = useRef(null)
    let markEdit = null
    const [longituEdit, setLongituEdit] = useState()
    const [latituEdit, setLatituEdit] = useState()
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



    const checkRadioButtons = () => {
        let categorySelected = undefined;
        let wifiSelected = false;
        let parkingSelected = false;
        // CATEGORY
        alquilerBtn = category.current.childNodes[0].childNodes[0];
        ventaBtn = category.current.childNodes[1].childNodes[0];
        if (alquilerBtn.checked) {
            categorySelected = alquilerBtn.value;
        } else if (ventaBtn.checked) {
            categorySelected = ventaBtn.value;
        }
        // WIFI
        const wifiTrueBtn = wifi.current.childNodes[0].childNodes[0];
        const wifiFalseBtn = wifi.current.childNodes[1].childNodes[0];
        if (wifiTrueBtn.checked) {
            wifiSelected = true;
        } else if (wifiFalseBtn.checked) {
            wifiSelected = false;
        }
        // PARKING
        const parkingTrueBtn = parking.current.childNodes[0].childNodes[0];
        const parkingFalseBtn = parking.current.childNodes[1].childNodes[0];
        if (parkingTrueBtn.checked) {
            parkingSelected = true;
        } else if (parkingFalseBtn.checked) {
            parkingSelected = false;
        }
        return {
            categorySelected,
            wifiSelected,
            parkingSelected
        }
    }
    const uploadImage = (id) => {
        const {
            categorySelected,
            wifiSelected,
            parkingSelected
        } = checkRadioButtons();
        const formData = new FormData();
        formData.append('json_data', JSON.stringify({
            imagesUrl: imagesUrl,
            title: title.current.value,
            category: categorySelected,
            description: description.current.value,
            location: location.current.value,
            latitud: latituEdit,
            longitud: longituEdit,
            number_of_rooms: number_of_rooms.current.value,
            number_of_bathrooms: number_of_bathrooms.current.value,
            wifi: wifiSelected,
            parking: parkingSelected,
            price: price.current.value,
            // virified_account: true,
        }));
        const options = {
            body: formData,
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
            method: "PUT",
        }
        try {
            const uploadProp = async () => {
                let response = await fetch(process.env.BACKEND_URL + "/api/post/" + id, options)
            }
            uploadProp();
        } catch (error) {
            console.log(error);
        }
    }




    const initializeMap = () => {
        if (mapaEdit.current) {
            return
        }
        // Crea una nueva instancia de un mapa de Mapbox
        const map = new mapboxgl.Map({
            container: mapaconteinerEdit.current, // Asocia el mapa al elemento con el ID 'mapi'
            style: 'mapbox://styles/mapbox/streets-v12', // Usa el estilo de mapa predeterminado de Mapbox
            center: [-56.712822, -34.340986], // Establece el centro del mapa en coordenadas específicas (longitud y latitud)
            zoom: 14 // Establece el nivel de zoom inicial
        });

        mapaEdit.current = map
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
        if (!mapaconteinerEdit.current) {
            return
        }
        initializeMap();

    }, [mapaconteinerEdit.current]);

    useEffect(() => {
        // console.log(mapaEdit.current)
        if (!mapaEdit.current) {
            return
        }
        function marcador(lat, lon, des) {

            if (markEdit) {
                console.log(markEdit)
                markEdit.remove()
            }
            let marker2Edit = new mapboxgl.Marker({ color: 'red', rotation: 0 })
                .setLngLat([lon, lat])
            // lastMarker = marker2
            setLatituEdit(lat.toString())
            setLongituEdit(lon.toString())
            marker2Edit.addTo(mapaEdit.current);
            markEdit = marker2Edit
            // console.log(lastMarker)
        }


        // Define un evento que se activa cuando el mapa se hace clic
        mapaEdit.current.on('click', (e) => {
            // Actualiza el contenido del elemento con ID 'info' con información sobre el clic
            document.getElementById('info').innerHTML =
                JSON.stringify(e.point.x + " . " + e.point.y) + // Coordenadas del clic en la pantalla
                '<br />' +
                JSON.stringify(e.lngLat.wrap().lng + "." + JSON.stringify(e.lngLat.wrap().lat)); // Coordenadas de longitud y latitud
            // Extrae la latitud y longitud del evento de clic
            let latitud = ""
            let longitud = ""
            latitud = parseFloat(JSON.stringify(e.lngLat.wrap().lat))
            longitud = parseFloat(JSON.stringify(e.lngLat.wrap().lng))
            // Crea un nuevo marcador de color rojo en la ubicación del clic
            marcador(latitud, longitud)

        });
    }, [markEdit, mapaEdit.current])


    return (
        <div className="d-flex flex-column mt-5 bg-celeste-claro">
            <h3 className="text-center pt-4">Acá puedes editar tu propiedad</h3>
            {store.auth ? <>
                <Carousel imagesUrl={images} />
                <button className="btn btn-primary mt-5 mx-auto" onClick={() => widgetRef.current.open()}>
                    SUBIR IMAGEN
                </button>
                <form onSubmit={(e) => { e.preventDefault(); uploadImage(param.id); navigate("/mis-propiedades/" + localStorage.getItem("user_id")) }} className="d-flex flex-column align-items-center mt-4">
                    <div className="mb-3 w-50">
                        <label htmlFor="title" className="form-label azul-oscuro fw-bolder">Titulo</label>
                        <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="title" aria-describedby="emailHelp" value={casa?.title} ref={title} />
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="description" className="form-label azul-oscuro fw-bolder">Descripción</label>
                        <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="description" aria-describedby="emailHelp" value={casa?.description} ref={description} />
                    </div>
                    <div className="mb-3 w-50 d-flex justify-content-center">
                        <div className="w-30">
                            <p className="text-center azul-oscuro fw-bolder">Categoría</p>
                            <div className="d-flex justify-content-center" ref={category}>
                                <div className="form-check me-3">
                                    <input className="form-check-input" type="radio" name="category" value="Alquiler" id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Alquiler
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="category" value="Venta" id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Venta
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="location" className="form-label azul-oscuro fw-bolder">Ubicación</label>
                        <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="location" aria-describedby="emailHelp" value={casa?.location} ref={location} />
                    </div>
                    <div className='row col-12'>
                        <pre id="info" style={misEstilos}></pre>
                        <div id="geocoder" className="  geocoder"></div>
                        <div className='row col-12 '>
                            <div id='mapi' ref={mapaconteinerEdit}
                                style={{
                                    // backgroundColor: 'red',
                                    height: '500px',
                                    width: '100vw',
                                }}>
                            </div>
                        </div>
                    </div>
                    <div className="w-50 d-flex justify-content-evenly mx-1 ">
                        <div className="mb-3 w-50 d-flex justify-content-around">
                            <div className="w-30 ">
                                <p className="text-center azul-oscuro fw-bolder ">¿Tiene wifi?</p>
                                <div className="d-flex justify-content-center" ref={wifi}>
                                    <div className="form-check me-3">
                                        <input className="form-check-input" type="radio" value="Si" name="wifi" id="siradio" />
                                        <label className="form-check-label" value="No" htmlFor="siradio">
                                            <p>Si</p>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value="No" name="wifi" id="noradio" />
                                        <label className="form-check-label" htmlFor="noradio">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 w-50 d-flex">
                            <div className="w-30">
                                <p className="text-center azul-oscuro fw-bolder">¿Tiene estacionamiento?</p>
                                <div className="d-flex justify-content-center" ref={parking}>
                                    <div className="form-check me-3">
                                        <input className="form-check-input" type="radio" value="Si" name="parking" id="siradio2" />
                                        <label className="form-check-label" value="No" htmlFor="siradio2">
                                            Si
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value="No" name="parking" id="noradio2" />
                                        <label className="form-check-label" htmlFor="noradio2">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="number_of_rooms" className="form-label azul-oscuro fw-bolder">N° de cuartos</label>
                        <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="number_of_rooms" aria-describedby="emailHelp" value={casa?.numberOfRooms} ref={number_of_rooms} />
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="number_of_bathrooms" className="form-label azul-oscuro fw-bolder">N° de baños</label>
                        <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="number_of_bathrooms" aria-describedby="emailHelp" value={casa?.numberOfBathrooms} ref={number_of_bathrooms} />
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="price" className="form-label azul-oscuro fw-bolder">Precio</label>
                        <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="price" aria-describedby="emailHelp" value={casa?.price} ref={price} />
                    </div>
                    <button type='submit' className="btn btn-primary">Editar casa</button>
                </form>
                <div className="d-flex justify-content-center">
                </div></>
                : <h2 className='text-danger m-auto mt-5'>🚫INAUTORIZADO🚫</h2>}
        </div>
    );
}
