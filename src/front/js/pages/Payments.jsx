import React from 'react';
import { Payment } from '../component/Payment.jsx';

export const Payments = () => {

    const product = {
        description: "La descripción rereact",
        price: 20
    }

    return (
        <div className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "200px" }}>
            <p>Elije un método de pago</p>
            <Payment product={product} />
        </div>
    )
}