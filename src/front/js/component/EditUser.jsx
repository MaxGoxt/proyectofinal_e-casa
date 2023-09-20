import React, { useState } from 'react';

export const EditUser = () => {
    const [files, setFiles] = useState([]);

    

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
                <button>Enviar</button>
            </form>
        </div>
    );
}
