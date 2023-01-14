import React from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./css/Exercise.css"

const Exercise = (props) => {
    const ID = props[0];
    const name = props[1];
    
    console.log(props[1]);
    console.log(props[2]);
    console.log(props[3]);

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
            <td>ID: {ID}, nombre del ejercicio: {name}</td> 
            <td className="derecha">
                <button
                    className="ver">
                    <Link to={`/exer/info?id=${id}`} className="link" >
                        Ver ejercicio
                    </Link>
                </button>
                <button 
                    className="editar">
                    <Link to={`/exer/formulario?id=${id}`} className="link">
                        Editar ejercicio
                    </Link>
                </button>
                <button
                    className="eliminar"
                    onClick={handleClickEliminar}>
                    Eliminar ejercicio
                </button>
                <button 
                    className="probar">
                    <Link to={`/ejercicio?id=${id}`} className="link">
                        Probar ejercicio
                    </Link>
                </button>
            </td>
        </tr>
    )
}
export default Exercise;
