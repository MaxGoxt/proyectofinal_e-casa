import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import { Logo } from "./Logo.jsx";

const defaultUserImage = "https://www.svgrepo.com/show/335455/profile-default.svg"

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const route = useLocation();


	useEffect(() => {
		actions.getPerfil();
	}, []);

	return (
		!route.pathname.includes("signup") && !route.pathname.includes("login") && <nav className="fixed-top d-block navbar bg-celeste-claro shadow-sm">
			<div className={`d-flex ${!route.pathname.includes("details") ? "otherplaces" : "container"} justify-content-between align-items-center`}>
				<Link to="/" className="text-decoration-none text-dark d-flex align-items-end">
					<div>
						<Logo />
					</div>
					<span className="fs-4 azul-oscuro mb-1">E-CASA</span>
				</Link>
				<div className="d-flex align-items-center nav-setting-container">
					<Link to="/upload" className="text-dark fw-bold text-decoration-none me-3 nav_upload_house">
						<button type="button" className="btn btn-outline-secondary text-grey" style={{ fontSize: "16px" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Sube tu casa a E-CASA</button>
					</Link>
					{store.auth
						? <div className="btn-group">
							<div type="button" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
								{store.perfil.profile_picture == ""
									? <img src={defaultUserImage} style={{ width: "32px", height: "32px" }} className="rounded-circle " alt="..." />
									: <img src={store.perfil.profile_picture} style={{ width: "32px", height: "32px" }} className="rounded-circle " alt="..." />
								}
							</div>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<Link to="/perfil" className="dropdown-item text-decoration-none">
										Mi cuenta
									</Link>
								</li>
								{store.perfil.is_admin &&
									<li>
										<Link to={"/mis-propiedades/" + localStorage.getItem("user_id")} className="dropdown-item text-decoration-none">
											Ver mis propiedades
										</Link>
									</li>
								}
								<li>
									<Link to="/favoritos" className="dropdown-item text-decoration-none">
										Favoritos
									</Link>
								</li>
								{store.perfil.is_admin &&
									<li>
										<Link to="/upgradeplan" className="dropdown-item text-decoration-none">
											Planes
										</Link>
									</li>
								}
								<li>
									<Link onClick={() => actions.logout()} to="/login" className="dropdown-item text-decoration-none text-danger">
										Cerrar sesión
										<i className="fa-solid fa-right-from-bracket ms-4"></i>
									</Link>
								</li>
							</ul>
						</div>
						: <div className="ml-auto">
							<Link to="/login">
								<button className="btn bg-azul-oscuro text-white">Iniciar sesión</button>
							</Link>
						</div>
					}
				</div>
				<div className="ml-auto button-login-container">
					{!store.auth && (
						<div className="ml-auto">
							<Link to="/login">
								<button className="btn bg-azul-oscuro text-white">Iniciar sesión</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav >
	);
};

