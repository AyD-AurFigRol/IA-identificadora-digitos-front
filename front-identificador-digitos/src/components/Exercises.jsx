import Header from "./Header";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Exercise from "./Exercise";
import { Alert, Table } from "react-bootstrap";
import "./css/Exercises.css";

class Exercises extends React.Component {
  state = {
    data: [],
    showAlert: false,
    alertText: "",
  };

  componentDidMount() {
    const datos = {
      //"numero": "1",
      "opcion": "5",
      //"nombre": "uno",
      //"id": "7",
    };

    axios
      .post("/skynet/api/ejercicios", datos, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log("Respuesta");
        console.log(response);
        console.log("texto");
        console.log(response.data.text);
        console.log("Respuesta de datos response.data");
        console.log(response.data);
        console.log("Respuesta de datos en arreglo data.num");
        console.log(response.data.num);
        response.data.success ?
            this.setState({
              data: response.data.num
            }) &
            console.log("Mostrando el arreglo num: " ) &
            console.log(this.state.data) &
            this.setState({
              showAlert: true,
              alertText: "Mostrando los ejercicios obtenidos",
            })
          : this.setState({
              showAlert: true,
              alertText: "Error con la petición al servlet realizada",
            });
      })
      .catch((error) => {
        console.info(error);
        this.setState({
          showAlert: true,
          alertText: "ERROR AL CONECTAR A LA BASE DE DATOS",
        });
      });
  }

  render() {
    const { data, showAlert, alertText } = this.state;
    console.log("Esto es lo que tiene data");
    console.log(data);

    
    return (
      <>
        <Header />
        <div className="MarginContainer">
          <h1 className="AlignCenter"> CREAR, ALTAS, BAJAS Y CAMBIOS </h1>
          {showAlert ? (
            <alert className="alerta" variant="danger">
              {alertText}
            </alert>
          ) : null}
          <button className="nuevoEjercicio" style={{ margin: "12px" }}>
            <Link className="alta" to="/alta">
              Añadir nuevo ejercicio
            </Link>
          </button>

          <Table striped bordered>
            <thead>
              <tr className="cabecera">
                <th className="predefined">Ejercicio</th>
                <th className="predefined">Acciones</th>
              </tr>
            </thead>
            <tbody>
                  {
                  this.state.data.map((ejercicio) => (
                    <Exercise key={ejercicio.num} {...ejercicio} />
                  ))
                  }
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default Exercises;

/* 
{data.map(ejercicio => {
  console.log("Obtenido en ejercicios.num: " + ejercicio.num);
  console.log("Obtenido en ejercicios: " + ejercicio);
  const id = ejercicio.num[0];
  console.log(ejercicio.num);
  return <Exercise key={ejercicio.num} {...ejercicio.num} />;
})}

*/