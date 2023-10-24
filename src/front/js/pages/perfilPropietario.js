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

        <form className='container pb-3 bg-celeste-claro mt-5'>
            <Link to={"/"}><button type="submit" className="btn text-white bg-azul-oscuro  rounded-pill  my-4"><i className="fa-solid fa-xmark"></i></button></Link>
            <div className='ms-3 d-flex  justify-content-center me-4'>
                <div className=' justify-content-center'>
                    {store.propietario?.profile_picture == ""
                        ? <img src={defaultUserImage} style={{ width: "100px", height: "100px" }} className="rounded-circle " alt="profile picture" />
                        : <img src={store.propietario?.profile_picture} style={{ width: "100px", height: "100px" }} className="rounded-circle " alt="profile picture" />
                    }
                    <strong><p className='m-auto'>{store.propietario?.name}</p></strong>
                    <strong><p className='registro'>{store.propietario?.email}</p></strong>
                </div>
            </div>
            <div className='row g-3'>
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

                <div className="mb-3 azul-oscuro fw-bolder col-md-6">
                    <label htmlFor="exampleInputPassword1" className="form-label">Descripción</label>
                    <textarea type="text" style={{height:"100px"}} className="form-control" disabled value='Descripcion' />
                </div>
            </div>
            <div className="text-white my-5">
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
                            {store.casaPropietario?.map((item, index) => {
                                return (
                                    item.category == "Alquiler" ?
                                        <CardHouseFeed key={index} location={item.location}
                                            price={item.price}
                                            id={item.id}
                                            images={item.images} />
                                        : null)
                            })}
                        </div>
                    </div>
                    <div className={"tab-pane fade" + register}>
                        <div className={"row"} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                            {store.casaPropietario?.map((item, index) => {
                                return (
                                    item.category == "Venta" ?
                                        <CardHouseFeed key={index} location={item.location}
                                            price={item.price}
                                            id={item.id}
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