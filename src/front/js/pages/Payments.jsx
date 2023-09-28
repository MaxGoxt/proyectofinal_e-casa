import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import { PayPal } from '../component/PayPal.jsx';
import { UpgradePlanCard } from "../component/UpgradePlanCard.jsx";
import "../../styles/Payments.css";

export const Payments = () => {
    const { store, actions } = useContext(Context);
    const [product, setProduct] = useState(null);
    const [planValue, setPlanValue] = useState(null);
    const [newPlan, setNewPlan] = useState();
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const plan = store.upgradePlans[id - 1];
        setProduct({
            description: plan.typeOfPlan,
            price: plan.priceAMonth
        });
        setPlanValue(plan.planValue);
        setNewPlan(plan)
    }, []);

    const pagar = async () => {
        let price = product.price;
        let description = product.description //aca creamos la  variable total que guarda la suma a pagar por el cliente 

        await actions.pagoMercadoPago(price, description);
        let direccion = await store.mercadoPago.init_point;  //  direccion guarda la url que trae init_point 
        window.location.replace(direccion);  // window es para renderizar y mandar al cliente a la url de pagar 
    };

    return (
        <div className="d-flex flex-column father-payment-container justify-content-start align-items-center fs-5" style={{ padding: "200px 0 0 0", minHeight: "100vh" }}>
            <div className="d-flex gap-2 bg-white payment-container">
                <div className="text-center p-4" style={{ width: "320px" }}>
                    <p>Elije un método de pago:</p>
                    {product !== null
                        && <div onClick={pagar} className="d-flex align-items-start bg-black" style={{ borderRadius: "4px", height: "40px" }}>
                            <div className="mx-4" style={{ marginTop: "0px" }}>
                                <img className="img-fluid" width="44" src="https://res.cloudinary.com/dslz0zdlc/image/upload/v1695909393/img.icons8_msizbu.png" />
                            </div>
                            <div className="d-flex justify-content-center" style={{ marginTop: "4px" }}>
                                <p className="fw-bolder text-white mb-3">Mercadopago</p>
                            </div>
                        </div>
                    }
                    <p className='mt-1 mb-2'>O</p>
                    {product !== null && <PayPal product={product} planValue={planValue} setNewPlan={actions.setNewPlan} />}

                </div>
                <UpgradePlanCard
                    border={false}
                    typeOfPlan={newPlan?.typeOfPlan}
                    priceAMonth={newPlan?.priceAMonth}
                    benefit1={newPlan?.benefit1}
                    benefit2={newPlan?.benefit2}
                    benefit3={newPlan?.benefit3}
                    planValue={newPlan?.planValue}
                />
            </div>
        </div>
    )
}