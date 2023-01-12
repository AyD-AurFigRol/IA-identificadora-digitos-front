import Header from "./Header";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Exercise from "./Exercise";
import "./css/Exercises.css"
import $ from "jquery"

class Exercises extends React.Component { 

    state = {
        data: [],
        showAlert: false,
        alertText: ""
    }

    componentDidMount() {
        const datos = {
            numero: "1",
            opcion: "2"
        }

        axios.post(
            "/skynet/api/ejercicios",
            datos,
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        ).then(response => {
            this.setState({ data: response.data });
            console.log(response.data);
            console.log(this.state.data);
        }).catch(error => {
            console.info(error);
            this.setState({ showAlert: true, alertText: "ERROR EN LA OBTENCION DE DATOS" });
        });
    }

    render() {
        const { data, showAlert, alertText } = this.state;
        return (
            <>
                <Header />
                <div className="MarginContainer" >
                    <h1 className="AlignCenter" > CREAR, ALTAS, BAJAS Y CAMBIOS </h1>
                    {
                        showAlert ?
                            <alert variant="danger">
                                {alertText}
                            </alert>
                            : null
                    }
                    <button className="nuevoEjercicio" style={{ margin: "12px" }}>
                        <Link to="/alta">Añadir nuevo ejercicio</Link>
                    </button>

                    <table striped bordered >
                        <thead>
                            <tr>
                                <th>Ejercicio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(ejercicio => {  /*data es un arreglo y map es una funcion para recorrer el arreglo*/
                                    return <Exercise {...ejercicio} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Exercises;