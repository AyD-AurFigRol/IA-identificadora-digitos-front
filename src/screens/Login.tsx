import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from "jquery"

export default function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const validar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const datos = {
            User: user,
            Password: password
        }
        $.post("/skynet/api/servletLogin", datos, (resultado) => {
            if (resultado.success) {
                localStorage.setItem('auth', user);
                navigate("/exercises");
                window.location.reload()
            } else {
                alert("Usuario no registrado");
                $("#Name").val("");
                $("#pass").val("");
            }         
        })
    }

    useEffect(() => {
        if (localStorage.getItem('auth'))
            navigate("/exercises");
    });

    return (
        <div className="bg-gradient-to-b from-[#4391b6] via-[#70afce] to-[#a5def1] h-screen text-center flex flex-col justify-center px-1" >
            <div className="bg-yellow-400 mx-auto p-10 h-80 flex flex-col justify-around rounded-3xl">
                <h1 className='text-5xl mb-5 font-bold'>Login</h1>
                <form method='POST' onSubmit={(e) => {validar(e)}}>
                    <label htmlFor="User" className='block text-left'>Usuario</label>
                    <input required name="User" id="User" type="text" placeholder="Ingrese su usuario" className='block text-left mb-5 p-0.5 rounded-md' onChange={(event) => {setUser(event.target.value)}} />

                    <label htmlFor="pass" className='block text-left'>Contraseña</label>
                    <input required name="Password" id="Password" type="password" placeholder="Ingrese su contraseña" className='block text-left mb-5 p-0.5 rounded-md' onChange={(event) => {setPassword(event.target.value)}} />

                    <input className="bg-blue-800 text-white w-full py-1 rounded-md font-medium" type="submit" value="Enviar" />
                </form>
            </div>
        </div>
    );
}