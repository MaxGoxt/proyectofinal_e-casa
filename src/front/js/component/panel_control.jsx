import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';
import '../../styles/PanelDeControl.css';

const defaultUserImage = "https://www.svgrepo.com/show/335455/profile-default.svg";


export const PanelCtrl = () => {
    const { store, actions } = useContext(Context)

    const nav = useNavigate()

    return (
        <>
            {store.auth ?
                <div className="bg-celeste-claro  control-panel py-2 fixed-bottom mt-auto text-center azul-oscuro d-flex justify-content-around">
                    <i onClick={() => { nav("/favoritos") }} style={{ fontSize: "40px" }} className="fa-regular fa-heart"></i>
                    <div className="dropdown">
                        <button className="btn borde-azul-oscuro border-3 rounded-circle p-auto" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        {store.perfil.is_admin ?
                            <ul className="dropdown-menu">
                                <li><Link style={{textDecoration:"none"}} to={"/mis-propiedades/" + localStorage.getItem("user_id")}><p className="dropdown-item m-0">Ver mis propiedades<i className="fa-solid fa-gears ms-1"></i></p></Link></li>
                                <li><Link style={{textDecoration:"none"}} to={"/upload"}><p className="dropdown-item m-0">Ofrece una propiedad nueva</p></Link></li>
                                <li><Link style={{textDecoration:"none"}} to={"/upgradeplan"}><p className="dropdown-item m-0">Planes</p></Link></li>
                                <li>
									<Link onClick={() => actions.logout()} to="/login" className="dropdown-item text-decoration-none text-danger">
										Cerrar sesión
										<i className="fa-solid fa-right-from-bracket ms-4"></i>
									</Link>
								</li>
                            </ul> :
                            <ul className="dropdown-menu">
                                <li><Link style={{textDecoration:"none"}} to={"/upload"}><p className="dropdown-item m-0">Ofrece tu propiedad</p></Link></li>
                            </ul>
                        }
                    </div>
                    <Link to={"/perfil"}>
                        {store.perfil.profile_picture == ""
                            ? <img src={defaultUserImage} style={{ width: "40px", height: "40px" }} className="rounded-circle " alt="..." />
                            : <img src={store.perfil.profile_picture} style={{ width: "40px", height: "40px" }} className="rounded-circle " alt="..." />
                        }
                    </Link>
                </div> : null}
        </>
    );
};