import React from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./css/Exercise.css"

const Exercise = ({ num, text }) => {

    const id = num[0] // este va a ser el id
    console.log(id);
    console.log(num[0]);

    const handleClickEliminar = (event) => {
        //Eliminar
        const datos = {
            "numero": {id},
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
            window.location.href = "/exer";
            //<Navigate to= "/exer"/>
        });
    }
//, nombre: {num[3]} eso irá en el td cuando se arregle lo de consulta general
    return (
        <tr>
            <td>{text} , {num[0]}, {num}</td> 
            <td className="derecha">
                <button
                    className="ver">
                    <Link to={`/exer/info`} className="link" >
                        Ver ejercicio
                    </Link>
                </button>
                <button 
                    className="editar">
                    <Link to={`/exer/formulario`} className="link">
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
