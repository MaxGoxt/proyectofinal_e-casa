import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logoecasa from "../../img/logoe-casa.png";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="fixed-top d-block navbar navbar-light bg-light">
			<div className="d-flex justify-content-between align-items-center" style={{ margin: "0 40px" }}>
				<Link to="/" className="text-decoration-none text-dark d-flex align-items-end">
					<img className="mx-2" src={logoecasa} alt="logo ecasa" style={{ width: "40px" }} />
					<span className="fs-4">E-CASA</span>
				</Link>
				{store.auth ?
					<div className="ml-auto">
						<Link to="/login">
							<button onClick={() => actions.logout()} className="btn btn-primary">Cerrar sesión</button>
						</Link>
					</div>
					:
					<div className="ml-auto">
						<Link to="/login">
							<button className="btn btn-primary">Iniciar sesión</button>
						</Link>
					</div>
				}</div>
		</nav>
	);
};
