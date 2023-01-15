import React, { useEffect, useRef, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH, PIXEL_DIM } from "../consts/grid.const";
import { createGrid, GridBounding, inBounds, loadNeuralNet, parseGrid, predict } from "../controllers/grid.controller";
import Pixel from "../controllers/Pixel";

interface GridProps {
    UpdatePreds: Function
}

function Grid(props: GridProps) {
    const [state, setState] = useState({
        pixels: [] as Pixel[],
        gridBounding: [0, 0, 0, 0] as GridBounding
    });
    const [value, setValue] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>();
    const [isWriting, setIsWriting] = useState(false);

    let reset = () => {
        if (!canvasRef.current) return;

        const [gridBounding, pixels] = createGrid(
            canvasRef.current
        );

        setState({
            ...state,
            gridBounding,
            pixels
        })
    }

    // Función a llamar al cargar la página
    useEffect(
        () => {
            if (!canvasRef.current) return;
            loadNeuralNet();
            const [gridBounding, pixels] = createGrid(canvasRef.current);
            setState({ gridBounding, pixels })
        },
        []
    );

    useEffect(
        () => {
            const offsetX = canvasRef.current?.offsetLeft || 0;
            const offsetY = canvasRef.current?.offsetTop || 0;
            // console.log(offsetX, offsetY);

            // Cuando el usuario comience a dibujar
            let isWriting = false;
            const mouseDown = (e: any) => {
                // console.log('Se está escribiendo.');
                const mouseX = e.clientX - (offsetX as number);
                const mouseY = e.clientY - (offsetY as number);
                // console.log(mouseX, mouseY);
                isWriting = true;
            }
            canvasRef.current?.addEventListener('mousedown', mouseDown);

            const mouseMove = (e: any) => {
                const mouseX = e.clientX - (offsetX as number);
                const mouseY = e.clientY - (offsetY as number);
                if (isWriting) {
                    const pixelColX = (mouseX - (mouseX % PIXEL_DIM)) / PIXEL_DIM;
                    const pixelColY = (mouseY - (mouseY % PIXEL_DIM)) / PIXEL_DIM;
                    state.pixels.forEach(p => {
                        if (!p.isOn) {
                            if (inBounds(mouseX, mouseY, p.bounding)) {
                                p.isOn = true;
                                p.draw();
                            }
                        }
                    });
                }
            }
            canvasRef.current?.addEventListener('mousemove', mouseMove);

            // Cuando el usuario deje de dibujar
            const mouseUp = (e: any) => {
                // console.log('Se dejo de escribir.');
                isWriting = false;
                if (isWriting) {
                    getProbs();
                }
            }
            canvasRef.current?.addEventListener('mouseup', mouseUp);

            return () => {
                canvasRef.current?.removeEventListener('mousemove', mouseMove);
                canvasRef.current?.removeEventListener('mousedown', mouseDown);
                canvasRef.current?.removeEventListener('mouseup', mouseUp);
            }
        },
        [state.gridBounding, state.pixels]
    );

    const getProbs = () => {
        try {
            const raw_matrix: Array<Array<number>> = parseGrid(state.pixels);
            // Predict with CNN.
            let softmax = (predict(raw_matrix) as any).dataSync();
            let preds = Array.from(softmax).map(n => parseFloat((n as number).toPrecision(4)));
            props.UpdatePreds(preds);
            const numero = preds.findIndex(e => e == Math.max(...preds));
            console.log("Es un " + numero);
            setValue(String(numero));
        } catch (err) {
            console.log('Error: ', err);
        }
    }

    return (
        <div className="flex flex-col justify-top mx-auto">
            <canvas
                ref={canvasRef as any}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="block mx-auto px-auto mb-5"
            />
            <div className="flex flex-col self-center w-full">
                <div className="flex flex-row justify-around w-full">
                    <button onClick={reset} className=" w-1/2 mx-4 bg-white border-black border-2" >Limpiar</button>
                    <button onClick={getProbs} className=" w-1/2 mx-4 border-2 bg-green-500 font-medium border-green-800 rounded-lg py-1 px-5 hover:bg-green-400 active:bg-green-600" >Reconocer</button>
                </div>
                <p className="block text-center">{value ? "Es un " + value : ""}</p>
            </div>
        </div>
    );
}

export default Grid;