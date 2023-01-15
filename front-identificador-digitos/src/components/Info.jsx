import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import { Navigate, useParams } from 'react-router-dom';

class Info extends React.Component {

    state = {
        data: [],        
        showAlert: false,
        alertText: "",
        id: "",
        nombre: "",

    }

    componentDidMount() {
        const idP = new URLSearchParams(window.location.search).get("id");
        const nombreP = new URLSearchParams(window.location.search).get("name");
        //const { id } = useParams();
        console.log("ID: ");
        console.log(idP);
        console.log("nombre: ");
        console.log(nombreP);
        this.setState({ id: idP }) ;
        this.setState({ nombre: nombreP });
        console.log(this.state.id);
        console.log(this.state.nombre);
        const datos = {
            "id": idP,
            "opcion": "2",
        }
        if(idP) {
            axios.post(`/skynet/api/ejercicios`, datos,  {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(response => {
                response.data.success ? ( console.log(response) &  
                console.log("respuesta obtenida: " + response.data) &
                console.log(response.data) &
                this.setState({
                     data: [response.data] 
                }) &
                console.log("poniendo respuesta obtenida en el estado: " + this.state.data) &
                this.setState({ 
                    showAlert: true, alertText: "Mostrando los ejercicios obtenidos" 
                }) )
                : this.setState({ 
                    showAlert: true, alertText: "Error con la petición al servlet realizada" 
                }) 
            }).catch(error => {
                console.info(error);
                alert("Ha ocurrido un error");
            });
        }
    }

    render() {
        const { data, showAlert, alertText, id, nombre } = this.state;
        //const info = data.num;
        return (
            <>
                <Header />
                <Container className="MarginContainer">
                    <h3>Informacion de la pregunta</h3>
                        {showAlert ? (
                                <alert className="alerta" variant="danger">
                                    {alertText}
                                </alert>
                            ) : null
                        }
                    <p>Nombre del ejercicio: {nombre}</p>
                    <p>ID del ejercicio: {id} </p>
                    <p>Veces que se ha ingresado cada dígito: </p>
                           
                    <button variant="secondary" onClick={() => window.location.href = "/exer" }>
                        Regresar
                    </button>
                    
                </Container>
            </>
        )
    }
}
/*
<p>Nombre del ejercicio: {info[1]}</p>
<p>ID del ejercicio: {info[0]}</p>

<p>Cero: {info[2]}</p>
<p>Uno: {info[3]}</p>
<p>Dos: {info[4]}</p>
<p>Tres: {info[5]}</p>
<p>Cuatro: {info[6]}</p>
<p>Cinco: {info[7]}</p>
<p>Seis: {info[8]}</p>
<p>Siete: {info[9]}</p>
<p>Ocho: {info[10]}</p>
<p>Nueve: {info[11]}</p>  
*/

export default Info;