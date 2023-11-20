import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const defaultUserImage = "https://www.svgrepo.com/show/335455/profile-default.svg"

function Editarperfil() {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
    }

    const formik = useFormik({
        initialValues: {
            name: store.perfil.name,
            lastname: store.perfil.lastname,
            phoneNumber: store.perfil.phoneNumber,
            password: "",
            description: store.perfil.description

        },
        validationSchema:
            Yup.object({
                name: Yup.string()
                    .min(1, 'No debe estar vacío')
                ,
                lastname: Yup.string()
                    .min(1, 'No debe estar vacío')
                ,
                phoneNumber: Yup.string()
                    .min(9, 'Debe tener 9 caracteres o mas'),

                password: Yup.string().min(8, 'Debe tener 8 caracteres o mas').required("Obligatorio"),
                description: Yup.string()
            }),

        onSubmit: values => {
            actions.editPerfil(values).then(res => {
                if (res.msg == "Tu perfil fue editado con éxito")
                    navigate("/perfil")
            }
            )
        }
    });
    return (

        <form className='container pb-3 bg-celeste-claro mt-5' onSubmit={formik.handleSubmit}>
            <button onClick={() => { navigate("/perfil") }} className="btn text-white bg-azul-oscuro rounded-circle my-4"><i className="fa-solid fa-xmark"></i></button>
            <div className='text-center'>
                {store.perfil.profile_picture == "" ?
                    <img src={defaultUserImage} style={{ width: "100px", height: "100px" }} className="rounded-circle m-auto" alt="..." /> :
                    <img src={store.perfil.profile_picture} style={{ width: "100px", height: "100px" }} className="rounded-circle m-auto" alt="..." />
                }
                <strong><p className='m-auto'>{store.perfil.name}</p></strong>
                <strong><p className='registro'>{store.perfil.email}</p></strong>
            </div>
            <div className='row g-3'>
                <div className="mb-3 azul-oscuro fw-bolder col-md-6">
                    <label htmlFor="name" className="form-label">Nombre </label>
                    <input type="name" id="name" name="name" className="form-control" aria-describedby="emailHelp" onChange={formik.handleChange}
                        value={formik.values.name} />
                    {formik.touched.name && formik.errors.name ? (
                        <div className='text-danger'>{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="mb-3 azul-oscuro fw-bolder col-md-6">
                    <label htmlFor="lastname" className="form-label">Apellido </label>
                    <input type="lastname" id="lastname" name="lastname" className="form-control" onChange={formik.handleChange}
                        value={formik.values.lastname} />{formik.touched.lastname && formik.errors.lastname ? (
                            <div className='text-danger'>{formik.errors.lastname}</div>
                        ) : null}
                </div>

                <div className="mb-3 azul-oscuro fw-bolder col-md-6">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" id="password" name="password" className="form-control" onChange={formik.handleChange}
                        value={formik.values.password} />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='text-danger'>{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="mb-3 azul-oscuro fw-bolder col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Telefono de contacto </label>
                    <input type="phoneNumber" id="phoneNumber" name="phoneNumber" className="form-control" onChange={formik.handleChange}
                        value={formik.values.phoneNumber} />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div className='text-danger'>{formik.errors.phoneNumber}</div>
                    ) : null}
                </div>

                <div className="mb-3 azul-oscuro fw-bolder ">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea type="description" id="description" name="description" className="form-control w-100" style={{ height: "100px" }} onChange={formik.handleChange}
                        value={formik.values.description} />
                    {formik.touched.description && formik.errors.description ? (
                        <div className='text-danger'>{formik.errors.description}</div>
                    ) : null}
                </div>
                <button className="btn text-white bg-azul-oscuro" type='submit' >Confirmar</button>
            </div>
        </form>
    );
}

export default Editarperfil;