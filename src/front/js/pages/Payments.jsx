import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import { PayPal } from '../component/PayPal.jsx';

export const Payments = () => {
    const { store, actions } = useContext(Context);
    const [product, setProduct] = useState(null);
    const [planValue, setPlanValue] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const plan = store.upgradePlans[id - 1];
        setProduct({
            description: plan.typeOfPlan,
            price: plan.priceAMonth
        });
        setPlanValue(plan.planValue);
    }, []);

    const pagar = async () => {
        let price = product.price;
        let description = product.description //aca creamos la  variable total que guarda la suma a pagar por el cliente 

        await actions.pagoMercadoPago(price, description);
        let direccion = await store.mercadoPago.init_point;  //  direccion guarda la url que trae init_point 
        window.location.replace(direccion);  // window es para renderizar y mandar al cliente a la url de pagar 
    };

    return (
        <div className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center fs-5" style={{ marginTop: "200px" }}>
            <p>Elije un método de pago:</p>
            {product !== null && <PayPal product={product} planValue={planValue} setNewPlan={actions.setNewPlan} />}
            <p className='my-3'>O</p>
            {product !== null && <button onClick={pagar} className="bg-azul-oscuro text-white mb-3 btn w-25">Mercadopago</button>}
        </div>
    )
}