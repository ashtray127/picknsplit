const SLOW_ANIM_LENGTH = 1000;
const FAST_ANIM_LENGTH = 100;

const COLOR_CHANGE_FRAMES = 10;
const SELECTED_COLOR = [0, 200, 0];
const NON_SELECTED_COLOR = [0, 0, 0];

var left_circle_amount = 17;
var right_circle_amount = 16;

var selected_circle = 0;
var circle_selected = false;

var split_values = [0, 0];
var split_selected = false;

const ROTATION_END_VALUE = 6.28318530718;

class Consts {

    static get canvas_size()
    {
        return [document.body.clientWidth, document.body.clientHeight];
    }

    static get center_pos()
    {
        return [Consts.canvas_size[0] / 2, Consts.canvas_size[1] / 2];
    }

    static get CIRCLE_R()
    {
        return 150;
    }

}

const SELECTION_ARROW_OFFSET = Consts.CIRCLE_R + 50;
const SELECTION_ARROW_TEXT_SIZE = 50;

const SPLIT_CIRCLE_LEFT_POS = [Consts.canvas_size[0] * 1/6, Consts.center_pos[1]];
const SPLIT_CIRCLE_RIGHT_POS = [Consts.canvas_size[0] * 5/6, Consts.center_pos[1]];

const DOUBLE_ARROW_OFFSET = 25;