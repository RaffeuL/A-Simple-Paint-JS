import {line} from "./algorithms/line.js";
const canvas = document.querySelector("#my-canvas");

//Botões das ferramentas
const pixelBtn = document.getElementById("pixel-btn");
const lineBtn = document.getElementById("line-btn");

export const ctx = canvas.getContext("2d");
const size = 10;

window.addEventListener('load', () => { //Função principal, todas as funções de draw vem aqui dentro
    canvas.addEventListener('click', functionManager);

    ctx.canvas.width = 15*size;
    ctx.canvas.height = 15*size;

    let point = [];
    let actualTool = 'pixel'; //Ferramenta atual

    //Primeiro cria um butão seguindo o exemplo da de cima e dps a função aq embaixo
    pixelBtn.addEventListener('click', function(){
        setTool('pixel');
    });
    lineBtn.addEventListener('click', function(){
        setTool('line');
    });

    function getMousePos(canvas, evt){ //Pega posição do mouse
        const rect = canvas.getBoundingClientRect(),
            scaleX = canvas.width / rect.width,
            scaleY = canvas.height / rect.height;
        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        }
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
        if(point.length < 1){
            point.push(getMousePos(canvas, e)); //Adiciona um ponto no array
            drawInitialPixel(point[0].x , point[0].y);
        }
        else{
            point.push(getMousePos(canvas, e));
            line(Math.floor(point[0].x), Math.floor(point[0].y), Math.floor(point[1].x), Math.floor(point[1].y));
            point = []; // Depois de desenhar a linha, esvaziar o array ponin
        }
    }


    function functionManager(e){
        switch (actualTool) {
            case "pixel":
                canvas.addEventListener("click", drawPixel(e));
                break
            case "line":
                canvas.addEventListener("click", startLine(e));
                break
        }
    }

    function setTool(tool="pixel"){ //Troca de ferramenta
        console.log("troca de tool " + tool);
        actualTool = tool;
    }
})
