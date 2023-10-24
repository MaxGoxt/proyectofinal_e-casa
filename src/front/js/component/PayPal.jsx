import React, { useState, useContext } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

export const PayPal = (props) => {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const { product, planValue, setNewPlan } = props;

    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    const navigate = useNavigate();

    if (paidFor) {
        setNewPlan(planValue)
            .then(res => {
                if (res) {
                    alert("¡Pago realizado con exito!")
                    navigate("/");
                }
            });
    }

    if (error) {
        alert("There was an error")
    }

    return (
        <PayPalButtons
            createOrder={(data, actions) =>
                actions.order.create({
                    purchase_units: [
                        {
                            description: product.description,
                            amount: {
                                value: product.price,
                            }
                        }
                    ]
                })
            }
            onClick={(data, actions) => {
                const hasAlreadyBought = false;
                if (hasAlreadyBought) {
                    setError("You already bought this course");
                    return actions.reject();
                } else {
                    return actions.resolve();
                }

            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                handleApprove(data.orderID)
            }}
            onError={(err) => {
                setError(err);
                console.log("PayPal Checkout onError", err);
            }}
            onCancel={() => {
                alert("Compra cancelada")
            }}
        />
    );
}