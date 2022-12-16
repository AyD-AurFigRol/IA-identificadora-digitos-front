import './css/Form.css'
import $ from "jquery"
import Exercises from "./Exercises"
import React from 'react';

class Form extends React.Component {

    state = {
        val: false
    }

    cambiar = () => {
        this.setState((state) => ({
            val: true,
            comp: <Exercises />
        }))
    }

    validar = (usuario, password) => {
        var datos = {
            User: usuario,
            pass: password
        }
        $.post("api/servletLogin", datos, (resultado) => {
            if (resultado.success) {
                this.state.val = true;
                this.forceUpdate();
            } else
                alert("Usuario no registrado");
        })
    }

    render() {
        const qld = (new URLSearchParams(window.location.search).get("val") == "true") ? true : false;
        const loginDiv = <div className="form" >
            <p>Login</p>
            <div className="div-input"><label for="Name">Usuario: </label><input required name="Name" id="Name" type="text" placeholder="Ingrese su usuario" /></div>
            <div className="div-input"><label for="pass">Contraseña: </label><input required name="pass" id="pass" type="password" placeholder="Ingrese su contraseña" /></div>
            <button onClick={() => this.validar(document.getElementById("Name").value, document.getElementById("pass").value)}> Enviar </button>
        </div>

        const esValido = (this.state.val) || qld ? <Exercises /> : loginDiv;

        return (
            <div>
                {esValido}
                {console.log(esValido)}
            </div>
        )
    }
}

export default Form;