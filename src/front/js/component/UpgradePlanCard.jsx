import React from "react";
import { Link } from 'react-router-dom';

export const UpgradePlanCard = ({ typeOfPlan, priceAMonth, benefit1, benefit2, benefit3, planValue }) => {

    return (
        <div className="col-sm-12 col-md-6 mb-3">
            <div className="bg-white border border-primary px-4" style={{ borderRadius: "20px" }}>
                <div className="pt-3 mb-3 mx-auto text-center">
                    <p className="d-block mb-0 pb-0 fs-5 fw-bold">{typeOfPlan}</p>
                    <div className="">
                        <span className="fs-2 me-2 fw-bold">{priceAMonth}$</span>
                        <span className="fs-5 fw-light">/month</span>
                    </div>
                </div>
                <div className="">
                    <div className="d-flex">
                        <i class="fa-solid fa-check me-3"></i>
                        <p>{benefit1}</p>
                    </div>
                    <div className="d-flex">
                        <i class="fa-solid fa-check me-3"></i>
                        <p>{benefit2}</p>
                    </div>
                    <div className="d-flex">
                        <i class="fa-solid fa-check me-3"></i>
                        <p>{benefit3}</p>
                    </div>
                </div>
                <div className="pb-3">
                    <Link to={`/payments/${planValue}`} className="btn text-white bg-azul-oscuro fw-bold w-100">
                        Comenzar
                    </Link>
                </div>
            </div>
        </div>
    );
}