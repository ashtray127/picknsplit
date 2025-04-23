const SLOW_ANIM_LENGTH = 1000;
const FAST_ANIM_LENGTH = 150;


class Consts {

    static get canvas_size()
    {
        return [document.body.clientWidth, document.body.clientHeight];
    }

    static get center_pos()
    {
        return [Consts.canvas_size[0] / 2, Consts.canvas_size[1] / 2];
    }

    static get LEFT_CIRCLE_POS()
    {
        return [
            Consts.canvas_size[0]*1/5,
            Consts.canvas_size[1]*1/2
        ];
    }

    static get RIGHT_CIRCLE_POS()
    {
        return [
            Consts.canvas_size[0]*4/5,
            Consts.canvas_size[1]*1/2
        ];
    }

    static get CIRCLE_R()
    {
        return 150;
    }

}