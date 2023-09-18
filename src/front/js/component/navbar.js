import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import logoecasa from "../../img/logoe-casa.png";
import "../../styles/navbar.css";

const defaultUserImage = "https://www.svgrepo.com/show/335455/profile-default.svg"

export const Navbar = () => {
	const { store, actions } = useContext(Context);


	const route = useLocation();

	useEffect(() => {
		console.log(route);
	}, [])

	return (
		<nav className="fixed-top d-block navbar navbar-light bg-light">
			<div className={`d-flex ${!route.pathname.includes("details") ? "otherplaces" : "container"} justify-content-between align-items-center`}>
				<Link to="/" className="text-decoration-none text-dark d-flex align-items-end">
					<img className="mx-2" src={logoecasa} alt="logo ecasa" style={{ width: "40px" }} />
					<span className="fs-4">E-CASA</span>
				</Link>
				<div className="d-flex align-items-center">
					<Link to="/upload" className="text-dark fw-bold text-decoration-none me-3 nav_upload_house">
						<button type="button" className="btn btn-outline-success text-grey" style={{ fontSize: "16px" }}>Subé tu casa a E-CASA</button>
					</Link>
					{store.auth
						? <div className="btn-group">
							<div type="button" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
								<img src={store.perfil?.data?.profile_picture != undefined ? store.perfil?.data?.profile_picture : defaultUserImage} alt="profile_picture" width="32" />
							</div>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<Link to="/profile" className="dropdown-item text-decoration-none">
										Mi cuenta
									</Link>
								</li>
								<li>
									<Link onClick={() => actions.logout()} to="/login" className="dropdown-item text-decoration-none">
										Cerrar sesión
									</Link>
								</li>
							</ul>
						</div>
						: <div className="ml-auto">
							<Link to="/login">
								<button className="btn btn-primary">Iniciar sesión</button>
							</Link>
						</div>
					}
				</div>
			</div>
		</nav >
	);
};
