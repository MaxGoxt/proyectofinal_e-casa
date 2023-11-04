import React, { useContext, useState, useRef } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { GSignUp } from "./signup_google.jsx";
import { useFormik } from "formik";
import * as Yup from 'yup';
import "../../styles/SingUp.css";


export const Modal = () => {

    const [coinciden, setCoinciden] = useState(true)
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const confpassword = useRef();

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== confpassword) {
            alert('La contraseña no coincide con la confirmacion')

        }

    }

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: '',
            phone: "",
            password: "",
            confpassword: "",

        },
        validationSchema:
            Yup.object({
                firstName: Yup.string()
                    .max(15, 'Debe tener 15 letras o menos')
                    .required('Obligatorio'),
                lastName: Yup.string()
                    .max(15, 'Debe tener 15 letras o menos')
                    .required('Obligatorio'),
                phone: Yup.string()
                    .min(9, 'Debe tener 9 caracteres o mas')
                    .required('Obligatorio'),
                email: Yup.string().email('Invalid email address').required('Obligatorio'),
                password: Yup.string().min(8, 'Debe tener 8 caracteres o mas').required('Obligatorio'),
                confpassword: Yup.string().min(8, 'Debe tener 8 caracteres o mas').required('Obligatorio'),



            }),

        onSubmit: values => {

            if (values.password !== values.confpassword) {

                setCoinciden(false)
            }
            else {
                actions.signup(values).then(res => {
                    if (res == true) navigate("/login")
                })
            }
        },
    });

    return (
        store.auth ? null :
            <div>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                    <h1 id="staticBackdropLabel" className='d-flex justify-content-start azul-oscuro modal-title'>Regístrate</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form className='container px-4 form-container' onSubmit={formik.handleSubmit}>
                                    <div className=''>
                                        <div className="row">
                                            <div className="mb-3 fw-bolder azul-oscuro col-12 col-sm-6">
                                                <label htmlFor="firstName" className="form-label">Nombre</label>
                                                <input type="firstName" name="firstName" id="firstName" className="form-control" aria-describedby="emailHelp" placeholder='Ingresa tu nombre' onChange={formik.handleChange}
                                                    value={formik.values.firstName} />
                                                {formik.touched.firstName && formik.errors.firstName ? (
                                                    <div className='text-danger'>{formik.errors.firstName}</div>
                                                ) : null}
                                            </div>
                                            <div className="mb-3 fw-bolder azul-oscuro col-12 col-sm-6">
                                                <label htmlFor="lastName" className="form-label">Apellido</label>
                                                <input type="lastName" name="lastName" id="lastName" className="form-control" placeholder='Ingresa tu apellido' onChange={formik.handleChange}
                                                    value={formik.values.lastName} />{formik.touched.lastName && formik.errors.lastName ? (
                                                        <div className='text-danger'>{formik.errors.lastName}</div>
                                                    ) : null}
                                            </div>
                                        </div>
                                        <div className="mb-3 fw-bolder azul-oscuro">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" name="email" id="email" className="form-control" placeholder='Ingresa tu email' onChange={formik.handleChange}
                                                value={formik.values.email} />{formik.touched.email && formik.errors.email ? (
                                                    <div className='text-danger'>{formik.errors.email}</div>
                                                ) : null}
                                        </div>
                                        <div className="mb-3 fw-bolder azul-oscuro">
                                            <label htmlFor="phone" className="form-label">Telefono de contacto</label>
                                            <input type="phone" name="phone" id="phone" className="form-control" placeholder='Ingresa un telefono de contacto' onChange={formik.handleChange}
                                                value={formik.values.phone} />
                                            {formik.touched.phone && formik.errors.phone ? (
                                                <div className='text-danger'>{formik.errors.phone}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3 fw-bolder azul-oscuro">
                                            <label htmlFor="password" className="form-label">Contraseña</label>
                                            <input type="password" name="password" id="password" className="form-control" placeholder='Ingresa una contraseña' onChange={formik.handleChange}
                                                value={formik.values.password} />
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className='text-danger'>{formik.errors.password}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3 fw-bolder azul-oscuro">
                                            <label htmlFor="confpassword" className="form-label">Confirmar contraseña</label>
                                            <input type="password" ref={confpassword} name="confpassword" id="confpassword" className="form-control" placeholder='Confrima tu contraseña' onChange={formik.handleChange} />
                                            {!coinciden && <span className='text-danger'>Las contraseñas no coinciden</span>}

                                            {formik.touched.confpassword && formik.errors.confpassword ? (
                                                <div className='text-danger'>{formik.errors.confpassword}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" className="btn sign-button text-white bg-azul-oscuro d-grid gap-2 mx-auto my-3">Continuar</button>
                                        <div className=" sign-button mx-auto">
                                            <GSignUp />
                                        </div>
                                        <div className="d-flex justify-content-center mx-auto mt-4">
                                            <p>Ya tienes una cuenta?</p> <Link to={"/login"}><p className='fw-bolder azul-oscuro ms-2' data-bs-dismiss="modal"> Ingresa</p></Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Modal;