import './css/Form.css'

export default function Form() {
    function handleSubmit(e) {
        e.preventDefault();
        console.log(`Picaste el submit`);
    }

    return(
        <form className = "form" onSubmit = {handleSubmit} action = "ServletLogin">
            <input name = "name" id = "name" type = "text" placeholder="Ingrese su usuario" /> 
            <input name = "pass" id = "pass" type = "password" placeholder="Ingrese su contrasena" /> 
            <button type = "submit"> Enviar </button>
        </form>
    )
}