function drawSpinningCircleCircle(x, y, p)
{
    fill(0)
    let points_to_draw = findPointsOnACircle(
        50,
        [x, y],
        17,
        p * 11
    )

    for (let point of points_to_draw)
        circle(point[0], point[1], 10)
}

// { cf - (cp * sv), cf + (sv - (cp * sv )) }
function updateCircleSpeed(draw_id, speed_value)
{
    let anim_data = DRAWINGS["left_circle"];

    let cur_percent = ( frameCount - anim_data.start_frame ) / ( anim_data.end_frame - anim_data.start_frame );

    let new_start_frame = frameCount - ( cur_percent * speed_value);
    let new_end_frame = frameCount + (speed_value - ( cur_percent * speed_value ) );

    anim_data.start_frame = new_start_frame;
    anim_data.end_frame = new_end_frame;

}