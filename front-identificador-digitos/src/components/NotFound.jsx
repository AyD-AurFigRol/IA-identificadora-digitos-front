import React from 'react';
import "./css/NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {

    return(
        <div className="container-NF">
            <Link to="/" className="vl"> <h1>Regresar</h1> </Link>
        </div>
    );
}
