import {line} from "./line.js";
import {Polygon} from "../Polygon.js";

export function draw_polygon(points, border_color){
    let polygon = new Polygon(border_color, []);
    for (let step = 0; step < points.length; step++){
        if (step === points.length - 1){
            let point_1 = points[points.length - 1];
            let point_2 = points[0];
            line(Math.floor(point_1.x), Math.floor(point_1.y), Math.floor(point_2.x), Math.floor(point_2.y));
            polygon.vertices.push([point_1, point_2]);
        }else {
            let point_1 = points[step];
            let point_2 = points[step + 1];
            console.log(step)
            line(Math.floor(point_1.x), Math.floor(point_1.y), Math.floor(point_2.x), Math.floor(point_2.y));
            polygon.vertices.push([point_1, point_2]);
        }
    }
    return polygon;
}