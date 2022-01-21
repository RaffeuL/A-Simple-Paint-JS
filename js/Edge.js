export function Edge(points){
    this.y_max = Math.floor(calculate_y_max(points));
    this.y_min = Math.floor(calculate_y_min(points));
    this.x_of_y_min = Math.floor(calculate_x_of_y_min(points));
    this.x1 = Math.floor(points[0].x);
    this.y1 = Math.floor(points[0].y);
    this.x2 = Math.floor(points[1].x);
    this.y2 = Math.floor(points[1].y);
}

function calculate_y_max(points){
    let y1 = points[0].y;
    let y2 = points[1].y;
    if (y1 > y2){
        return y1
    }else{
        if (y2 > y1) {
            return y2;
        }else{
            return 0
        }
    }
}

function calculate_y_min(points){
    let y1 = points[0].y;
    let y2 = points[1].y;
    if (y1 < y2){
        return y1
    }else{
        if (y2 < y1) {
            return y2;
        }else{
            return 0
        }
    }
}

function calculate_x_of_y_min(points){
    let y1 = points[0].y;
    let y2 = points[1].y;
    if (y1 < y2){
        return points[0].x
    }else{
        if (y2 < y1) {
            return points[1].x
        }else{
            return 0
        }
    }
}
