import Header from "./Header";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Exercise from "./Exercise";
import { Button, Container, Table, Alert } from "react-bootstrap";
import "./css/Exercises.css"

class Exercises extends React.Component { 

    state = {
        data: [],
        showAlert: false,
        alertText: ""
    }

    componentDidMount() {
        const datos = {
            "opcion": "2",
            "numero": "1"
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
            console.log("respuesta obtenida: " + response.data);
            this.setState({ data: [response.data] });
            console.log("poniendo respuesta obtenida en el estado: " + this.state.data);
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
                    <button className="nuevoEjercicio" style={{ margin: "12px"}}>
                        <Link className="alta" to="/alta">Añadir nuevo ejercicio</Link>
                    </button>

                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th className = "predefined">Ejercicio</th>
                                <th className = "predefined">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {                                
                                data.map(ejercicio => {
                                    console.log("Obtenido en ejercicios.num: " + ejercicio.num);
                                    console.log("Obtenido en ejercicios: " + ejercicio);
                                    const num = ejercicio.num;
                                    console.log(num);
                                    return <Exercise {...num} />
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}

export default Exercises;