import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import "../../styles/home.css";

const TerminosYCondiciones = () => {
    return (
        <div className="container py-2 mt-4">
            <h4>Términos y Condiciones de Uso</h4>

            <p>Bienvenido a nuestro servicio. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro sitio web y servicios relacionados.</p>

            <p>Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones en su totalidad. No continúes utilizando este sitio web si no aceptas todos los términos y condiciones establecidos en esta página.</p>

            <h4>Licencia</h4>

            <p>A menos que se indique lo contrario, nosotros, o nuestros licenciantes, poseemos los derechos de propiedad intelectual de todo el material en este sitio web. Todos estos derechos están reservados.</p>

            <p>Puedes ver, descargar e imprimir páginas del sitio web para tu uso personal, sujeto a las restricciones establecidas en estos términos y condiciones.</p>

            <h4>Restricciones</h4>

            <p>Estás expresamente y específicamente prohibido de lo siguiente:</p>
            <ul>
                <li>Publicar cualquier material del sitio web en otro medio.</li>
                <li>Vender, sublicenciar y/o comercializar cualquier material del sitio web.</li>
                <li>Realizar y/o mostrar públicamente cualquier material del sitio web.</li>
                <li>Usar este sitio web de manera que pueda dañar el sitio web o perjudicar la disponibilidad o accesibilidad del sitio web.</li>
            </ul>

            <h4>Contenido del Usuario</h4>

            <p>Al enviar contenido en nuestro sitio web, otorgas a nosotros una licencia mundial, irrevocable, no exclusiva, libre de regalías para usar, adaptar, publicar, traducir y distribuir tu contenido en cualquier medio.</p>

            <p>Tu contenido no debe ser ilegal o ilícito, no debe infringir los derechos legales de terceros, ni debe ser capaz de dar lugar a acciones legales contra ti o nosotros.</p>

            <h4>Cambios en los Términos y Condiciones</h4>

            <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Al continuar utilizando el sitio web después de dichas modificaciones, aceptas los términos y condiciones modificados.</p>

        </div>
    );
}

export default TerminosYCondiciones;