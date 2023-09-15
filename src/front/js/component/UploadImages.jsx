import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";

export const UploadImages = () => {
    const { store, actions } = useContext(Context)
    const [files, setFiles] = useState(null);
    const [images, setImages] = useState([])

    const getImages = async () => {
        console.log("cambiar id de la imagen a pedir")
        try {
            const data = await fetch(process.env.BACKEND_URL + "/api/gethouse/1")
            const response = await data.json();
            console.log(response.results.image_url);
            setImages(response.results.image_url);
        } catch (error) {
            console.log(error);
        }
    }

    const uploadImage = evt => {
        evt.preventDefault();
        console.log("This are the files", files)
        console.log("cambiar user_id: para agregar imagen")

        const acceptedFormats = ["png", "jpg", "jpeg"];
        let canBeUsed = false;

        acceptedFormats.forEach(format => {
            if (files[0].type.includes(format)) {
                canBeUsed = true;
            }
        })

        if (canBeUsed == false) alert("El formato no es el correcto debe ser png, jpg o jpeg");

        const formData = new FormData();
        formData.append('image', files[0]); // Agrega la imagen al FormData
        formData.append('json_data', JSON.stringify({
            title: "Casa",
            category: "Alquiler",
            description: "asd",
            user_id: 1,
            location: "pa",
            number_of_rooms: 2,
            number_of_bathrooms: 3,
            parking: true,
            wifi: true,
            virified_account: true,
            price: 200
        }));

        const options = {
            body: formData,
            method: "POST",
        }

        try {
            const saveImage = async () => {
                await fetch(process.env.BACKEND_URL + "/api/post", options);
                getImages();
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
        <div className='mt-5'>
            <form onSubmit={uploadImage}>
                <input type="file" onChange={(e) => setFiles(e.target.files)} />
                <button>Upload</button>
            </form>
            <div>
                <img src={images != "" ? images : ""} />
            </div>

        </div>
    );
}
