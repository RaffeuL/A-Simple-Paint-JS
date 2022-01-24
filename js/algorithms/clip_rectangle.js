import {ctx, points} from "../main.js";
import {line} from "./line.js";

//const newCanvas = canvas.getContext('2d');

export function clip_rectangle(){
    let x0 = Math.floor(points[0].x);
    let x1 = Math.floor(points[1].x);

    let y0 = Math.floor(points[0].y);
    let y1 = Math.floor(points[1].y);

    let width = points[1].x - points[0].x ;
    let height = points[1].y - points[0].y;

    //line(x0, y0, x1, y0); //Cima
    //line(x1, y0, x1, y1); //Direita
    //line(x1, y1, x0, y1); //Baixo
    //line(x0, y0, x0, y1); //Esquerda


    let data = ctx.getImageData(x0, y0, width, height);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.putImageData(data, x0, y0);

}
