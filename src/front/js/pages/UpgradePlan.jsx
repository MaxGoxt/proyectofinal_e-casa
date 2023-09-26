import React, { useEffect, useContext } from 'react';
import { UpgradePlanCard } from '../component/UpgradePlanCard.jsx';
import { Context } from "../store/appContext";

export const UpgradePlan = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mx-auto" style={{ marginTop: "140px" }}>
            <h4 className="d-block fw-bold text-center mb-5">¡Selecciona un plan para aumentar la visibilidad de tu publicación!</h4>
            <div className="row justify-content-between">
                {store.upgradePlans.map((plan, i) => (
                    <UpgradePlanCard
                        typeOfPlan={plan.typeOfPlan}
                        priceAMonth={plan.priceAMonth}
                        benefit1={plan.benefit1}
                        benefit2={plan.benefit2}
                        benefit3={plan.benefit3}
                        planValue={plan.planValue}
                        key={i}
                    />
                ))}
            </div>
        </div>
    );
}