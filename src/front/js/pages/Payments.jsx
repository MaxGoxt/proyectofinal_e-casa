import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import { PayPal } from '../component/PayPal.jsx';

export const Payments = () => {
    const { store, actions } = useContext(Context);
    const [product, setProduct] = useState(null);
    const [planValue, setPlanValue] = useState(null);
    const { id } = useParams();

    /*const product = {
        description: "La descripción rereact",
        price: 20
    }*/

    const navigate = useNavigate();

    useEffect(() => {
        const plan = store.upgradePlans[id - 1];
        console.log(id);
        setProduct({
            description: plan.typeOfPlan,
            price: plan.priceAMonth
        });
        setPlanValue(plan.planValue);
        if (id !== 1 && id !== 2) navigate("/");
    }, []);

    return (
        <div className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "200px" }}>
            <p>Elije un método de pago</p>
            { product !== null && <PayPal product={product} planValue={planValue} setNewPlan={actions.setNewPlan}/> }
        </div>
    )
}