import React, { useState, useRef, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";

export const UploadImages = () => {
    const { store, actions } = useContext(Context)
    const [files, setFiles] = useState(null);
    const [images, setImages] = useState("")

    const title = useRef();
    const description = useRef();
    const category = useRef();
    const location = useRef();
    const number_of_rooms = useRef();
    const number_of_bathrooms = useRef();
    const parking = useRef();
    const wifi = useRef();
    const virified_account = useRef();
    const price = useRef();

    const getImages = async () => {
        // console.log("cambiar id de la imagen a pedir")
        try {
            const data = await fetch(process.env.BACKEND_URL + "/api/gethouse/1")
            const response = await data.json();
            // console.log(response);
            // console.log(response.results.image_url);
            setImages(response.results.image_url);
        } catch (error) {
            console.log(error);
        }
    }

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

    const uploadImage = evt => {
        evt.preventDefault();

        const { 
            categorySelected,
            wifiSelected,
            parkingSelected 
        } = checkRadioButtons();

        const acceptedFormats = ["png", "jpg", "jpeg"];
        let canBeUsed = false;

        acceptedFormats.forEach(format => {
            if (files[0].type.includes(format)) {
                canBeUsed = true;
            }
        })

        if (canBeUsed == false) alert("El formato no es el correcto debe ser png, jpg o jpeg");

        if (title.current.value === "") alert("El titulo esta vacio");
        if (categorySelected === undefined) alert("Selecciona una categoria");
        if (description.current.value === "") alert("La descripción esta vacio");
        if (location.current.value === "") alert("La ubicación esta vacio");
        if (number_of_rooms.current.value === "") alert("El número de cuartos esta vacio");
        if (number_of_bathrooms.current.value === "") alert("El número de baños esta vacio");
        if (parking === false ) alert("Selecciona si tiene parking o no");
        if (wifi === false ) alert("Selecciona si tiene wifi o no");
        if (price.current.value === "") alert("El precio esta vacio");

        const formData = new FormData();
        formData.append('image', files[0]); // Agrega la imagen al FormData
        formData.append('json_data', JSON.stringify({
            title: title.current.value,
            category: categorySelected,
            description: description.current.value,
            location: location.current.value,
            number_of_rooms: number_of_rooms.current.value,
            number_of_bathrooms: number_of_bathrooms.current.value,
            parking: parkingSelected,
            wifi: wifiSelected,
            virified_account: true,
            price: price.current.value
        }));

        const options = {
            body: formData,
            headers : {"Authorization" : "Bearer " + localStorage.getItem('token')},
            method: "POST",
        }

        try {
            const saveImage = async () => {
                await fetch(process.env.BACKEND_URL + "/api/post", options)
                    .then(() => getImages());
            }
            saveImage();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getImages();
    }, [])

    return (
        <div className="mt-5 bg-celeste-claro">
            <form onSubmit={uploadImage} className="d-flex flex-column align-items-center mt-4">
                <img src={images !== "" ? images : "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"} />
                <label htmlFor="file" className="mt-2">
                    <p className="btn btn-primary">Subir imagen</p>
                </label>
                <input type="file" id="file" className="mt-4 invisible" onChange={(e) => setFiles(e.target.files)} />
                <div className="mb-3 w-50">
                    <label htmlFor="title" className="form-label texto-amarillo">Titulo</label>
                    <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="title" aria-describedby="emailHelp" ref={title}/>
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="description" className="form-label texto-amarillo">Descripción</label>
                    <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="description" aria-describedby="emailHelp" ref={description}/>
                </div>
                <div className="mb-3 w-50 d-flex justify-content-center">
                    <div className="w-30">
                        <p className="text-center">Categoria</p>
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
                    <label htmlFor="location" className="form-label texto-amarillo">Ubicación</label>
                    <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="location" aria-describedby="emailHelp" ref={location}/>
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="number_of_rooms" className="form-label texto-amarillo">Nro° de cuartos</label>
                    <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="number_of_rooms" aria-describedby="emailHelp" ref={number_of_rooms}/>
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="number_of_bathrooms" className="form-label texto-amarillo">Nro° de baños</label>
                    <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="number_of_bathrooms" aria-describedby="emailHelp" ref={number_of_bathrooms}/>
                </div>
                <div className="mb-3 w-50 d-flex justify-content-center">
                    <div className="w-30">
                        <p className="text-center">¿Tiene wifi?</p>
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
                <div className="mb-3 w-50 d-flex justify-content-center">
                    <div className="w-30">
                        <p className="text-center">¿Tiene estacionamiento?</p>
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
                <div className="mb-3 w-50">
                    <label htmlFor="price" className="form-label texto-amarillo">Precio</label>
                    <input type="text" className="form-control bg-celeste-claro border-bottom border-top-0 border-end-0 border-start-0" id="price" aria-describedby="emailHelp" ref={price}/>
                </div>
                <button className="btn btn-primary">Subir casa</button>
            </form>
            <div className="d-flex justify-content-center">
            </div>

        </div>
    );
}
