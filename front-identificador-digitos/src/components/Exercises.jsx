import Header from "./Header"
import React from "react";
import axios from "axios";


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
            <Header />
            <Container className="MarginContainer" >
                <h1 className="AlignCenter" > CREAR, ALTAS, BAJAS Y CAMBIOS </h1>
                <hr style={{ width: "80%" }} />
                {
                    showAlert ?
                        <Alert variant="danger">
                            {alertText}
                        </Alert>
                        : null
                }
                <Button variant="info" style={{ margin: "12px" }}>
                    <Link to="/Crud_React/formulario" className="CustomLink">Añadir nueva pregunta</Link>
                </Button>
                <Table striped bordered >
                    <thead>
                        <tr>
                            <th>Pregunta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(pregunta => {  /*data es un arreglo y map es una funcion para recorrer el arreglo*/
                                return <Pregunta {...pregunta} />
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Exercises;