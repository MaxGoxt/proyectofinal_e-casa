import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';
import '../../styles/PanelDeControl.css';

const defaultUserImage = "https://www.svgrepo.com/show/335455/profile-default.svg";


export const PanelCtrl = () => {
    const { store, actions } = useContext(Context)

    return (
        <>
            {store.auth ?
                <div className="bg-celeste-claro  control-panel py-2 fixed-bottom mt-auto text-center azul-oscuro d-flex justify-content-around">
                    <Link to={"/favoritos"}>
                        <i style={{ fontSize: "40px" }} className="fa-regular fa-heart"></i>
                    </Link>
                    <div className="dropdown">
                        <button className="btn borde-azul-oscuro border-3 rounded-circle p-auto" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        {store.perfil.is_admin ?
                            <ul className="dropdown-menu">
                                <li><Link to={"/mis-propiedades/" + localStorage.getItem("user_id")}><p className="dropdown-item m-0"><i className="fa-solid fa-gears"></i> Ver mis propiedades</p></Link></li>
                                <li><Link to={"/upload"}><p className="dropdown-item m-0">Ofrece una propiedad nueva</p></Link></li>
                            </ul> :
                            <ul className="dropdown-menu">
                                <li><Link to={"/upload"}><p className="dropdown-item m-0">Ofrece tu propiedad</p></Link></li>
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