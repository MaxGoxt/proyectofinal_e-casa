import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { Map } from 'mapbox-gl';
// import { Loading } from './'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '../../styles/prueba.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Carousel } from './Carousel.jsx';

const schema = Yup.object().shape({
    title: Yup.string()
        .min(4, 'Demasiado corto!')
        .max(150, 'Demasiado largo!')
        .required('Obligatorio'),
    description: Yup.string()
        .min(40, 'Demasiado corto!')
        .max(300, 'Demasiado largo!')
        .required('Obligatorio'),
    location: Yup.string()
        .min(20, 'Demasiado corto!')
        .max(150, 'Demasiado largo!')
        .required('Obligatorio'),
    numberOfRooms: Yup.number()
        .required("Conocer la cuartos es obligatorio")
        .positive("La cantidad de cuartos debe ser positiva")
        .required('Obligatorio'),
    numberOfBathrooms: Yup.number()
        .required("Conocer la cantidad de cuartos es obligatorio")
        .positive("La cantidad de baños debe ser positiva"),
    // .required('Obligatorio'),
    price: Yup.number()
        .required("Conocer el precio es obligatorio")
        .positive("El precio debe ser positivo")
        .required('Obligatorio'),

})

export const UploadImages = () => {
    const { store, actions } = useContext(Context);
    const [imagesUrl, setImagesUrl] = useState([]);
    const [isCategorySelected, setIsCategorySelected] = useState(true);
    const [isWifiSelected, setIsWifiSelected] = useState(true);
    const [isParkingSelected, setIsParkingSelected] = useState(true);
    let mark = null
    console.log("este", mark)
    const [longituD, setLongituD] = useState()
    const [latituD, setLatituD] = useState()




    console.log(longituD, latituD)
    // console.log(lati, long)
    // const [mapa, setMapa] = useState(null)
    const mapa = useRef(null)
    const mapaconteiner = useRef(null)




    const category = useRef();
    const parking = useRef();
    const wifi = useRef();

    const navigate = useNavigate();

    const checkRadioButtons = () => {
        let categorySelected = undefined;
        let wifiSelected = false;
        let parkingSelected = false;

        // CATEGORY
        const alquilerBtn = category.current.childNodes[0].childNodes[0];
        const ventaBtn = category.current.childNodes[1].childNodes[0];

        if (alquilerBtn.checked) {
            categorySelected = alquilerBtn.value;
        } else if (ventaBtn.checked) {
            categorySelected = ventaBtn.value;
        } else {
            setIsCategorySelected(false);
        }

        // WIFI
        const wifiBtn = wifi.current.childNodes[0].childNodes[0];

        if (wifiBtn.checked) {
            wifiSelected = true;
        } else if (!wifiBtn.checked) {
            wifiSelected = false;
        } else {
            setIsWifiSelected(false);
        }

        // PARKING
        const parkingBtn = parking.current.childNodes[0].childNodes[0];

        if (parkingBtn.checked) {
            parkingSelected = true;
        } else if (!parkingBtn.checked) {
            parkingSelected = false;
        } else {
            setIsParkingSelected(false);
        }

        return {
            categorySelected,
            wifiSelected,
            parkingSelected
        }
    }

    const submitForm = values => {
        // values.preventDefault();
        const {
            categorySelected,
            wifiSelected,
            parkingSelected
        } = checkRadioButtons();

        if ((categorySelected === "Alquiler" || categorySelected === "Venta") && isWifiSelected && isParkingSelected && imagesUrl.length > 4) {
            const formData = new FormData();
            formData.append('json_data', JSON.stringify({
                imagesUrl,
                title: values.title,
                category: categorySelected,
                description: values.description,
                location: values.location,
                latitud: latituD,
                longitud: longituD,
                number_of_rooms: Number(values.numberOfRooms),
                number_of_bathrooms: Number(values.numberOfBathrooms),
                parking: parkingSelected,
                wifi: wifiSelected,
                virified_account: true,
                price: Number(values.price)
            }));

            const options = {
                body: formData,
                headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
                method: "POST",
            }

            try {
                const saveImage = async () => {
                    await fetch(process.env.BACKEND_URL + "/api/post", options)
                        .then(() => navigate("/"))
                }
                saveImage();
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Info cannot be send");
        }

    }

    const { handleSubmit, handleChange, errors } = useFormik({
        initialValues: {
            title: "",
            description: "",
            location: "",
            numberOfRooms: 0,
            numberOfBathrooms: 0,
            price: 0,
        },
        onSubmit: submitForm,
        validationSchema: schema,
    });

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

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
            zoom: 14, // Establece el nivel de zoom inicial
            cooperativeGestures: true

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
        })
    }, [mapaconteiner.current]);


    useEffect(() => {
        // console.log(mapa.current)
        if (!mapa.current) {
            return
        }
        function marcador(lat, lon, des) {


            if (mark) {
                console.log(mark)
                mark.remove()
            }

            let marker2 = new mapboxgl.Marker({ color: 'red', rotation: 0 })
                .setLngLat([lon, lat])

            // lastMarker = marker2
            setLatituD(lat.toString())
            setLongituD(lon.toString())

            marker2.addTo(mapa.current);
            mark = marker2
           

        }



        // Define un evento que se activa cuando el mapa se hace clic
        mapa.current.on('click', (e) => {

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
            marcador(latitud, longitud,)


        });

    }, [mark, mapa.current])




    return (
        <div className="d-flex flex-column mt-5 bg-celeste-claro">
            <h3 className="text-center pt-4 azul-oscuro my-4 fs-1 bold">Acá puedes publicar tu propiedad</h3>
            <Carousel imagesUrl={imagesUrl} />
            <button ref={widgetRef} className="btn bg-azul-oscuro text-white mx-auto mt-5" onClick={() => widgetRef.current.open()}>
                SUBIR IMAGEN
            </button>
            <span style={{ fontSize: "12px", color: "rgba(0, 0, 0, .6)" }} className="mx-auto">sube 5 imagenes o más</span>
            <form
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center mt-4">
                <div className="mb-3 w-50">
                    <label htmlFor="title" className="form-label azul-oscuro fw-bolder">Titulo</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="title" aria-describedby="emailHelp" />
                    {errors.title && <span className="text-danger fw-bold">{errors.title}</span>}
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="description" className="form-label azul-oscuro fw-bolder">Descripción</label>
                    <input
                        type="text"
                        name="description"
                        onChange={handleChange}
                        className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="description"
                        aria-describedby="emailHelp" />
                    {errors.description && <span className="text-danger fw-bold">{errors.description}</span>}
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <div className='w-100'>
                        <p className="text-center azul-oscuro fw-bolder mx-5 px-5">Categoria</p>
                        <div className="d-flex justify-content-around" ref={category}>
                            <div className="form-check">
                                <input style={{ scale: "2" }} className="form-check-input" type="radio" name="category" value="Alquiler" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Alquiler
                                </label>
                            </div>
                            <div className="form-check">
                                <input style={{ scale: "2" }} className="form-check-input" type="radio" name="category" value="Venta" id="flexRadioDefault2" />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Venta
                                </label>
                            </div>
                        </div>
                        {!isCategorySelected && <span className="text-danger fw-bold mx-auto" style={{ margin: "-12px" }}>Selecciona una categoria</span>}
                    </div>
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="location" className="form-label azul-oscuro fw-bolder">Ubicación</label>
                    <input type="text"
                        name="location"
                        onChange={handleChange}
                        className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0"
                        id="location"
                        aria-describedby="emailHelp" />
                    {errors.location && <span className="text-danger fw-bold">{errors.location}</span>}
                </div>
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
                <div className="row w-75 mt-5 mb-2">
                    <div className="mb-3 col-md-6">
                        <p className="text-center azul-oscuro fw-bolder">¿Tiene wifi?</p>
                        <div className="d-flex justify-content-center" ref={wifi}>
                            <div className="checkbox-wrapper-10">
                                <input className="tgl tgl-flip" id="wifi" type="checkbox" />
                                <label style={{ scale: "1.5" }} className="tgl-btn" data-tg-off="No" data-tg-on="Si" htmlFor="wifi"></label>
                            </div>
                            {!isWifiSelected && <span className="mx-auto" style={{ margin: "-12px" }}>Selecciona una opción</span>}
                        </div>
                    </div>
                    <div className="mb-3 col-md-6">
                        <p className="text-center azul-oscuro fw-bolder">¿Tiene estacionamiento?</p>
                        <div className="d-flex justify-content-center" ref={parking}>
                            <div className="form-check me-3">
                                <div className="checkbox-wrapper-10">
                                    <input className="tgl tgl-flip" id="parking" type="checkbox" />
                                    <label style={{ scale: "1.5" }} className="tgl-btn" data-tg-off="No" data-tg-on="Si" htmlFor="parking"></label>
                                </div>
                            </div>
                            {!isParkingSelected && <span className="mx-auto" style={{ margin: "-12px" }}>Selecciona un opción</span>}
                        </div>
                    </div>
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="number_of_rooms" className="form-label azul-oscuro fw-bolder">N° de cuartos</label>
                    <input type="text"
                        name="numberOfRooms"
                        onChange={handleChange}
                        className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="number_of_rooms"
                        aria-describedby="emailHelp" />
                    {errors.numberOfRooms && <span className="text-danger fw-bold">{errors.numberOfRooms}</span>}
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="number_of_bathrooms" className="form-label azul-oscuro fw-bolder">N° de baños</label>
                    <input
                        type="text"
                        name="numberOfBathrooms"
                        onChange={handleChange}
                        className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0"
                        id="number_of_bathrooms"
                        aria-describedby="emailHelp" />
                    {errors.numberOfBathrooms && <span className="text-danger fw-bold">{errors.numberOfBathrooms}</span>}
                </div>

                <div className="mb-3 w-50">
                    <label htmlFor="price" className="form-label azul-oscuro fw-bolder">Precio</label>
                    <input
                        type="text"
                        name="price"
                        onChange={handleChange}
                        className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0"
                        id="price"
                        aria-describedby="emailHelp" />
                </div>
                <button type='submit' className="btn bg-azul-oscuro text-white">Subir casa</button>
            </form>
            <div className="d-flex justify-content-center">
            </div>
        </div>
    );
}