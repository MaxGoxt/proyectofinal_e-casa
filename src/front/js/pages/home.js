import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { PanelCtrl } from "../component/panel_control.jsx";
import { CardHouseFeed } from "../component/CardHouseFeed.jsx";
import { FilterMenu } from "../component/FilterMenu.jsx";
import Casitas from "../component/Casitas.jsx";
import SelectCasita from "../component/SelectCasita.jsx";
import { CarouselPRO } from '../component/Carrousel2/carouselPRO.jsx'
import MapaHome from '../component/mapaHome.jsx'
import { Marker } from "mapbox-gl";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [login, setLogin] = useState("show active");
    const [loginST, setLoginST] = useState("active");
    const [register, setRegister] = useState("");
    const [registerST, setRegisterST] = useState("");
    const [casas_datos, setCasas_datos] = useState([]);
    const [lastMarker, setLastMarker] = useState(null)


    const [showRentFilteredResults, setRentFilteredResults] = useState(false);
    const [showSalesFilteredResults, setSalesFilteredResults] = useState(false);


    useEffect(() => {
        actions.getAlquileres();
        actions.getVentas();
    }, [])

    function añadirmark(mark) {
        console.log(mark)
        setLastMarker(mark)

    }

    function alquileres() {
        if (login == "") {
            setLogin("show active")
            setLoginST("active")
            setRegister("")
            setRegisterST("")
            // casas_datos.splice(0, casas_datos.length);

            setCasas_datos([])
            setCasas_datos(store.alquileres)
        }
    }

    function ventas() {
        if (register == "") {
            setRegister("show active")
            setRegisterST("active")
            setLogin("")
            setLoginST("")
            // casas_datos.splice(0, casas_datos.length);

            setCasas_datos([])
            setCasas_datos(store.ventas)
        }
    }


    console.log("casaYeeHome ", casas_datos)
    // console.log("alquileres ", store.alquileres)
    const filterRentByPrice = (minPriceSlider, maxPriceSlider) => {
        actions.filterRentByPrice(minPriceSlider, maxPriceSlider);
        setRentFilteredResults(true);
    }

    const filterSalesByPrice = (minPriceSlider, maxPriceSlider) => {
        actions.filterSalesByPrice(minPriceSlider, maxPriceSlider);
        setSalesFilteredResults(true);
    }


    // console.log("props ", casas_datos)
    return (
        <div className="text-white my-5">
            <div className="position-relative">
                {/* <img src="https://img.freepik.com/free-photo/real-estate-concept-happy-young-man-searching-home-rent-holding-house-paper-maket-smiling-st_1258-180715.jpg?w=1380&t=st=1694889637~exp=1694890237~hmac=9412f7c3727bd8fbf35f49c5aa70dcf6ff5335c54788b14234e659e6a9d8144d" 
                alt="banner" 
                className="w-100 hero-image shadow-lg" 
                style={{ height: "320px", objectFit: "cover", objectPosition: "top" }} 
                /> */}
                <CarouselPRO />
                <div className="d-flex position-absolute top-0 start-0 p-4 w-75 h-100">
                    {/* <h2 className="azul-oscuro fs-1 fw-bolder animated animatedFadeInUp fadeInUp">Encuentra tu lugar <br /> aquí</h2> */}
                    <div className="position-absolute m-5" style={{ width: '25%', minWidth: "100px" }}>
                        {/* <Casitas /> */}
                        {/* <SelectCasita/> */}
                    </div>
                </div>
            </div>
            <div className="div_Mapa_Home">
                <MapaHome Datos_Casas={casas_datos} añadirmark={(mark) => añadirmark(mark)} marcador={lastMarker} />
            </div>
            <ul className="animated animatedFadeInDown fadeInDown nav-container nav nav-pills nav-justified mt-5 bg-white p-3 rounded-top" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <h2 className={"bg-azul-oscuro rounded me-1 py-1 " + loginST} id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                        aria-controls="pills-login" aria-selected="true" onClick={() => alquileres()}>Alquileres</h2>
                </li>
                <li className="nav-item" role="presentation">
                    <h2 className={"bg-azul-oscuro rounded ms-1 py-1 " + registerST} id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                        aria-controls="pills-register" aria-selected="false" onClick={() => ventas()}>Ventas</h2>
                </li>
            </ul>
            <div className="tab-content container-alquileres animated animatedFadeInDown fadeInDown">
                <div className={"tab-pane fade " + login}>
                    <FilterMenu
                        setShowFilteredResults={setRentFilteredResults}
                        filter={filterRentByPrice}
                        maxValue={100000}
                    />
                    <div className={"row gap-1"} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        {!showRentFilteredResults
                            ? store.alquileres.map(item => (
                                <CardHouseFeed
                                    key={item.id}
                                    location={item.location}
                                    price={item.price}
                                    id={item.id}
                                    images={item.images}
                                    title={item.title}
                                />
                            ))
                            : store.filterRent.map(item => (
                                <CardHouseFeed
                                    key={item.id}
                                    location={item.location}
                                    price={item.price}
                                    id={item.id}
                                    images={item.images}
                                    title={item.title}
                                />

                            ))
                        }
                    </div>
                </div>
                <div className={"tab-pane fade" + register}>
                    <FilterMenu
                        setShowFilteredResults={setSalesFilteredResults}
                        filter={filterSalesByPrice}
                        maxValue={1000000}
                    />
                    <div className={"row gap-3"} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                        {!showSalesFilteredResults
                            ? store.ventas.map(item => (
                                <CardHouseFeed
                                    key={item.id}
                                    location={item.location}
                                    price={item.price}
                                    id={item.id}
                                    images={item.images}
                                    title={item.title}
                                />
                            ))
                            : store.filterSales.map(item => (
                                <CardHouseFeed
                                    key={item.id}
                                    location={item.location}
                                    price={item.price}
                                    id={item.id}
                                    images={item.images}
                                    title={item.title}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <PanelCtrl />
        </div >
    );
};


