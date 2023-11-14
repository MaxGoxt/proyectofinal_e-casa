import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";


export const Footer = () => {
	const route = useLocation();

	return (
		!route.pathname.includes("signup") && !route.pathname.includes("login") && <footer className="botton" style={{ maxWidth: "100%" }}>
			<>
				<svg className="mt-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#10316b"
						fillOpacity={1}
						d="M0,160L120,165.3C240,171,480,181,720,202.7C960,224,1200,256,1320,272L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
					/>
				</svg>
				<div className="footer p-4">
					<h5 className=" text-white" ><Link to={"/comp-nosotros"} style={{ color: "#ffffff", textDecoration: "none" }}>Sobre nosotros</Link> </h5>
					<p className=" text-white" style={{ color: "#fff !important" }}> <Link to={"/comp-terminos"} style={{ color: "#ffffff", textDecoration: "none" }}>Términos y condiciones</Link></p>
					<p className=" text-white border-bottom border-2 py-1" ></p>
					<p className=" text-white"><i className="fa-solid fa-location-dot fa-xs" style={{ color: "#ffffff" }}></i>   Ubicación: Nos encontramos en un lugar de Uruguay</p>
					<p className=" text-white" ><i className="fa-solid fa-phone fa-xs" style={{ color: "#ffffff" }}></i>  099123123</p>
					<p className=" text-white"> <i className="fa-solid fa-envelope fa-xs" style={{ color: "#ffffff" }}></i>  e-acasa@gmail.com</p>
					<p className=" text-white border-bottom border-2 py-1"></p>
					<p className="m-0 text-white text-center justify-content-center"> <i className="fa-regular fa-copyright fa-xs" style={{ color: "#ffffff" }}></i>   e-casas.company</p>
				</div>
			</>
		</footer>
	)
};
