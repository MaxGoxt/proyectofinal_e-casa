import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwt_decode from "jwt-decode";

// login nuevo
export const GLogin = () => {

    let password = "12345678"
    const { actions } = useContext(Context)

    const loginAcount = async (email, password)=> {
        
        await actions.login({email: email, password: password});
        await actions.validToken()
    }

    return (
        <GoogleOAuthProvider clientId={process.env.GOOGLE_ID}>
            <GoogleLogin
                onSuccess={credentiales => {
                    let decoded = jwt_decode(credentiales.credential);
                    loginAcount(decoded.email, password)
                }}
                onError={() => {
                    console.log('Algo salió mal');
                }}
                useOneTap
            />
        </GoogleOAuthProvider>
    )
};