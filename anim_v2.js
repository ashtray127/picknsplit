// Easing constants
const e_c1 = 1.70158;
const e_c2 = e_c1 * 1.525;
const e_c3 = e_c1 + 1;
const e_c4 = (2 * Math.PI) / 3;
const e_c5 = (2 * Math.PI) / 4.5;
const e_n1 = 7.5625;
const e_d1 = 2.75;


class TimeMods {

    static no_mod(x){ return x }

    static ease_in_sine(x){ return 1 - Math.cos((x * Math.PI) / 2); }
    static ease_out_sine(x){ return Math.sin((x * Math.PI) / 2); }
    static ease_in_out_sine(x){ return -(Math.cos(Math.PI * x) - 1) / 2; }

    static ease_in_quad(x){ return x * x; }
    static ease_out_quad(x){ return 1 - (1 - x) * (1 - x); }
    static ease_in_out_quad(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }

    static ease_in_cubic(x){ return x * x * x; }
    static ease_out_cubic(x) { return 1 - Math.pow(1 - x, 3); }
    static ease_in_out_cubic(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

    static ease_in_quart(x){ return x * x * x * x; }
    static ease_out_quart(x){ return 1 - Math.pow(1 - x, 4); }
    static ease_in_out_quart(x){ return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2; }

    static ease_in_quint(x){ return x * x * x * x * x; }
    static ease_out_quint(x){ return 1 - Math.pow(1 - x, 5); }
    static ease_in_out_quint(x){ return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2; }

    static ease_in_expo(x){ return x === 0 ? 0 : Math.pow(2, 10 * x - 10); }
    static ease_out_expo(x){ return x === 1 ? 1 : 1 - Math.pow(2, -10 * x); }
    static ease_in_out_expo(x){ return x === 0? 0 : x === 1? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2; }

    static ease_in_circ(x){ return 1 - Math.sqrt(1 - Math.pow(x, 2)); }
    static ease_out_circ(x){ return Math.sqrt(1 - Math.pow(x - 1, 2)); }
    static ease_in_out_circ(x){ return x < 0.5? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;}

    static ease_in_back(x){ return e_c3 * x * x * x - e_c1 * x * x; }
    static ease_out_back(x){ return 1 + e_c3 * Math.pow(x - 1, 3) + e_c1 * Math.pow(x - 1, 2); }
    static ease_in_out_back(x){ return x < 0.5? (Math.pow(2 * x, 2) * ((e_c2 + 1) * 2 * x - e_c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((e_c2 + 1) * (x * 2 - 2) + e_c2) + 2) / 2; }

    static ease_in_elastic(x){ return x === 0? 0 : x === 1? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * e_c4);}
    static ease_out_elastic(x){ return x === 0? 0 : x === 1? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * e_c4) + 1;}
    static ease_in_out_elastic(x){ return x === 0? 0 : x === 1? 1 : x < 0.5? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * e_c5)) / 2 : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * e_c5)) / 2 + 1;}
    
    static ease_in_bounce(x){ if (x < 1 / e_d1) { return e_n1 * x * x; } else if (x < 2 / e_d1) { return e_n1 * (x -= 1.5 / e_d1) * x + 0.75; } else if (x < 2.5 / e_d1) { return e_n1 * (x -= 2.25 / e_d1) * x + 0.9375; } else { return e_n1 * (x -= 2.625 / e_d1) * x + 0.984375; }}
    static ease_out_bounce(x){ return 1 - TimeMods.easeOutBounce(1 - x); }
    static ease_in_out_bounce(x){ return x < 0.5? (1 - TimeMods.easeOutBounce(1 - 2 * x)) / 2 : (1 + TimeMods.easeOutBounce(2 * x - 1)) / 2; }

};

class Loops {
    NONE=0;
    CYCLE=1;
    LOOP=2;
}

var _VARIABLES = {};

function create_variable(var_name, value)
{
    if ( !(value instanceof Number) )
        return false;

    _VARIABLES[var_name] = {
        id: var_name,
        value: value,
        anim: null
    }
    return true
}

function set_variable(var_name, value)
{
    if (!Object.keys(_VARIABLES).includes(var_name))
        return false;
    if (!Object.is(_VARIABLES[var_name].anim, null))
        return false;

    _VARIABLES[var_name].value = value;
    return true;
}

// ------------ GET ----------------
function get_variable(var_name)
{
    if (!Object.keys(_VARIABLES).includes(var_name))
        return undefined;
    return _VARIABLES[var_name].value;
}

function get_percent_of_animation(var_name)
{
    if (!Object.keys(_VARIABLES).includes(var_name))
        return undefined;
    let var_data = _VARIABLES[var_name]
    if (Object.is(var_data.anim, null))
        return undefined;
    let raw_percent = ( frameCount - var_data.anim.start_frame ) / ( var_data.anim.end_frame - frameCount );
    return var_data.anim.time_mod(raw_percent);
}

function get_raw_percent_of_animation(var_name)
{
    if (!Object.keys(_VARIABLES).includes(var_name))
        return undefined;
    let var_data = _VARIABLES[var_name];
    if (Object.is(var_data.anim, null))
        return undefined;
    return ( frameCount - var_data.anim.start_frame ) / ( var_data.anim.end_frame - frameCount );
}

// --------- ANIMATE -----------------

function animate_var(var_name, end_value, frame_length, time_mod=TimeMods.no_mod, starting_percent=0, loop=Loops.NONE)
{
    if (!Object.keys(_VARIABLES).includes(var_name))
        return false;

    var_data = _VARIABLES[var_name]
    frame_timings = getFrameTimesFromPercent(starting_percent, frame_length);
    
    var_data.anim = {
        start_value: var_data.value + 0,
        end_value:   end_value,
        start_frame: frame_timings[0],
        end_frame:   frame_timings[0],
        time_mod:    time_mod,
        loop:        loop
    };
    return true;
}

function update_animated_variables()
{
    for (let var_data of _VARIABLES)
    {
        if (Object.is(var_data.anim, null))
            continue;

        let raw_percent = ( frameCount - var_data.anim.start_frame ) / ( var_data.anim.end_frame - frameCount );

        if (raw_percent <= 0)
            continue;

        if (raw_percent >= 1)
        {
            switch (var_data.anim.loop) 
            {
                case Loops.NONE:
                    var_data.anim = null;
                    break;
                case Loops.CYCLE:
                    let length = var_data.anim.end_frame - var_data.anim.start_frame;
                    let new_start_value = var_data.anim.end_value + 0;
                    let new_end_value   = var_data.anim.start_value + 0;

                    var_data.anim.start_value   = new_start_value;
                    var_data.anim.end_value     = new_end_value;
                    var_data.anim.start_frame   = frameCount;
                    var_data.anim.end_frame     = frameCount + length;
                    break;
                case Loops.LOOP:
                    let anim_length = var_data.anim.end_frame - var_data.anim.start_frame;
                    
                    var_data.anim.start_frame = frameCount;
                    var_data.anim.end_frame   = frameCount + anim_length;
                    break;
            };
        }

        let mod_percent = var_data.anim.time_mod(raw_percent);

        let new_value = linear_erp(var_data.anim.start_value, var_data.anim.end_value, mod_percent);
        var_data.value = new_value;
    }
}