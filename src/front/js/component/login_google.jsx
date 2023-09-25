import React, { Component } from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleOneTapLogin, googleLogout } from '@react-oauth/google'
import { useNavigate } from "react-router-dom";

// login nuevo
export const GLogin = () => {

    googleLogout();

    const navigate = useNavigate()

    return (
        <GoogleOAuthProvider clientId={process.env.GOOGLE_ID}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);                   
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
            />
        </GoogleOAuthProvider>
    )
};