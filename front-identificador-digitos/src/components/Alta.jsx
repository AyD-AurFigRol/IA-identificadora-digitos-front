import Header from "./Header"
import React from "react";
import $ from "jquery"
import axios from "axios";
import { Navigate } from 'react-router-dom';
import Exercises from "./Exercises"


class Alta extends React.Component {

    state = {
        val: false
    }

    cambiar = () => {
        this.setState((state) => ({
            val: true,
            comp: <Exercises />
        }))
    }

    crear = (nombre) => {
        console.log(nombre);
        const datos = {
            "opcion": "1",
            "nombre": nombre,
            //"numero": "1",
            //"id": "52"
        }
        console.log(datos);
        axios.post("/skynet/api/ejercicios", datos,  {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            console.log(response);
            if (response.data.success) {
                this.state.val = true;
                console.log(response.data.text);
                alert("Se registró el ejercicio correctamente");
                $("#Name").val("");

            } else {
                alert("No se registró el ejercicio");
                console.log(response);
            }         
        })
    }

    //<Exercises /> : loginDiv;

    render() {
        const crearDiv = <div className="form" >
            <p>Creando ejercicio...</p>
            <div className="div-input"><label for="Name">Nombre del ejercicio </label><input required name="Name" id="Name" type="text" placeholder="Ingrese el nombre de su ejercicio" /></div>            
            <button onClick={() => this.crear(document.getElementById("Name").value)}> Crear ejercicio </button>
        </div>

        const esValido = (this.state.val) ? <Navigate to= "/exer"/> : crearDiv;       
        

        return (
            <>
                <Header />
                <div>
                    {esValido}
                    {console.log(esValido)}
                </div>
                <button variant="secondary" onClick={() => window.location.href = "/exer" }>
                        Regresar
                    </button>
            </>
        )
    }
}

export default Alta;