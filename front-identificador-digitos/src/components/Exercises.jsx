import Header from "./Header"
import React from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Exercise from "./Exercise"

class Exercises extends React.Component { 

    state = {
        data: [],
        showAlert: false,
        alertText: ""
    }

    componentDidMount() {
        axios.get("Ejercicios").then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.info(error);
            this.setState({ showAlert: true, alertText: "ERROR EN LA OBTENCION DE DATOS" });
        })
    }

    render() {
        const { data, showAlert, alertText } = this.state;
        return (
            <>
                <Header />
                <div className="MarginContainer" >
                    <h1 className="AlignCenter" > CREAR, ALTAS, BAJAS Y CAMBIOS </h1>
                    <hr style={{ width: "80%" }} />
                    {
                        showAlert ?
                            <alert variant="danger">
                                {alertText}
                            </alert>
                            : null
                    }
                    <button variant="info" style={{ margin: "12px" }}>
                        <Link to="/Crud_React/formulario" className="CustomLink">Añadir nuevo ejercicio</Link>
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