import './css/Form.css'
import $ from "jquey"
import Exercises from "./Exercises"
import React from 'react';

class Form extends React.Component {
    
        state = {
            val: false
        }

        cambiar = () =>{
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
            $.post("ServletLogin",datos,(resultado)=>{
                if(resultado[0].message != "error"){
                    this.state.val = true;
                    this.forceUpdate();
                }else  
                    alert("Usuario no registrado");
            })  
        }

    render(){
        const qld = (new URLSearchParams(window.location.search).get("val") == "true")? true : false;
        const loginDiv = <div className = "form" >
            Ingrese al sistema
            <label for ="Name">Nombre de usuario </label><input name = "Name" id = "Name" type = "text" placeholder="Ingrese su usuario" /> 
            <label for ="pass">Contrasena del usuario </label><input name = "pass" id = "pass" type = "password" placeholder="Ingrese su contrasena" /> 
            <button onClick={()=> this.validar(document.getElementsById("Name").value, document.getElementById("pass").value)}> Enviar </button>
        </div>
    
        const esValido = (this.state.val)||qld? <Exercises/> : loginDiv;    
        
        return(
            <div>
                {esValido}
                {console.log(esValido)}
            </div>
        )
    }    
}

export default Form;