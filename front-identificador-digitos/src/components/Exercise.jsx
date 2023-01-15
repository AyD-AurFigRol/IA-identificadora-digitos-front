import React from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./css/Exercise.css"

const Exercise = ({ id, nombre }) => {
    //console.log("Entramos a cada ejercicio");
    //console.log(props);  
    //console.log(props[0]);
    console.log(nombre);
    console.log(id);

    const handleClickEliminar = (event) => {
        //Eliminar
        const datos = {
            "id": id,
            "opcion": "3"
        }

        axios.post(`/skynet/api/ejercicios`, datos,  {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            console.info(response.data);
            if (response.data.message) {
                alert(response.data.text);
            } else {
                alert(response.data.text);
            }
        }).catch(error => {
            console.info(error);
            alert(response.data.text);
        }).finally(() => {
            window.location.href = "/exer";
            //<Navigate to= "/exer"/>
        }); 
    }
//, nombre: {num[3]} eso irá en el td cuando se arregle lo de consulta general
//{num[1]}, todo el arreglo num: {num}
    return (
        <tr>
            <td className = "datos">ID: {id}      nombre del ejercicio: {nombre}</td> 
            <td className="derecha">
                <button
                    className="ver">
                    <Link to={`/exer/info?id=${id}&name=${nombre}`} className="link" >
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
