import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import { CardHouseFeed } from "../component/CardHouseFeed.jsx"

const defaultUserImage = "https://www.svgrepo.com/show/335455/profile-default.svg"

function Perfilprop() {
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confpassword, setConfpassword] = useState("")
    const [login, setLogin] = useState("show active")
    const [loginST, setLoginST] = useState("active")
    const [register, setRegister] = useState("")
    const [registerST, setRegisterST] = useState("")
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    let datosProp = store.casa.info_propietario?.user_id

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
    useEffect(() => {
        actions.getPerfilProp(datosProp)
        actions.getCasasProp(datosProp)
    }, [])

    return (

        <form className='container pb-3 pt-5 mt-5'>
            {/* <button onClick={()=>{navigate("/")}} className="btn bg-azul-oscuro rounded-pill my-4"><span class="text-white w-25 my-5 pb-3 fs-4"><i class="fa-solid fa-arrow-left-long me-2"></i>Seguir navegando</span></button> */}
            <div className='text-center'>
                {store.propietario?.profile_picture == ""
                    ? <img src={defaultUserImage} style={{ width: "100px", height: "100px" }} className="rounded-circle m-auto" alt="profile picture" />
                    : <img src={store.propietario?.profile_picture} style={{ width: "100px", height: "100px" }} className="rounded-circle m-auto" alt="profile picture" />
                }
                <strong><p className='m-auto'>{store.propietario?.name}</p></strong>
                <strong><p className='registro'>{store.propietario?.email}</p></strong>
            </div>
            <div className='row bg-celeste-claro g-3 text-center'>
                <div className="mb-3 azul-oscuro fw-bolder col-md-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Nombre </label>
                    <input type="nombre" className="form-control" disabled aria-describedby="emailHelp" value={store.propietario?.name} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3 azul-oscuro fw-bolder col-md-6">
                    <label htmlFor="exampleInputPassword1" className="form-label">Apellido </label>
                    <input type="apellido" className="form-control" disabled value={store.propietario?.lastname} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-3 azul-oscuro fw-bolder col-md-6">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email </label>
                    <input type="email" className="form-control" disabled value={store.propietario?.email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3 azul-oscuro fw-bolder col-md-6">
                    <label htmlFor="exampleInputPassword1" className="form-label">Telefono de contacto </label>
                    <input type="contacto" className="form-control" disabled value={store.propietario?.phoneNumber} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="mb-3 azul-oscuro fw-bolder col-md-12">
                    <label htmlFor="exampleInputPassword1" className="form-label">Descripción</label>
                    <textarea type="text" style={{ height: "100px" }} className="form-control" disabled value={store.propietario?.description} />
                </div>
            </div>
            <div className="text-white my-5">
                <ul className="nav-container nav nav-pills nav-justified mt-5 bg-celeste-claro" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <h2 className={"bg-azul-oscuro rounded me-1 py-1 " + loginST} id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                            aria-controls="pills-login" aria-selected="true" onClick={() => alquileres()}>Alquileres</h2>
                    </li>
                    <li className="nav-item" role="presentation">
                        <h2 className={"bg-azul-oscuro rounded me-1 py-1 " + registerST} id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                            aria-controls="pills-register" aria-selected="false" onClick={() => ventas()}>Ventas</h2>
                    </li>
                </ul>
                <div className="tab-content container-alquileres">
                    <div className={"tab-pane fade " + login}>
                        <div className={"row gap-1"} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                            {store.casaPropietario?.map((item, index) => {
                                return (
                                    item.category == "Alquiler" ?
                                        <CardHouseFeed
                                            key={index}
                                            location={item.location}
                                            price={item.price}
                                            id={item.id}
                                            images={item.images}
                                            title={item.title}
                                        />
                                        : null)
                            })}
                        </div>
                    </div>
                    <div className={"tab-pane fade" + register}>
                        <div className={"row gap-1"} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                            {store.casaPropietario?.map((item, index) => {
                                return (
                                    item.category == "Venta" ?
                                        <CardHouseFeed
                                            key={index}
                                            location={item.location}
                                            price={item.price}
                                            id={item.id}
                                            title={item.title}
                                            images={item.images} />
                                        : null)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Perfilprop;