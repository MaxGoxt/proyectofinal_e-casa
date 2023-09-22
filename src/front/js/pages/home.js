import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { PanelCtrl } from "../component/panel_control.jsx";
import { CardHouseFeed } from "../component/CardHouseFeed.jsx"

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [login, setLogin] = useState("show active")
    const [loginST, setLoginST] = useState("active")
    const [register, setRegister] = useState("")
    const [registerST, setRegisterST] = useState("")

    useEffect(() => {
        actions.getAlquileres()
        actions.getVentas()
    }, [])
    


    function alquileres() {
        if (login == "") {
            setLogin("show active")
            setLoginST("active")
            setRegister("")
            setRegisterST("")
        }
    }

    function ventas() {
        if (register == "") {
            setRegister("show active")
            setRegisterST("active")
            setLogin("")
            setLoginST("")
        }
    }

    return (
        <div className="text-white my-5">
            <img src="https://img.freepik.com/free-photo/real-estate-concept-happy-young-man-searching-home-rent-holding-house-paper-maket-smiling-st_1258-180715.jpg?w=1380&t=st=1694889637~exp=1694890237~hmac=9412f7c3727bd8fbf35f49c5aa70dcf6ff5335c54788b14234e659e6a9d8144d" alt="banner" className="w-100 hero-image" style={{ height: "320px", objectFit: "cover", objectPosition: "top" }} />
            <ul className="nav-container nav nav-pills nav-justified mt-5" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <h2 className={"nav-link " + loginST} id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                        aria-controls="pills-login" aria-selected="true" onClick={() => alquileres()}>Alquileres</h2>
                </li>
                <li className="nav-item" role="presentation">
                    <h2 className={"nav-link " + registerST} id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                        aria-controls="pills-register" aria-selected="false" onClick={() => ventas()}>Ventas</h2>
                </li>
            </ul>
            <div className="tab-content container-alquileres">
                <div className={"tab-pane fade " + login}>
                    <div className={"row"} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        {store.alquileres.map((item, index) => {
                            return (
                                <CardHouseFeed 
                                    key={index} 
                                    location={item.location} 
                                    price={item.price} 
                                    id={item.id} 
                                    images={item.images}
                                    category={item.category} />
                            )
                        })}
                    </div>
                </div>
                <div className={"tab-pane fade" + register}>
                    <div className={"row"} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                        {store.ventas.map((item, index) => {
                            return (
                                <CardHouseFeed 
                                    key={index} 
                                    location={item.location} 
                                    price={item.price} 
                                    id={item.id} 
                                    images={item.images}
                                    category={item.category} />
                            )
                        })}
                    </div>
                </div>
            </div>
            <PanelCtrl />
        </div>
    );
};
