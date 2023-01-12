import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = ({ num, text }) => {

    const handleClickEliminar = (event) => {
        //Eliminar
        axios.post(`http://localhost:8080/Eliminar?id=${id}`).then(response => {
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
            window.location.href = "/exer/";
        });
    }
//, nombre: {num[3]} eso irá en el td cuando se arregle este pedo
    return (
        <tr>
            <td>{text}, id: {num[0]}</td> 
            <td className="AlignCenter">
                <button
                    className="ver">
                    <Link to={`/exer/info?id=${id}`} className="CustomLink" >
                        Ver ejercicio
                    </Link>
                </button>
                <button 
                    className="editar">
                    <Link to={`/exer/formulario?id=${id}`} className="CustomLink" >
                        Editar ejercicio
                    </Link>
                </button>
                <button
                    className="eliminar"
                    onClick={handleClickEliminar}>
                    Eliminar ejercicio
                </button>
            </td>
        </tr>
    )
}
export default Exercise;
