import { IconButton } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {

    const logOut = () => {
        localStorage.removeItem('auth');
        window.location.reload();
    };

    const authMenu = () => {
        if (localStorage.getItem('auth'))
            return (
                <>
                    <Link className="text-md p-2 hover:opacity-60 hover:cursor-pointer hover:bg-gray-300" to="/exercises">
                        Ejercicios
                    </Link>
                    <button onClick={() => logOut()} className="text-md p-2 hover:opacity-60 hover:cursor-pointer hover:bg-gray-300">
                        Cerrar sesión
                    </button>
                </>
            )
        else
            return (
                    <Link className="text-md p-2 hover:opacity-60 hover:cursor-pointer hover:bg-gray-300" to="/login">
                        Iniciar sesión
                    </Link>
            )
    }

    return (
        <header className="w-full border-b border-b-gray-300 p-4">
            <nav className="flex justify-between items-center">
                <Link to="/">
                    <span className="text-black w-full h-auto text-5xl font-black">Skynet</span>
                </Link>
                <div className="flex items-center">
                    <Link className="text-md p-2 hover:opacity-80 hover:cursor-pointer  hover:bg-gray-300" to="/">
                        Inicio
                    </Link>
                    {authMenu()}
                </div>
            </nav>
        </header>
    );
}