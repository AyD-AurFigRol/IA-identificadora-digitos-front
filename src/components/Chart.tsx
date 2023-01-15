import React, { useEffect } from "react";
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

function Chart(props: ChartProps) {

    let dataPreds: any = {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [{
            backgroundColor: 'rgba(247, 127, 155, 0.5)',
            borderColor: 'black',
            data: props.Preds,
            borderWidth: 2
        }]
    };
    let dataCounts: any = {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [{
            backgroundColor: 'rgba(247, 127, 155, 0.5)',
            borderColor: 'black',
            data: props.Counts,
            borderWidth: 2
        }]
    };
    // Configuration options go here
    const options: any = {
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
    };

    useEffect(() => {
        const chartcanvas: any = document.getElementById("chart");
        if (chartcanvas == null)
            return;

        let ctx_ = chartcanvas.getContext("2d");
        // The data for our dataset
        dataPreds = {
            labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            datasets: [{
                backgroundColor: 'rgba(247, 127, 155, 0.5)',
                data: props.Preds,
                borderColor: 'black',
                borderWidth: 2
            }]
        };

    }, [props.Preds]);

    useEffect(() => {
        dataCounts = {
            labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            datasets: [{
                backgroundColor: 'rgba(247, 127, 155, 0.5)',
                borderColor: 'black',
                data: props.Counts,
                borderWidth: 2
            }]
        };
    }, [props.Counts]);

    return (
        <div className="md:w-1/2 p-5">
            <div className="mb-10 border-black border-2 p-5">
                <h2 className="text-center">Probabilidad de número reconocido</h2>
                <Bar data={dataPreds} options={options} />
            </div>
            <div className="mb-10 border-black border-2 p-5">
                <h2 className="text-center">Cantidad de números escritos en el ejercicio</h2>
                <Bar data={dataCounts} options={options} />
            </div>
        </div>
    )
}

export default Chart;