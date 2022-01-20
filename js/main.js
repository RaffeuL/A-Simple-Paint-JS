import {line} from "./algorithms/line.js";
import {curve} from './algorithms/curve.js';
import {circle, getDistance} from "./algorithms/circle.js"

const canvas = document.querySelector("#my-canvas");

//Botões das ferramentas
const pixelBtn = document.getElementById("pixel-btn");
const lineBtn = document.getElementById("line-btn");
const circleBtn = document.getElementById("circle-btn");
const curveBtn = document.getElementById("curve-btn");
const drawBtn = document.getElementById("draw-btn");
const clearBtn = document.getElementById("clear-btn");

export const ctx = canvas.getContext("2d");
const size = 10;

export let points = [];
export let markedPoints = [];

let array = [1,2,3];

window.addEventListener('load', () => { //Função principal, todas as funções de draw vem aqui dentro
    canvas.addEventListener('click', functionManager);

    ctx.canvas.width = 15*size;
    ctx.canvas.height = 15*size;

    let actualTool = 'pixel'; //Ferramenta atual

    //Primeiro cria um botão seguindo o exemplo da de cima e dps a função aq embaixo
    pixelBtn.addEventListener('click', function(){
        setTool('pixel');
    });
    lineBtn.addEventListener('click', function(){
        setTool('line');
    });
    curveBtn.addEventListener('click', function (){
        setTool('curve');
    });
    circleBtn.addEventListener('click', function (){
        setTool('circle');
    });
    drawBtn.addEventListener('click', confirmDraw);
    clearBtn.addEventListener('click', clearCanvas);

    function getMousePos(canvas, evt){ //Pega posição do mouse
        const rect = canvas.getBoundingClientRect(),
            scaleX = canvas.width / rect.width,
            scaleY = canvas.height / rect.height;
        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        }
    }

    function createPoint(e){
        let point = getMousePos(canvas, e);
        drawInitialPixel(point.x, point.y);
        points.push(point);

    }

    function drawPixel(e){ //Chama a função pixel pra criar um ponto
        let mousePos = getMousePos(canvas, e);

        pixel(mousePos.x, mousePos.y);
    }

    function drawInitialPixel(x, y){
        pixel(x, y, 'gray'); //Desenha o pixel inicial no caso da linha
    }

    function pixel(x, y, color='black'){
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
        ctx.fillStyle = 'black';
    }

    function startLine(e){
        if(points.length < 1){
            points.push(getMousePos(canvas, e)); //Adiciona um ponto no array
            drawInitialPixel(points[0].x , points[0].y);
        }
        else{
            points.push(getMousePos(canvas, e));
            line(Math.floor(points[0].x), Math.floor(points[0].y), Math.floor(points[1].x), Math.floor(points[1].y));
            points = []; // Depois de desenhar a linha, esvaziar o array ponin
        }
    }

    function startCurve(e){
        if(markedPoints.length < 2) {
            let point = getMousePos(canvas, e);
            markedPoints.push(point);
            drawInitialPixel(point.x, point.y);
        }
        else {
            createPoint(e);
        }
    }

    function start_circle(e){
        let point = getMousePos(canvas, e);
        if(points.length === 0) {
            points.push(point);
            drawInitialPixel(point.x, point.y);
        }else{
            points.push(point);
            let radius = getDistance(points[0], points[1]);
            deletePoint(points[0].x, points[0].y);
            circle(ctx, radius, points[0]);
            points = [];
        }
    }


    function deletePoint(x, y) {
        ctx.clearRect(Math.floor(x), Math.floor(y), 2, 2);
    }

    function functionManager(e){
        switch (actualTool) {
            case "pixel":
                canvas.addEventListener("click", drawPixel(e));
                break
            case "line":
                canvas.addEventListener("click", startLine(e));
                break
            case "curve":
                canvas.addEventListener("click", startCurve(e));
                break
            case "circle":
                canvas.addEventListener("click", start_circle(e));
        }
    }

    function setTool(tool="pixel"){ //Troca de ferramenta
        console.log("troca de tool " + tool);
        actualTool = tool;
    }

    function confirmDraw(e){
        switch (actualTool){
            case "curve":
                for(const point in points) {
                    deletePoint(points[point].x, points[point].y);
                }
                curve();
                markedPoints = [];
                points = [];
                break
        }
    }

    function clearCanvas(){
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        points = [];
        markedPoints = [];
    }
})


