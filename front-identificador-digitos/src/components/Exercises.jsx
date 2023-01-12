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
        // ! Convertir esto a JSON
        const data = new URLSearchParams();
        data.append('numero', '1');
        data.append('opcion', '2');
        const datos = {
            numero: "1",
            //numero: 1 probar con este tambien en caso de que el $ no jale
            opcion: "2"
            //opcion: 2 probar con este tambien en caso de que el $ no jale
        }
/* No lo terminé, primero probar con el axios
        $.post("/skynet/api/ejercicios", datos, (resultado) => {
            if (resultado.success) {
                this.setState({ data: resultado.num })
                this.forceUpdate();
            } else {
                alert("No se encontraron ejercicios");
            }         
        }) */

        let dataToSend = data;
        //dataToSend = JSON.parse('{"numero":"1", "opcion":"2"}');
        console.log(dataToSend);

        axios.post(
            "/skynet/api/ejercicios",
            {"numero":"1", "opcion":"2"},
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
        })
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