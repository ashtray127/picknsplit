let canvas_size = [400, 400];
let circ_pos = [canvas_size[0] / 2, canvas_size[1] / 2];

const LEFT_CIRCLE_POS = [100, 200];
var left_current_rotate = 0;

const RIGHT_CIRCLE_POS = [300, 200];
var right_current_rotate = 0;

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

function setup() {
  createCanvas(...canvas_size);
}


function checkIfMouseOverCircle()
{
    let checks = [false, false];
    if (checkInCircle(mouseX, mouseY, 50, LEFT_CIRCLE_POS))
        checks[0] = true;
    if (checkInCircle(mouseX, mouseY, 50, RIGHT_CIRCLE_POS))
        checks[1] = true;
}

register_draw(
    drawSpinningCircleCircle,
    LEFT_CIRCLE_POS,
    LEFT_CIRCLE_POS,
    0,
    1000,
    no_mod,
    LOOP
)
register_draw(
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


//   clear();
//   background(220);
  
//   noFill();
//   strokeWeight(3);
  
//   getPointsOnACircle()
  
  
  
}