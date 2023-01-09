import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = ({ id, pregunta }) => {

    const handleClickEliminar = (event) => {
        //Eliminar
        axios.post(`http://localhost:8080/Exer/Eliminar?id=${id}`).then(response => {
            console.info(response.data);
            if (response.data.message) {
                alert(response.data.message);
            } else {
                alert(response.data.error);
            }
        }).catch(error => {
            console.info(error);
            alert(response.data.message);
        }).finally(() => {
            window.location.href = "/Exer/";
        });
    }

    return (
        <tr>
            <td>{pregunta}</td>
            <td className="AlignCenter">
                <Button
                    variant="success"
                    className="M-6">
                    <Link to={`/Exer/info?id=${id}`} className="CustomLink" >
                        Ver ejercicio
                    </Link>
                </Button>
                <Button
                    variant="warning"
                    className="M-6">
                    <Link to={`/Exer/formulario?id=${id}`} className="CustomLink" >
                        Editar ejercicio
                    </Link>
                </Button>
                <Button
                    variant="danger"
                    className="M-6"
                    onClick={handleClickEliminar}>
                    Eliminar ejercicio
                </Button>
            </td>
        </tr>
    )
}
export default Exercise;
