import React,{ useState, useRef, useContext, useEffect } from 'react';
import { Payment } from '../component/Payment.jsx';
import { Context } from '../store/appContext';


export const Payments = () => {
    const { store, actions } = useContext(Context)

    const product = {
        description: "La descripción rereact",
        price: 20
    }
    const pagar = async () => {
        let price = 20; 
        let description="VAPAI" //aca creamos la  variable total que guarda la suma a pagar por el cliente 
        
        await actions.pagoMercadoPago(price,description);
        let direccion = await store.mercadoPago.init_point;  //  direccion guarda la url que trae init_point 
        // console.log(direccion); 
        window.location.replace(direccion);  // window es para renderizar y mandar al cliente a la url de pagar 
    };

    return (
        <div className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "200px" }}>
            <p>Elije un método de pago</p>
            <button onClick={pagar} className="bg-azul-oscuro text-white mb-3">Mercadopago</button>
            <Payment product={product} />
            
        </div>
    )
}