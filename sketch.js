

register_var("LEFT_CIRCLE_COLOR_r", 0);
register_var("LEFT_CIRCLE_COLOR_g", 0);
register_var("LEFT_CIRCLE_COLOR_b", 0);

register_var("RIGHT_CIRCLE_COLOR_r", 0);
register_var("RIGHT_CIRCLE_COLOR_g", 0);
register_var("RIGHT_CIRCLE_COLOR_b", 0);

register_var("LEFT_CIRCLE_SPEED",SLOW_ANIM_LENGTH);
register_var("RIGHT_CIRCLE_SPEED",SLOW_ANIM_LENGTH)

function setup() {
  createCanvas(...Consts.canvas_size);
}
function windowResized() {
    resizeCanvas(...Consts.canvas_size)
}

register_draw(
    "left_circle",
    drawLeftSpinningCircleCircle,
    Consts.LEFT_CIRCLE_POS,
    Consts.LEFT_CIRCLE_POS,
    0,
    get_variable("LEFT_CIRCLE_SPEED"),
    no_mod,
    LOOP
)
register_draw(
    "right_circle",
    drawRightSpinningCircleCircle,
    Consts.RIGHT_CIRCLE_POS,
    Consts.RIGHT_CIRCLE_POS,
    0,
    get_variable("RIGHT_CIRCLE_SPEED"),
    no_mod,
    LOOP
)

// TODO: make selection animation thingy (check notepad)

function draw() {
    clear();

    background(220);
    update_all_variables();

    let hovered = checkIfMouseOverCircle();

    if (hovered[0] && getLengthOfDrawing("left_circle") == SLOW_ANIM_LENGTH)
    {
        updateCircleSpeed("left_circle",FAST_ANIM_LENGTH);
        animate_var("LEFT_CIRCLE_COLOR_g", 150, 30);
    }

    if (!hovered[0] && getLengthOfDrawing("left_circle") == FAST_ANIM_LENGTH)
    {
        updateCircleSpeed("left_circle",SLOW_ANIM_LENGTH);
        animate_var("LEFT_CIRCLE_COLOR_g", 0, 30);
    }

    if (hovered[1] && getLengthOfDrawing("right_circle") == SLOW_ANIM_LENGTH)
    {
        updateCircleSpeed("right_circle",FAST_ANIM_LENGTH);
        animate_var("RIGHT_CIRCLE_COLOR_g", 150, 30);
    }

    if (!hovered[1] && getLengthOfDrawing("right_circle") == FAST_ANIM_LENGTH)
    {
        updateCircleSpeed("right_circle",SLOW_ANIM_LENGTH);
        animate_var("RIGHT_CIRCLE_COLOR_g", 0, 30);
    }

    if (getLengthOfDrawing("left_circle") != SLOW_ANIM_LENGTH && getLengthOfDrawing("left_circle") != FAST_ANIM_LENGTH)
    {
        console.error("oops wrong length: " + getLengthOfDrawing("left_circle"));
        updateCircleSpeed("left_circle", SLOW_ANIM_LENGTH)
    }

    if (getLengthOfDrawing("right_circle") != SLOW_ANIM_LENGTH && getLengthOfDrawing("right_circle") != FAST_ANIM_LENGTH)
    {
        console.error("oops wrong length: " + getLengthOfDrawing("right_circle"));
        updateCircleSpeed("right_circle", SLOW_ANIM_LENGTH)
    }

    drawAllShapes();
}

function mouseMoved()
{
}

function keyPressed()
{
}