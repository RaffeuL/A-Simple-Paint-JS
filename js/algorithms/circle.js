import {ctx, first_point} from "../main.js";


function circlePoints(ctx, x, y, first_point){
    ctx.fillStyle = 'black';
    ctx.fillRect(x + first_point.x, y + first_point.y, 1, 1);
    ctx.fillRect(y + first_point.x, x + first_point.y, 1, 1);
    ctx.fillRect(y + + first_point.x, (-x) + first_point.y, 1, 1);
    ctx.fillRect(x + first_point.x, (-y) + first_point.y, 1, 1);
    ctx.fillRect((-x) + first_point.x, (-y) + + first_point.y, 1, 1);
    ctx.fillRect((-y) + first_point.x, (-x) + first_point.y, 1, 1);
    ctx.fillRect((-y) + first_point.x, x + first_point.y, 1, 1);
    ctx.fillRect((-x) + first_point.x, y + first_point.y, 1, 1);

}

export function circle(ctx, radius, first_point) {
    let x = 0;
    let y = radius;
    let d = 1 - radius;
    //circlePoints(ctx, x, y);
    while (y >= x){
        if (d < 0){
            d += 2 * x + 3;
        }else{
            d += 2 * (x - y) + 5;
            y--;
        }
        x++;
        circlePoints(ctx, x, y, first_point);
    }
}

export function getDistance(point_1, point_2){
    let a = point_1.x - point_2.x;
    let b = point_1.y - point_2.y;
    return Math.sqrt( a*a + b*b );
}

