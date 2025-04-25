

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
    return ((x-center_pos[0])**2 + (y-center_pos[1])**2) <= r**2;
}

function checkIfMouseOverCircle()
{
    let checks = [false, false];
    if (checkInCircle(mouseX, mouseY, Consts.CIRCLE_R, [get_variable("LEFT_CIRCLE_x"), get_variable("LEFT_CIRCLE_y")]))
        checks[0] = true;
    if (checkInCircle(mouseX, mouseY, Consts.CIRCLE_R, [get_variable("RIGHT_CIRCLE_x"), get_variable("RIGHT_CIRCLE_y")]))
        checks[1] = true;
    return checks;
}

function checkIfOverSelectionArrow()
{
    // center to left, center to right, left to center, right to center.
    let checks = [false, false, false, false];
    textSize(50);

    let left_arrow_extra_y_offset = split_values[0] == 0? 0 : DOUBLE_ARROW_OFFSET;
    let left_arrow_far_left  = Consts.center_pos[0] - SELECTION_ARROW_OFFSET - textWidth("<--")/2;
    let left_arrow_far_right = Consts.center_pos[0] - SELECTION_ARROW_OFFSET + textWidth("<--")/2;
    let left_arrow_far_up    = Consts.center_pos[1] - textAscent()/3 - left_arrow_extra_y_offset;
    let left_arrow_far_down  = Consts.center_pos[1] + textAscent()/3 - left_arrow_extra_y_offset;

    if (mouseX >= left_arrow_far_left && mouseX <= left_arrow_far_right && mouseY >= left_arrow_far_up && mouseY <= left_arrow_far_down)
        checks[0] = true;

    let right_arrow_extra_y_offset = split_values[1] == 0? 0 : DOUBLE_ARROW_OFFSET;
    let right_arrow_far_left  = Consts.center_pos[0] + SELECTION_ARROW_OFFSET - textWidth("<--")/2;
    let right_arrow_far_right = Consts.center_pos[0] + SELECTION_ARROW_OFFSET + textWidth("<--")/2;
    let right_arrow_far_up    = Consts.center_pos[1] - textAscent()/3 - right_arrow_extra_y_offset;
    let right_arrow_far_down  = Consts.center_pos[1] + textAscent()/3 - right_arrow_extra_y_offset;

    if (mouseX >= right_arrow_far_left && mouseX <= right_arrow_far_right && mouseY >= right_arrow_far_up && mouseY <= right_arrow_far_down)
        checks[1] = true;

    let second_left_arrow_far_right = Consts.center_pos[0] - SELECTION_ARROW_OFFSET + textWidth("<--")/2;
    let second_left_arrow_far_left  = Consts.center_pos[0] - SELECTION_ARROW_OFFSET - textWidth("<--")/2;
    let second_left_arrow_far_up    = Consts.center_pos[1] - textAscent()/3 + left_arrow_extra_y_offset;
    let second_left_arrow_far_down  = Consts.center_pos[1] + textAscent()/3 + left_arrow_extra_y_offset;

    if (mouseX >= second_left_arrow_far_left && mouseX <= second_left_arrow_far_right && mouseY >= second_left_arrow_far_up && mouseY <= second_left_arrow_far_down && split_values[0] != 0)
        checks[2] = true;

    let second_right_arrow_far_right = Consts.center_pos[0] + SELECTION_ARROW_OFFSET + textWidth("<--")/2;
    let second_right_arrow_far_left  = Consts.center_pos[0] + SELECTION_ARROW_OFFSET - textWidth("<--")/2;
    let second_right_arrow_far_up    = Consts.center_pos[1] - textAscent()/3 + right_arrow_extra_y_offset;
    let second_right_arrow_far_down  = Consts.center_pos[1] + textAscent()/3 + right_arrow_extra_y_offset;

    if (mouseX >= second_right_arrow_far_left && mouseX <= second_right_arrow_far_right && mouseY >= second_right_arrow_far_up && mouseY <= second_right_arrow_far_down && split_values[1] != 0)
        checks[3] = true;

    return checks;
}

function checkIfOverSubmitButton()
{
    if (is_animated("LEFT_CIRCLE_x") || is_animated("RIGHT_CIRCLE_x"))
        return false;

    if (mouseX >= Consts.center_pos[0] - Consts.CIRCLE_R && mouseX <= Consts.center_pos[0] + Consts.CIRCLE_R && mouseY >= Consts.center_pos[1] + Consts.CIRCLE_R + 100 && mouseY <= Consts.center_pos[1] + Consts.CIRCLE_R + 100 + 50)
        return true;
    return false;
}

function getFrameTimesFromPercent(cur_percent, new_length)
{
    let new_start_frame = frameCount - ( cur_percent * new_length);
    let new_end_frame = frameCount + (new_length - ( cur_percent * new_length ) );
    new_start_frame = Math.round(new_start_frame);
    new_end_frame = Math.round(new_end_frame);
    return [new_start_frame, new_end_frame]
}