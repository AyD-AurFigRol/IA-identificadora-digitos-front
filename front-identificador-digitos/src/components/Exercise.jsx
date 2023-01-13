import React from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./css/Exercise.css"

const Exercise = ({ text, num, success }) => {
    console.log("texto recibido en parámetros: " + text);
    console.log("parametro success: " + success);
    console.log("parámetro num: " + num);
    //console.log("supuesto id con el valor 0 del arreglo num: " + num[1]);
    //console.log("id luego de obtener el valor 0 del arreglo num:" + id);
    //const id = num[1] // este va a ser el id

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
//{num[1]}, todo el arreglo num: {num}
    return (
        <tr>
            <td>texto: {text}, supuesto valor 0: </td> 
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
