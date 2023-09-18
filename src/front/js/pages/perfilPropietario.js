import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import diego from "../../img/diego.jpg";


function Perfilprop() {
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confpassword, setConfpassword] = useState("")
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    
    async function handleSubmit() {
        // e.preventDefault()
    
    }
    useEffect(() => {
            
        actions.getPerfilProp()
        }, [])


    return (
    
        <form className='container pb-3 bg-celeste-claro mt-5' onSubmit={handleSubmit}>
            <Link to={"/"}><button type="submit" className="btn text-white bg-azul-oscuro  rounded-pill  my-4"><i className="fa-solid fa-xmark"></i></button></Link>

            <div className='ms-3 d-flex  justify-content-center me-4'>




                <div className=' justify-content-center'>
                    <img src={diego} style={{ width: "100px", height: "100px" }} className="rounded-circle " alt="..." />
                    <strong><p className='m-auto'>{store.perfil.name}</p></strong>
                    <strong><p className='registro'>{store.perfil.email}</p></strong>

                    
                </div>

               
            </div>





            <div className=''>
                <div className="mb-3 texto-amarillo">
                    <label htmlFor="exampleInputEmail1" className="form-label">Nombre </label>
                    <input type="nombre" className="form-control" disabled aria-describedby="emailHelp" value={store.perfil.name} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3 texto-amarillo">
                    <label htmlFor="exampleInputPassword1" className="form-label">Apellido </label>
                    <input type="apellido" className="form-control" disabled value={store.perfil.lastname} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-3 texto-amarillo">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email </label>
                    <input type="email" className="form-control" disabled value={store.perfil.email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3 texto-amarillo">
                    <label htmlFor="exampleInputPassword1" className="form-label">Telefono de contacto </label>
                    <input type="contacto" className="form-control" disabled value={store.perfil.phoneNumber} onChange={(e) => setPhone(e.target.value)} />
                </div>
                
                <div className="mb-3 texto-amarillo">
                    <label htmlFor="exampleInputPassword1" className="form-label">Descripción</label>
                    <input type="text" className="form-control" disabled value='Descripcion' onChange={(e) => setConfpassword(e.target.value)} />
                </div>
                
            </div>

        </form>

    );
}

export default Perfilprop;