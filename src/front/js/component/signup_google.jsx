import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// login nuevo
export const GSignUp = () => {

    const navigate = useNavigate()
    let password = "12345678"
    const { actions } = useContext(Context)

    const createAcount = async (name, last_name, email, password1, phone, picture_url) => {
        await actions.signup(
            {
                "firstName": name,
                "lastName": last_name,
                "email": email,
                "password": password1,
                "phone": phone
            });
        await actions.login({ email: email, password: password1 })
            .then(res => {
                if (res) {
                    // await actions.validToken()
                    actions.editProfilePic(picture_url)
                    actions.getPerfil();
                }
            })
    }

    return (
        <GoogleOAuthProvider clientId={process.env.GOOGLE_ID}>
            <GoogleLogin
                onSuccess={credentiales => {
                    let decoded = jwt_decode(credentiales.credential);
                    createAcount(decoded.given_name, decoded.family_name, decoded.email, password, password, decoded.picture)
                    navigate("/")
                }}
                onError={() => {
                    console.log('Algo salió mal');
                }}
                useOneTap
            />
        </GoogleOAuthProvider>
    )
};