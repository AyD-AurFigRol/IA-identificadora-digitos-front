import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";

class IExercises {
    Id: number;
    Nombre: string;
}

class IResult {
    success: boolean;
    text: string;
    num: IExercises[];
}

const Exercises = () => {
    const [name, setName] = useState("");
    const [exercises, setExercises] = useState(Array<IExercises>);
    const navigate = useNavigate();

    const AddExercise = () => {
        if (name.length == 0) {
            alert("Debes escribir un nombre");
            return;
        }

        $.post("/skynet/api/servletExercises", { nombre: name, opcion: 1 }, (resultado: IResult) => {
            if (resultado.success) {
                alert("Ejercicio registrado");
                setName("");
                window.location.reload();
            } else {
                console.log(resultado);
            }
        })
    }

    const DeleteExercise = (id: number) => {
        $.post("/skynet/api/servletExercises", { id: id, opcion: 3 }, (resultado: IResult) => {
            if (resultado.success) {
                alert("Ejercicio eliminado");
                window.location.reload();
            } else {
                console.log(resultado);
            }
        })
    }

    useEffect(() => {
        $.post("/skynet/api/servletExercises", { opcion: 5 }, (resultado: IResult) => {
            if (resultado.success) {
                setExercises(resultado.num);
                console.log(exercises);
            } else {
                alert("Hubo un error al obtener los ejercicios");
            }
        })
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('auth'))
            navigate("/login");
    });

    return (
        <div className="bg-gradient-to-b from-[#4391b6] via-[#70afce] to-[#a5def1] h-full text-center flex flex-col justify-center min-h-screen" >
            <h1 className='text-5xl font-bold'>Dar de alta ejercicios</h1>
            <div className="w-full mt-10 mb-10">
                <h1 className="text-xl block font-medium">Crea un nuevo ejercicio</h1>
                <div className="flex flex-row justify-around w-4/5 m-auto">
                    <input type="text" name="NewName" id="NewName" placeholder="Nombre del ejercicio" className="p-0.5 rounded-md px-1 w-3/5" onChange={(e) => { setName(e.target.value) }} value={name} />
                    <button className="w-2/5 bg-blue-500 font-medium border-blue-800 border-2 mx-4 rounded-lg py-1 hover:bg-blue-400 active:bg-blue-600" onClick={() => { AddExercise() }}>Agregar</button>
                </div>
            </div>
            <h1 className='text-5xl mb-5 font-bold'>Ejercicios</h1>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
                {exercises.map((exercise) => {
                    return (
                        <tr className="border-y-8 border-transparent">
                            <td>{exercise.Id}</td>
                            <td>{exercise.Nombre}</td>
                            <td>
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-around">
                                        <Link to={"/exercises/view/" + exercise.Id} className="bg-blue-500 font-medium border-blue-800 border-2 rounded-lg py-1 px-5 hover:bg-blue-400 active:bg-blue-600 mx-4 w-full">Ver ejercicio
                                        </Link>
                                        <Link to={"/exercises/test/" + exercise.Id} className="bg-green-500 font-medium border-green-800 border-2 rounded-lg py-1 px-5 hover:bg-green-400 active:bg-green-600 mx-4 w-full">Probar ejercicio
                                        </Link>
                                    </div>
                                    <div className="flex flex-row justify-around">
                                        <Link to={"/exercises/modify/" + exercise.Id} className="bg-yellow-500 font-medium border-yellow-800 border-2 mx-4 rounded-lg py-1 hover:bg-yellow-400 active:bg-yellow-600 w-full" >Modificar</Link>
                                        <button className="bg-red-500 font-medium border-red-800 border-2 mx-4 rounded-lg py-1 hover:bg-red-400 active:bg-red-600 w-full" value={exercise.Id} onClick={() => {
                                            DeleteExercise(exercise.Id)
                                        }}>Eliminar</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default Exercises;