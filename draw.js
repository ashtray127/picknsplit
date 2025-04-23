function drawLeftSpinningCircleCircle(x, y, p)
{
    noStroke()
    fill(
        get_variable("LEFT_CIRCLE_COLOR_r"),
        get_variable("LEFT_CIRCLE_COLOR_g"),
        get_variable("LEFT_CIRCLE_COLOR_b")
    )

    let points_to_draw = findPointsOnACircle(
        Consts.CIRCLE_R,
        [x, y],
        17,
        p * 11
    )

    for (let point of points_to_draw)
        circle(point[0], point[1], 10)
}

function drawRightSpinningCircleCircle(x, y, p)
{

    noStroke()
    fill(
        get_variable("RIGHT_CIRCLE_COLOR_r"),
        get_variable("RIGHT_CIRCLE_COLOR_g"),
        get_variable("RIGHT_CIRCLE_COLOR_b")
    )

    let points_to_draw = findPointsOnACircle(
        Consts.CIRCLE_R,
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
    let anim_data = DRAWINGS[draw_id];

    let cur_percent = ( frameCount - anim_data.start_frame ) / ( anim_data.end_frame - anim_data.start_frame );

    let new_start_frame = frameCount - ( cur_percent * speed_value);
    let new_end_frame = frameCount + (speed_value - ( cur_percent * speed_value ) );
    new_start_frame = Math.floor(new_start_frame);
    new_end_frame = Math.floor(new_end_frame)

    anim_data.start_frame = new_start_frame;
    anim_data.end_frame = new_end_frame;
}