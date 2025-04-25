function drawSpinningCircleCircle(x, y, rotation, color, r, segments)
{
    noStroke()
    fill(...color);

    let points_to_draw = findPointsOnACircle(
        r,
        [x, y],
        segments,
        rotation
    )

    for (let point of points_to_draw)
    { circle(point[0], point[1], 10); }
}

function updateCircleSpeed(var_id, speed_value)
{
    animate_var(var_id, 0, ROTATION_END_VALUE, speed_value, TimeMods.linear, get_raw_percent_of_animation(var_id), Loops.LOOP);
}

function updateCircleColor(base_var_id, r, g, b)
{
    animate_var(base_var_id + "_r", get_variable(base_var_id + "_r"), r, COLOR_CHANGE_FRAMES, TimeMods.linear, 0, Loops.NONE);
    animate_var(base_var_id + "_g", get_variable(base_var_id + "_g"), g, COLOR_CHANGE_FRAMES, TimeMods.linear, 0, Loops.NONE);
    animate_var(base_var_id + "_b", get_variable(base_var_id + "_b"), b, COLOR_CHANGE_FRAMES, TimeMods.linear, 0, Loops.NONE);
}