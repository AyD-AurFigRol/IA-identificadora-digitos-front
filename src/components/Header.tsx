import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ auth, SetAuth }) {

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('auth');
        SetAuth(false);
        navigate("/login");
    };

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
                    {
                        auth ?
                            <>
                                <Link className="text-md p-2 hover:opacity-60 hover:cursor-pointer hover:bg-gray-300" to="/exercises">
                                    Ejercicios
                                </Link>
                                <button onClick={() => logOut()} className="text-md p-2 hover:opacity-60 hover:cursor-pointer hover:bg-gray-300">
                                    Cerrar sesión
                                </button>
                            </>
                            :
                            <Link className="text-md p-2 hover:opacity-60 hover:cursor-pointer hover:bg-gray-300" to="/login">
                                Iniciar sesión
                            </Link>
                    }
                </div>
            </nav>
        </header>
    );
}