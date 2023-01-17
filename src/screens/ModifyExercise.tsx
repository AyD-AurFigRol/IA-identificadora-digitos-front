import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import { Link } from "react-router-dom";

class Exercise {
    Id: number;
    Name: string;
    Cero: number;
    Uno: number;
    Dos: number;
    Tres: number;
    Cuatro: number;
    Cinco: number;
    Seis: number;
    Siete: number;
    Ocho: number;
    Nueve: number;
}

interface IResult {
    success: boolean,
    text: string,
    num: Exercise
}

const ModifyExercise = () => {
    const { id } = useParams();
    const [exer, SetExer] = useState(new Exercise);
    const [counts, SetCounts] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [name, SetName] = useState("");
    const navigate = useNavigate();

    const UpdateCounts = (index: number, newValue: number) => {
        let cnts = counts.concat();
        cnts[index] = newValue;
        SetCounts(cnts);
    }

    const UpdateExercise = (e: any) => {
        e.preventDefault();
        const data = {
            opcion: 4,
            id: id,
            nombre: name,
            Cero: counts[0],
            Uno: counts[1],
            Dos: counts[2],
            Tres: counts[3],
            Cuatro: counts[4],
            Cinco: counts[5],
            Seis: counts[6],
            Siete: counts[7],
            Ocho: counts[8],
            Nueve: counts[9],
        };
        $.post("/skynet/api/servletExercises", data, (resultado: IResult) => {
            if (resultado.success) {
                Swal.fire(
                    'Guardado',
                    'Ejercicio modificado con éxito',
                    'success'
                );
                navigate("/exercises");
            } else {
                Swal.fire(
                    'Error',
                    'Ocurrió algo al obtener los ejercicios: ' + resultado.text,
                    'error'
                );
            }
        })
    }

    const ConfirmateExit = (e: any) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Quieres salir sin guardar los cambios?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed)
                navigate("/exercises");
        })
    }

    useEffect(() => {
        if (!localStorage.getItem('auth'))
            navigate("/login");
    });

    useEffect(() => {
        // Obtenemos los datos de la base de datos
        $.post("/skynet/api/servletExercises", { id: id, opcion: 2 }, (resultado: IResult) => {
            if (resultado.success) {
                SetExer(resultado.num);
                SetCounts([
                    resultado.num[2],
                    resultado.num[3],
                    resultado.num[4],
                    resultado.num[5],
                    resultado.num[6],
                    resultado.num[7],
                    resultado.num[8],
                    resultado.num[9],
                    resultado.num[10],
                    resultado.num[11],
                ]);
                SetName(resultado.num[1]);
            } else {
                alert("Hubo un error al obtener los ejercicios");
            }
        });
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('auth'))
            navigate("/login");
    });

    return (
        <div className="bg-gradient-to-b from-[#4391b6] via-[#70afce] to-[#a5def1] h-screen text-center flex flex-col justify-center px-1" >
            <h1 className='text-5xl mb-5 font-bold'>{exer[1]}</h1>
            <form method='POST' onSubmit={(e) => { UpdateExercise(e) }}>
                <div className="bg-yellow-400 mx-auto p-10 w-4/5 h-80 flex flex-col justify-around rounded-3xl">
                    <div className="flex flex-row justify-around">
                        <label htmlFor="User" className='block text-left'>Nombre del ejercicio</label>
                        <input
                            required
                            name="Name"
                            id="Name"
                            type="text"
                            placeholder="Nombre del ejercicio"
                            className='
                                block
                                text-left
                                p-0.5
                                rounded-md
                                md:w-1/2
                            '
                            onChange={(event) => { SetName(event.target.value) }}
                            value={name} />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-row justify-around w-full">
                            <div className="flex flex-col">
                                {[[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]].map((nums) => {
                                    return (
                                        <div className="flex flex-row mb-3">
                                            {nums.map((e) => {
                                                return (
                                                    <>
                                                        <label htmlFor="pass" className='block text-left mr-1'>{e}:</label>
                                                        <input
                                                            required
                                                            type="number"
                                                            placeholder="No."
                                                            className='
                                                                text-left 
                                                                p-0.5 w-10 
                                                                rounded-md mr-3
                                                            '
                                                            onChange={(event) => { UpdateCounts(e, parseInt(event.target.value)) }}
                                                            value={counts[e]}
                                                        />
                                                    </>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col-reverse">
                        <button
                            className="
                                bg-red-800
                                text-white
                                w-full
                                py-1
                                rounded-md
                                font-medium
                                md:mx-3
                                my-1
                            "
                            onClick={(e) => { ConfirmateExit(e) }}
                        >
                            Cancelar
                        </button>
                        <input
                            className="
                                bg-green-800
                                text-white
                                w-full
                                py-1
                                rounded-md
                                font-medium
                                md:mx-3
                                my-1
                            "
                            type="submit"
                            value="Enviar"
                        />
                    </div>
                </div>
            </form >
        </div >
    )
}

export default ModifyExercise;