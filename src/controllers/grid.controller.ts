import * as tf from "@tensorflow/tfjs";
import Pixel from "./Pixel";
import { GRID_HEIGHT, GRID_WIDTH, PIXEL_DIM } from "../consts/grid.const";

let model: tf.LayersModel;

export const loadNeuralNet = async () => {
    if (!model) {
        //model = await tf.loadLayersModel('https://neuralnetai.github.io/models/tfjs_files/model.json');
        //model = await tf.loadLayersModel('https://raw.githubusercontent.com/rainmaker29/hand-drawn-digits/master/models/tfjs_files/model.json');
        //model = await tf.loadLayersModel('https://raw.githubusercontent.com/jawarn3h/hand-drawn-digits/master/models/tfjs_files/model.json');
        // Cambiar por /login/models/tfjs_files/model.json antes de meterlo al netbeans.
        model = await tf.loadLayersModel("/model.json");
        console.log("Modelo cargado");
        // TODO: Hacer desaparecer un loader con esto
    }
}

export const inBounds = (x: number, y: number, target: Array<number>) => {
    return (x > target[0] && x < target[1]) &&
        (y > target[2] && y < target[3]);
}

export type GridW = number; 
export type GridH = number; 
export type GridX = number; 
export type GridY = number;
export type GridBounding = [GridW, GridH, GridX, GridY];

export const createGrid = (canvas: HTMLCanvasElement): [GridBounding, Pixel[]] => {
    const anchorX = canvas.width;
    const anchorY = canvas.height;

    const gridBounding: GridBounding = [anchorX, 0, anchorY, 0];
    const pixels: Pixel[] = [];
    const ctx = canvas.getContext('2d');
    
    for (let i = 0; i < GRID_HEIGHT; i++) {
        let x = PIXEL_DIM * i;
        for (let j = 0; j < GRID_WIDTH; j++) {
            let y = PIXEL_DIM * j;
            let p = new Pixel(x, y, PIXEL_DIM, ctx);
            p.draw();
            pixels.push(p);
        }
    }

    return [gridBounding, pixels];
}

// Parses our grid into a matrix so we can then convert to a tensor.
export const parseGrid = (pixels: Pixel[]) => {
    const matrix: any = [];
    for (let i = 0; i < GRID_HEIGHT; i++) {
        const matrix_col: Array<number> = [];
        for (let j = 0; j < GRID_WIDTH; j++) {
            if (pixels[j + (GRID_HEIGHT * i)].isOn) {
                matrix_col.push(1);
            } else {
                matrix_col.push(0);
            }
        }
        matrix.push(matrix_col);
    }
    // Transpose the matrix...
    return matrix[0].map((col: any, i: number) => matrix.map((row: any) => row[i]));
}

export const predict = (r: Array<Array<number>>) => {
    console.log('Matrix: ', r)
    let tensor = tf.tensor(r, [28, 28, 1], 'float32');
    tensor = tf.expandDims(tensor, 0);
    return model!.predict(tensor);
};