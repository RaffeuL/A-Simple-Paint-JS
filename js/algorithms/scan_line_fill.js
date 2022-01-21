import {line} from "./line.js";

export function scan_line_fill(ctx, polygon, fill_color){
    console.log(polygon);
    for (let iteration=polygon.y_max; iteration > polygon.y_min; iteration--){
        console.log('iteration: ', iteration, polygon.y_min, polygon.y_max);
        let encounters = [];
        for (let edge=0;edge<polygon.edges.length;edge++){
            console.log(polygon.edges[edge].y_max, polygon.edges[edge].y_min)
            if (iteration < polygon.edges[edge].y_max && iteration > polygon.edges[edge].y_min &&
                polygon.edges[edge].y_max !== 0){

                let m = (polygon.edges[edge].y1 - polygon.edges[edge].y2) /
                    (polygon.edges[edge].x1 - polygon.edges[edge].x2);

                let x = polygon.edges[edge].x_of_y_min + (1 / m) * (iteration - polygon.edges[edge].y_min);

                encounters.push(x);
            }
        }
        if (encounters.length > 1){
            encounters.sort(function(a,b){
               if(a > b) return 1;
               if(a < b) return -1;
               return 0;
            });
            draw_scan_line(ctx, iteration, encounters);
        }
    }
}

function draw_scan_line(ctx, y, encounters){
    for (let step = 0; step < encounters.length; step=step+2){
        let point_1 = encounters[step];
        let point_2 = encounters[step + 1];
        line(Math.floor(point_1), y, Math.floor(point_2), y);
    }
}