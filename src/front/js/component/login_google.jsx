import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleOneTapLogin, googleLogout } from '@react-oauth/google'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// login nuevo
export const GLogin = () => {

    googleLogout();

    const navigate = useNavigate()

    return (
        <GoogleOAuthProvider clientId={process.env.GOOGLE_ID}>
            <GoogleLogin
                onSuccess={credentiales => {
                    let decoded = jwt_decode(credentiales.credential);
                    console.log(decoded);                   
                }}
                onError={() => {
                    console.log('Algo salió mal');
                }}
                useOneTap
            />
        </GoogleOAuthProvider>
    )
};