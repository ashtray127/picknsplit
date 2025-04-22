

function findPointsOnACircle(r, center_pos, num_segments, angle=0)
{
    let points = [];
    for (let k = 0; k <= num_segments; k++)
    {
        let theta = ( ( 2 * PI ) / num_segments ) * k + angle;
        let next_x = center_pos[0] + r * cos(theta);
        let next_y = center_pos[1] + r * sin(theta);
        points.push([next_x, next_y]);
    }

    return points;
}

function checkInCircle(x, y, r, center_pos)
{
    return ((x - center_pos[0])^2 + (y - center_pos[1])^2) < r^2
}