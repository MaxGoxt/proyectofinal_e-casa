import React, { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

export const Payment = (props) => {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const { product } = props;

    const handleApprove = (orderId) => {
        console.log("We made it, We made it");
        setPaidFor(true);
        // 
    }

    if (paidFor) {
        
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
            onApprove={async ( data, actions ) => {
                const order = await actions.order.capture();
                console.log("order", order);
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