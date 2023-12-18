//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hvY2EiLCJhIjoiY2xvNXk5M21hMGVjNDJrbzhpYTB5cW43ciJ9.iT49l1qLEHHCoLTzaLqWPw';

{/* <link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' /> */ }

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
