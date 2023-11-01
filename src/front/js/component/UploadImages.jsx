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



const schema = Yup.object().shape({
    title: Yup.string()
        .min(40, 'Demasiado corto!')
        .max(150, 'Demasiado largo!')
        .required('Required'),
    description: Yup.string()
        .min(40, 'Demasiado corto!')
        .max(300, 'Demasiado largo!')
        .required('Required'),
    location: Yup.string()
        .min(20, 'Demasiado corto!')
        .max(150, 'Demasiado largo!')
        .required('Required'),
    numberOfRooms: Yup.number()
        .required("Conocer la cuartos es obligatorio")
        .positive("La cantidad de cuartos debe ser positiva")
        .required('Required'),
    numberOfBathrooms: Yup.number()
        .required("Conocer la cantidad de cuartos es obligatorio")
        .positive("La cantidad de baños debe ser positiva")
        .required('Required'),
    price: Yup.number()
        .required("Conocer el precio es obligatorio")
        .positive("El precio debe ser positivo")
        .required('Required'),

})

export const UploadImages = () => {
    const { store, actions } = useContext(Context);
    const [imagesUrl, setImagesUrl] = useState([]);
    const [isCategorySelected, setIsCategorySelected] = useState(true);
    const [isWifiSelected, setIsWifiSelected] = useState(true);
    const [isParkingSelected, setIsParkingSelected] = useState(true);




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
        const wifiTrueBtn = wifi.current.childNodes[0].childNodes[0];
        const wifiFalseBtn = wifi.current.childNodes[1].childNodes[0];

        if (wifiTrueBtn.checked) {
            wifiSelected = true;
        } else if (wifiFalseBtn.checked) {
            wifiSelected = false;
        } else {
            setIsWifiSelected(false);
        }

        // PARKING
        const parkingTrueBtn = parking.current.childNodes[0].childNodes[0];
        const parkingFalseBtn = parking.current.childNodes[1].childNodes[0];

        if (parkingTrueBtn.checked) {
            parkingSelected = true;
        } else if (parkingFalseBtn.checked) {
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


    useEffect(() => {
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
    }, [])



    const mapaDiv2 = useRef();

    const { isLoading, userLocation } = useContext(Context)

    useLayoutEffect(() => {
        // verifica si "isLoading" es false para asegurarse de que los datos hayan terminado de cargar
        if (!isLoading) {
            // Crea una nueva instancia del mapa de Mapbox
            const map = new mapboxgl.Map({
                container: 'mapi',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-56.712822, -34.340986], // Establece el centro del mapa en coordenadas específicas
                zoom: 14
            });

            // Create a default Marker and add it to the map.
            const marker1 = new mapboxgl.Marker()
                .setLngLat([-56.712822, -34.340986])
                .addTo(map);


            map.on('click', (e) => {

                document.getElementById('info').innerHTML =
                    // `e.point` is the x, y coordinates of the `mousemove` event
                    // relative to the top-left corner of the map.
                    JSON.stringify(e.point.x + " . " + e.point.y) +

                    '<br />' +
                    // `e.lngLat` is the longitude, latitude geographical position of the event.
                    JSON.stringify(e.lngLat.wrap().lng + "." + JSON.stringify(e.lngLat.wrap().lat));

                let latitud = parseFloat(JSON.stringify(e.lngLat.wrap().lat))
                let longitud = parseFloat(JSON.stringify(e.lngLat.wrap().lng))
                let pepe = latitud
                // Create a default Marker, colored black, rotated 45 degrees.
                const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 0 })
                    .setLngLat([longitud, latitud])
                    .addTo(map);

                // console.log("este es LATITUD =    ", latitud)
                // console.log("este es LATITUD =    ", typeof latitud)
                // console.log("este es LONGITUD =    ", typeof longitud)
                // console.log("este es LONGITUD =    ", longitud)
                // console.log("pepe =    ", pepe)

            });
            // -56.727677,-34.346968


            // Crea una nueva instancia del geocodificador de Mapbox
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            });

            // Agrega el geocodificador al mapa
            document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
        }
    }), [isLoading] // Se ejecuta cada vez que isLoading cambia


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
    return (

        <div className="d-flex flex-column mt-5 bg-celeste-claro">
            <div>
                {
                    imagesUrl.map(item => (
                        <img src={item} style={{ width: '250px' }} />
                    ))}
            </div>
            <button className="btn btn-primary mt-5 mx-auto" onClick={() => widgetRef.current.open()}>
                SUBIR IMAGEN
            </button>
            <p style={{ fontSize: "12px", color: "rgba(0, 0, 0, .6)" }} className="mx-auto">sube 5 imagenes o más</p>
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
                    {errors.title && <span>{errors.title}</span>}
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="description" className="form-label azul-oscuro fw-bolder">Descripción</label>
                    <input
                        type="text"
                        name="description"
                        onChange={handleChange}
                        className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="description"
                        aria-describedby="emailHelp" />
                    {errors.description && <span>{errors.description}</span>}
                </div>
                <div className="mb-3 w-50 d-flex justify-content-center">
                    <div className="w-30">
                        <p className="text-center azul-oscuro fw-bolder">Categoria</p>
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
                        {!isCategorySelected && <span className="mx-auto" style={{ margin: "-12px" }}>Selecciona una categoria</span>}
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
                    {errors.location && <span>{errors.location}</span>}

                </div>


                <pre id="info" style={misEstilos}></pre>
                <div id="geocoder" className="  geocoder"></div>
                <div className='row col-12 '>
                    <div id='mapi'
                        style={{
                            // backgroundColor: 'red',
                            height: '500px',
                            width: '100vw',
                        }}>
                    </div>
                </div>
                <div className="w-50 d-flex justify-content-evenly mx-1 ">
                    <div className="mb-3 w-50 d-flex justify-content-around">
                        <div className="w-30">
                            <p className="text-center azul-oscuro fw-bolder">¿Tiene wifi?</p>
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
                            {!isWifiSelected && <span className="mx-auto" style={{ margin: "-12px" }}>Selecciona una opción</span>}
                        </div>
                    </div>
                    <div className="mb-3 w-50 d-flex justify-content-center">
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
                    {errors.numberOfRooms && <span>{errors.numberOfRooms}</span>}
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
                    {errors.numberOfBathrooms && <span>{errors.numberOfBathrooms}</span>}
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
                <button type='submit' className="btn btn-primary">Subir casa</button>
            </form>
            <div className="d-flex justify-content-center">
            </div>

        </div>
    );
}
