import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

interface ChartProps {
    Preds: number[],
    Counts: number[]
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import $ from "jquery";

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

const ViewExercise = () => {
    const { id } = useParams();
    const [Counts, SetCounts] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [exer, SetExer] = useState(new Exercise);
    const [name, SetName] = useState("");
    const navigate = useNavigate();
    let dataCounts = {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [{
            backgroundColor: 'rgba(247, 127, 155, 0.5)',
            borderColor: 'black',
            data: Counts,
            borderWidth: 2
        }]
    };
    let options;

    useEffect(() => {
        // Obtenemos los datos de la base de datos
        $.post("/skynet/api/servletExercises", { id: id, opcion: 2 }, (resultado: IResult) => {
            if (resultado.success) {
                SetName(resultado.num[1]);
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
                    resultado.num[11]
                ]);

                dataCounts = {
                    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    datasets: [{
                        backgroundColor: 'rgba(247, 127, 155, 0.5)',
                        borderColor: 'black',
                        data: Counts,
                        borderWidth: 2
                    }]
                };
                // Configuration options go here
                options = {
                    legend: {
                        display: false,
                    },
                    responsive: false,
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 30
                            }
            
                        }],
                        yAxes: [{
                            ticks: {
                                fontSize: 25
                            }
                        }]
                    }
                }
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
        <div className="
                bg-gradient-to-b
                from-[#4391b6]
                via-[#70afce]
                to-[#a5def1]
                h-full
                text-center
                flex
                flex-col
                justify-center
                min-h-screen
            "
        >
            <h1 className='text-5xl mb-5 font-bold'>{name}</h1>
            <div className="p-5">
                <h2 className="text-center">Cantidad de números escritos en el ejercicio</h2>
                <div className="w-1/2 m-auto">
                    <Bar data={dataCounts} options={options} />
                </div>
            </div>
        </div>
    )
}

export default ViewExercise;