var frameCount = 0;

function linear_erp(start, end, t)
{
    return start + t * (end - start);
}

DRAWINGS = [];

const NO_LOOP = 0;
const CYCLE = 1;
const LOOP = 2;

function register_draw(draw_func, start_pos, end_pos, start_delay_frames, length, time_mod=(x) => {return x}, repeat=NO_LOOP)
{
    /*
        Paramteres:
            - draw_func: the function that takes a current x, y, and p (percent animation) parameters to draw said object
            - start_pos: vector2 of start position
            - end_pos:  vector2 of end possition,
            - start_delay_frames: the amount of frames in the future to start the animation
            - length: how many frames the animation should be
            - time_mod: the mod function for the time scale (easing functions)
            - repeat: if it should repeat. CYCLE = 0 -> 1 -> 0 -> 1. LOOP = 0 -> 1, 0 -> 1. null for no repeat
    */
    DRAWINGS.push({
        draw_func:   draw_func,
        start_pos:   start_pos,
        end_pos:     end_pos,
        start_frame: frameCount + start_delay_frames,
        end_frame:   frameCount + +start_delay_frames + length,
        time_mod:    time_mod,
        repeat: repeat,
    });
}

function drawShape(drawData)
{
    let cur_percent = ( frameCount - drawData.start_frame ) / ( drawData.end_frame - drawData.start_frame );
    if (cur_percent >= 1)
    {
        if (drawData.repeat == LOOP)
        {
            let draw_length = drawData.end_frame - drawData.start_frame;
            drawData.start_frame = frameCount;
            drawData.end_frame = frameCount + draw_length;
            cur_percent = 0; 
        }
        if (drawData.repeat == CYCLE)
        {
            let new_startpos = drawData.end_pos.slice()   // COPY
            let new_endpos   = drawData.start_pos.slice() // COPY
            drawData.start_pos = new_startpos;
            drawData.end_pos   = new_endpos;
            let draw_length = drawData.end_frame - drawData.start_frame;
            drawData.start_frame = frameCount;
            drawData.end_frame = frameCount + draw_length;
            drawData.draw_func(...drawData.start_pos, 0);
            return;
        }
        drawData.draw_func(...drawData.end_pos, 1);
        return;
    }
    if (cur_percent <= 0)
    {
        drawData.draw_func(...drawData.start_pos, 0);
        return;
    }

    let mod_percent = drawData.time_mod(cur_percent);
    let offset_x = linear_erp(drawData.start_pos[0], drawData.end_pos[0], mod_percent);
    let offset_y = linear_erp(drawData.start_pos[1], drawData.end_pos[1], mod_percent);
    drawData.draw_func(offset_x, offset_y, cur_percent);
}


function drawAllShapes()
{
    for (let drawData of DRAWINGS)
        drawShape(drawData);
}