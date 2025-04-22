var canvas_size = [400, 400];
let center_pos = [canvas_size[0] / 2, canvas_size[1] / 2];

const LEFT_CIRCLE_POS = [100, 200];
const RIGHT_CIRCLE_POS = [300, 200];

function setup() {
  createCanvas(...canvas_size);
}

register_draw(
    "left_circle",
    drawSpinningCircleCircle,
    LEFT_CIRCLE_POS,
    LEFT_CIRCLE_POS,
    0,
    1000,
    no_mod,
    LOOP
)
register_draw(
    "right_circle",
    drawSpinningCircleCircle,
    RIGHT_CIRCLE_POS,
    RIGHT_CIRCLE_POS,
    0,
    100,
    no_mod,
    LOOP
)

function draw() {
    clear();

    background(220);

    drawAllShapes();
}

function keyPressed()
{
    if (getLengthOfDrawing("left_circle") == 100)
        updateCircleSpeed("left_circle",1000)
    else if (getLengthOfDrawing("left_circle") == 1000)
        updateCircleSpeed("left_circle",100);
}