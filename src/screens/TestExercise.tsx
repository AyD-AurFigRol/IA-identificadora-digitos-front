import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "../components/Grid";
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

const TestExercise = () => {
    const { id } = useParams();
    const [Preds, SetPreds] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [Counts, SetCounts] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [exer, SetExer] = useState(new Exercise);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtenemos los datos de la base de datos
        $.post("/skynet/api/servletExercises", { id: id, opcion: 2 }, (resultado: IResult) => {
            if (resultado.success) {
                SetExer(resultado.num);
                console.log("num: " + resultado.num);
                console.log("exer: " + exer);
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
                console.log("Counts: " + Counts);

            } else {
                alert("Hubo un error al obtener los ejercicios");
            }
        })
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('auth'))
            navigate("/login");
    });

    const UpdatePreds = (preds: number[]) => {
        SetPreds(preds);
        UpdateCounts(preds.findIndex(e => e == Math.max(...preds)));
        console.log("Counts updated");
    }

    const UpdateCounts = (predicted: number) => {
        let cnts = Counts;
        cnts[predicted]++;
        SetCounts([
            Counts[0],
            Counts[1],
            Counts[2],
            Counts[3],
            Counts[4],
            Counts[5],
            Counts[6],
            Counts[7],
            Counts[8],
            Counts[9]
        ]);

        // Enviar a la base de datos
        let data = {
            id: id,
            opcion: 4,
            nombre: exer[1],
            Cero: Counts[0],
            Uno: Counts[1],
            Dos: Counts[2],
            Tres: Counts[3],
            Cuatro: Counts[4],
            Cinco: Counts[5],
            Seis: Counts[6],
            Siete: Counts[7],
            Ocho: Counts[8],
            Nueve: Counts[9],
        };
        console.log(data);
        $.post("/skynet/api/servletExercises", data, (resultado: IResult) => {
            console.log(resultado);
            if (resultado.success) {
            } else {
                alert("Hubo un error al obtener los ejercicios");
            }
        })
    }

    return (
        <div className="bg-gradient-to-b
        from-[#4391b6]
        via-[#70afce]
        to-[#a5def1]
        h-full
        text-center
        flex
        flex-col
        justify-center
        min-h-screen">
            <h1 className="text-center text-5xl font-black">{exer[1]}</h1>
            <p className="text-center mb-3">Dibuja un dígito en el cuadrado negro y pulsa el botón "Reconocer" para identificar el número. Pulsa "Limpiar" para reiniciar el canvas</p>
            <div id="wrapper" className="min-h-screen flex md:flex-row flex-col-reverse">
                <Chart Preds={Preds} Counts={Counts} />
                <Grid UpdatePreds={UpdatePreds} />
            </div>
            <p className="mb-5 text-center italic">* El número reconocido por la IA puede no ser igual al número dibujado</p>
        </div>
    )
}

export default TestExercise;