import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";


export const Footer = () => {
	const route = useLocation();

	return (
		!route.pathname.includes("signup") && !route.pathname.includes("login")  && <footer className="footer botton bg-azul-oscuro pb-5 mb-1" style={{ maxWidth: "100%" }}>
			<><div className="  rounded  p-4 mt-4">
				<h5 className=" text-white" ><Link to={"/comp-nosotros"} style={{ color: "#ffffff", textDecoration: "none" }}>Sobre nosotros</Link> </h5>
				<p className=" text-white" style={{ color: "#fff !important" }}> <Link to={"/comp-terminos"} style={{ color: "#ffffff", textDecoration: "none" }}>Términos y condiciones</Link></p>
				<p className=" text-white border-bottom border-2 py-1" ></p>
				<p className=" text-white"><i className="fa-solid fa-location-dot fa-xs" style={{ color: "#ffffff" }}></i>   Ubicación: Nos encontramos en un lugar de Uruguay</p>
				<p className=" text-white" ><i className="fa-solid fa-phone fa-xs" style={{ color: "#ffffff" }}></i>  099123123</p>
				<p className=" text-white"> <i className="fa-solid fa-envelope fa-xs" style={{ color: "#ffffff" }}></i>  e-acasa@gmail.com</p>
				<p className=" text-white border-bottom border-2 py-1"></p>
				<p className=" text-white text-center justify-content-center"> <i className="fa-regular fa-copyright fa-xs" style={{ color: "#ffffff" }}></i>   e-casas.company</p>

			</div>
				<div>

				</div></>
		</footer>
	)
};
