import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = ({ num, text }) => {

    const handleClickEliminar = (event) => {
        //Eliminar
        const datos = {
            "numero": "1",
            "opcion": "3"
        }

        axios.post(`/skynet/api/ejercicios`, datos,  {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
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
//, nombre: {num[3]} eso irá en el td cuando se arregle lo de consulta general
    return (
        <tr>
            <td>{text}"," {num[0]}</td> 
            <td className="AlignCenter">
                <button
                    className="ver">
                    <Link to={`/exer/info`} className="CustomLink" >
                        Ver ejercicio
                    </Link>
                </button>
                <button 
                    className="editar">
                    <Link to={`/exer/formulario`} className="CustomLink" >
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
