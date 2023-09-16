import React, { useState } from 'react';

export const EditUser = () => {
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState("");

    const getUserProfileImage = async () => {
        const options = {
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
            method: "GET",
        }

        try {
            const callApi = async () => {
                const data = await fetch(process.env.BACKEND_URL + "/api/current_user", options);

                const response = await data.json();
                const { profile_picture } = response.results;
                console.log(response);
                console.log(profile_picture);
                setImage(profile_picture);

            }
            callApi();
        } catch (error) {
            console.log(error);
        }
    }

    const handleImage = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', files[0]); // Agrega la imagen al FormData

        const options = {
            body: formData,
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
            method: "POST",
        }

        try {
            const saveImage = async () => {
                await fetch(process.env.BACKEND_URL + "/api/profile_picture", options)
                    .then(() => getUserProfileImage());
            }
            saveImage();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleImage}>
                <img src={image !== "" ? image : ""} alt="profile_picture" />
                <input type="file" onChange={e => setFiles(e.target.files)} />
                <button>Enviar</button>
            </form>
        </div>
    );
}
