

// LEFT CIRCLE
create_variable("LEFT_CIRCLE_x",  Consts.canvas_size[0] * 1/5 );
create_variable("LEFT_CIRCLE_y",  Consts.canvas_size[1] * 1/2 );
create_variable("LEFT_CIRCLE_COLOR_r",  0);
create_variable("LEFT_CIRCLE_COLOR_g",  0);
create_variable("LEFT_CIRCLE_COLOR_b",  0);
create_variable("LEFT_CIRCLE_rotation", 0);

animate_var("LEFT_CIRCLE_rotation", 0, 6.28318530718, 1000, TimeMods.linear, 0, Loops.LOOP);

// RIGHT CIRCLE
create_variable("RIGHT_CIRCLE_x",  Consts.canvas_size[0] * 4/5 );
create_variable("RIGHT_CIRCLE_y",  Consts.canvas_size[1] * 1/2 );
create_variable("RIGHT_CIRCLE_COLOR_r",  0);
create_variable("RIGHT_CIRCLE_COLOR_g",  0);
create_variable("RIGHT_CIRCLE_COLOR_b",  0);
create_variable("RIGHT_CIRCLE_rotation", 0);

animate_var("RIGHT_CIRCLE_rotation", 0, 6.28318530718, 1000, TimeMods.linear, 0, Loops.LOOP);

// SELECTION
create_variable("LEFT_SELECTION_ARROW_COLOR_r", 0);
create_variable("LEFT_SELECTION_ARROW_COLOR_g", 0);
create_variable("LEFT_SELECTION_ARROW_COLOR_b", 0);

create_variable("SECOND_LEFT_SELECTION_ARROW_COLOR_r", 0);
create_variable("SECOND_LEFT_SELECTION_ARROW_COLOR_g", 0);
create_variable("SECOND_LEFT_SELECTION_ARROW_COLOR_b", 0);

create_variable("RIGHT_SELECTION_ARROW_COLOR_r", 0);
create_variable("RIGHT_SELECTION_ARROW_COLOR_g", 0);
create_variable("RIGHT_SELECTION_ARROW_COLOR_b", 0);

create_variable("SECOND_RIGHT_SELECTION_ARROW_COLOR_r", 0);
create_variable("SECOND_RIGHT_SELECTION_ARROW_COLOR_g", 0);
create_variable("SECOND_RIGHT_SELECTION_ARROW_COLOR_b", 0);

// SUBMIT BUTTON
create_variable("SUBMIT_BUTTON_COLOR_r", 0);
create_variable("SUBMIT_BUTTON_COLOR_g", 0);
create_variable("SUBMIT_BUTTON_COLOR_b", 0);

// LEFT SPLIT CIRCLE
create_variable("LEFT_SPLIT_CIRCLE_COLOR_r", 0);
create_variable("LEFT_SPLIT_CIRCLE_COLOR_g", 0);
create_variable("LEFT_SPLIT_CIRCLE_COLOR_b", 0);

// RIGHT SPLIT CIRCLE
create_variable("RIGHT_SPLIT_CIRCLE_COLOR_r", 0);
create_variable("RIGHT_SPLIT_CIRCLE_COLOR_g", 0);
create_variable("RIGHT_SPLIT_CIRCLE_COLOR_b", 0);

// GAME OVER
create_variable("GAME_OVER_CIRCLE_rotation", 0);
create_variable("GAME_OVER_CIRCLE_COLOR_r", 0);
create_variable("GAME_OVER_CIRCLE_COLOR_g", 0);
create_variable("GAME_OVER_CIRCLE_COLOR_b", 0);



var game_over = false;
var current_turn = 1;

var JostFont;
function preload()
{
    JostFont = loadFont("fonts/Jost-Regular.ttf");
}

function setup()
{
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    frameRate(60);
}


function draw()
{
    clear();
    textSize(100);
    textFont(JostFont);
    textAlign(CENTER);

    if (game_over)
    {
        drawSpinningCircleCircle(
            Consts.center_pos[0], Consts.center_pos[1], 
            get_variable("GAME_OVER_CIRCLE_rotation"),
            [get_variable("GAME_OVER_CIRCLE_COLOR_r"), get_variable("GAME_OVER_CIRCLE_COLOR_g"), get_variable("GAME_OVER_CIRCLE_COLOR_b")],
            450, 100
        );
        text("PLAYER " + (current_turn == 1? "ONE" : "TWO") + "\nWINS", ...Consts.center_pos)

        noStroke();
        fill(0);
        textSize(30);
        if (mouseX >= Consts.canvas_size[0] - 70 - textWidth("Restart")/2 && mouseX <= Consts.canvas_size[0] - 70 + textWidth("Restart")/2 && mouseY >= Consts.canvas_size[1] - 20 - textAscent() && mouseY <= Consts.canvas_size[1] - 20)
        {   cursor(HAND); fill(0, 200, 0); }
        else cursor(ARROW);

        text("Restart", Consts.canvas_size[0] - 70, Consts.canvas_size[1] - 20)

        update_animated_variables();
        return;
    }

    fill(0);
    textSize(50);
    text("Player " + (current_turn == 1? "one" : "two") + "'s turn.", Consts.center_pos[0], Consts.center_pos[1] - Consts.CIRCLE_R - 100)

    textSize(100);
    if (!circle_selected)
    {
        let mouseChecks = checkIfMouseOverCircle();

        if (mouseChecks[0] && get_length_of_animation("LEFT_CIRCLE_rotation") == SLOW_ANIM_LENGTH && left_circle_amount != 1)
        {   updateCircleSpeed("LEFT_CIRCLE_rotation", FAST_ANIM_LENGTH); updateCircleColor("LEFT_CIRCLE_COLOR", ...SELECTED_COLOR)} 
        if (!mouseChecks[0] && get_length_of_animation("LEFT_CIRCLE_rotation") == FAST_ANIM_LENGTH && left_circle_amount != 1)
        {   updateCircleSpeed("LEFT_CIRCLE_rotation", SLOW_ANIM_LENGTH); updateCircleColor("LEFT_CIRCLE_COLOR", ...NON_SELECTED_COLOR)}
        if (mouseChecks[1] && get_length_of_animation("RIGHT_CIRCLE_rotation") == SLOW_ANIM_LENGTH && right_circle_amount != 1)
        {   updateCircleSpeed("RIGHT_CIRCLE_rotation", FAST_ANIM_LENGTH); updateCircleColor("RIGHT_CIRCLE_COLOR", ...SELECTED_COLOR)}
        if (!mouseChecks[1] && get_length_of_animation("RIGHT_CIRCLE_rotation") == FAST_ANIM_LENGTH && right_circle_amount != 1)
        {   updateCircleSpeed("RIGHT_CIRCLE_rotation", SLOW_ANIM_LENGTH); updateCircleColor("RIGHT_CIRCLE_COLOR", ...NON_SELECTED_COLOR)}

        if (left_circle_amount == 1)
            set_variable("LEFT_CIRCLE_COLOR_r", 255);
        if (right_circle_amount == 1)
            set_variable("RIGHT_CIRCLE_COLOR_r", 255);

        drawSpinningCircleCircle(
            get_variable("LEFT_CIRCLE_x"),
            get_variable("LEFT_CIRCLE_y"),
            get_variable("LEFT_CIRCLE_rotation"),
            [get_variable("LEFT_CIRCLE_COLOR_r"), get_variable("LEFT_CIRCLE_COLOR_g"), get_variable("LEFT_CIRCLE_COLOR_b")],
            Consts.CIRCLE_R,
            left_circle_amount
        )
        text(left_circle_amount, get_variable("LEFT_CIRCLE_x"), get_variable("LEFT_CIRCLE_y") + textAscent()/3 );

        drawSpinningCircleCircle(
            get_variable("RIGHT_CIRCLE_x"),
            get_variable("RIGHT_CIRCLE_y"),
            get_variable("RIGHT_CIRCLE_rotation"),
            [get_variable("RIGHT_CIRCLE_COLOR_r"), get_variable("RIGHT_CIRCLE_COLOR_g"), get_variable("RIGHT_CIRCLE_COLOR_b")],
            Consts.CIRCLE_R,
            right_circle_amount
        )
        text(right_circle_amount, get_variable("RIGHT_CIRCLE_x"), get_variable("RIGHT_CIRCLE_y") + textAscent()/3);
    }

    if (circle_selected)
    {
        let base;
        if (circle_selected == 1)
            base = "LEFT_CIRCLE"
        else if (circle_selected == 2)
            base = "RIGHT_CIRCLE"


        
        if (get_variable("LEFT_CIRCLE_COLOR_r") == 255 && !is_animated("LEFT_CIRCLE_COLOR_r"))
            animate_var("LEFT_CIRCLE_COLOR_r", 255, 0, 20, TimeMods.linear, 0, Loops.NONE);
        if (get_variable("RIGHT_CIRCLE_COLOR_r") == 255 && !is_animated("RIGHT_CIRCLE_COLOR_r"))
            animate_var("RIGHT_CIRCLE_COLOR_r", 255, 0, 20, TimeMods.linear, 0, Loops.NONE);
        if (get_variable("LEFT_SPLIT_CIRCLE_COLOR_r") == 255 & !is_animated("LEFT_SPLIT_CIRCLE_COLOR_r"))
            animate_var("LEFT_SPLIT_CIRCLE_COLOR_r", 255, 0, 20, TimeMods.linear, 0, Loops.NONE);
        if (get_variable("RIGHT_SPLIT_CIRCLE_COLOR_r") == 255 & !is_animated("RIGHT_SPLIT_CIRCLE_COLOR_r"))
            animate_var("RIGHT_SPLIT_CIRCLE_COLOR_r", 255, 0, 20, TimeMods.linear, 0, Loops.NONE);


        fill(...NON_SELECTED_COLOR)
        drawSpinningCircleCircle(
            get_variable(base + "_x"),
            get_variable(base + "_y"),
            get_variable(base + "_rotation"),
            [get_variable(base + "_COLOR_r"), get_variable(base + "_COLOR_g"), get_variable(base + "_COLOR_b")],
            Consts.CIRCLE_R,
            circle_selected == 1? left_circle_amount : right_circle_amount
        )
        text(circle_selected == 1? left_circle_amount : right_circle_amount, get_variable(base + "_x"), get_variable(base + "_y") + textAscent()/3)


        textSize(SELECTION_ARROW_TEXT_SIZE);

        if (!is_animated(base + "_x"))
        {
            let checkHovered = checkIfOverSelectionArrow();
            if (checkHovered[0] && get_variable("LEFT_SELECTION_ARROW_COLOR_g") == 0 && !is_animated("LEFT_SELECTION_ARROW_COLOR_g"))
            {   animate_var("LEFT_SELECTION_ARROW_COLOR_g", 0, 200, 10, TimeMods.linear, 0, Loops.NONE); }
            if (!checkHovered[0] && get_variable("LEFT_SELECTION_ARROW_COLOR_g") == 200 && !is_animated("LEFT_SELECTION_ARROW_COLOR_g"))
            {   animate_var("LEFT_SELECTION_ARROW_COLOR_g", 200, 0, 10, TimeMods.linear, 0, Loops.NONE); }
            if (checkHovered[1] && get_variable("RIGHT_SELECTION_ARROW_COLOR_g") == 0 && !is_animated("RIGHT_SELECTION_ARROW_COLOR_g"))
            {   animate_var("RIGHT_SELECTION_ARROW_COLOR_g", 0, 200, 10, TimeMods.linear, 0, Loops.NONE); }
            if (!checkHovered[1] && get_variable("RIGHT_SELECTION_ARROW_COLOR_g") == 200 && !is_animated("RIGHT_SELECTION_ARROW_COLOR_g"))
            {   animate_var("RIGHT_SELECTION_ARROW_COLOR_g", 200, 0, 10, TimeMods.linear, 0, Loops.None); }
            if (checkHovered[2] && get_variable("SECOND_LEFT_SELECTION_ARROW_COLOR_g") == 0 && !is_animated("SECOND_LEFT_SELECTION_ARROW_COLOR_g"))
            {   animate_var("SECOND_LEFT_SELECTION_ARROW_COLOR_g", 0, 200, 10, TimeMods.linear, 0, Loops.NONE); }
            if (!checkHovered[2] && get_variable("SECOND_LEFT_SELECTION_ARROW_COLOR_g") == 200 && !is_animated("SECOND_LEFT_SELECTION_ARROW_COLOR_g"))
            {   animate_var("SECOND_LEFT_SELECTION_ARROW_COLOR_g", 200, 0, 10, TimeMods.linear, 0, Loops.NONE); }
            if (checkHovered[3] && get_variable("SECOND_RIGHT_SELECTION_ARROW_COLOR_g") == 0 && !is_animated("SECOND_RIGHT_SELECTION_ARROW_COLOR_g"))
            {   animate_var("SECOND_RIGHT_SELECTION_ARROW_COLOR_g", 0, 200, 10, TimeMods.linear, 0, Loops.NONE); }
            if (!checkHovered[3] && get_variable("SECOND_RIGHT_SELECTION_ARROW_COLOR_g") == 200 && !is_animated("SECOND_RIGHT_SELECTION_ARROW_COLOR_g"))
            {   animate_var("SECOND_RIGHT_SELECTION_ARROW_COLOR_g", 200, 0, 10, TimeMods.linear, 0, Loops.NONE); }

            if (checkIfOverSubmitButton() && get_variable("SUBMIT_BUTTON_COLOR_g") == 0 && !is_animated("SUBMIT_BUTTON_COLOR_g"))
            {   animate_var("SUBMIT_BUTTON_COLOR_g", 0, 200, 10, TimeMods.linear, 0, Loops.NONE); }
            if (!checkIfOverSubmitButton() && get_variable("SUBMIT_BUTTON_COLOR_g") == 200 && !is_animated("SUBMIT_BUTTON_COLOR_g"))
            {   animate_var("SUBMIT_BUTTON_COLOR_g", 200, 0, 10, TimeMods.linear, 0, Loops.NONE); }

            fill( get_variable("LEFT_SELECTION_ARROW_COLOR_r"), get_variable("LEFT_SELECTION_ARROW_COLOR_g"), get_variable("LEFT_SELECTION_ARROW_COLOR_b") );
            let extra_offset_left = 0;
            if (split_values[0] != 0)
                extra_offset_left = DOUBLE_ARROW_OFFSET;
            text("<--", get_variable(base + "_x") - SELECTION_ARROW_OFFSET, get_variable(base + "_y") + textAscent()/3 - extra_offset_left);


            fill( get_variable("RIGHT_SELECTION_ARROW_COLOR_r"), get_variable("RIGHT_SELECTION_ARROW_COLOR_g"), get_variable("RIGHT_SELECTION_ARROW_COLOR_b") );
            let extra_offset_right = 0;
            if (split_values[1] != 0)
                extra_offset_right = DOUBLE_ARROW_OFFSET;
            text("-->", get_variable(base + "_x") + SELECTION_ARROW_OFFSET, get_variable(base + "_y") + textAscent()/3 - extra_offset_right);

            if (split_values[0] != 0)
            {
                fill( get_variable("SECOND_LEFT_SELECTION_ARROW_COLOR_r"), get_variable("SECOND_LEFT_SELECTION_ARROW_COLOR_g"), get_variable("SECOND_LEFT_SELECTION_ARROW_COLOR_b"));
                text("-->", get_variable(base + "_x") - SELECTION_ARROW_OFFSET, get_variable(base + "_y") + textAscent()/3 + DOUBLE_ARROW_OFFSET);
            }
            if (split_values[1] != 0)
            {
                fill( get_variable("SECOND_RIGHT_SELECTION_ARROW_COLOR_r"), get_variable("SECOND_RIGHT_SELECTION_ARROW_COLOR_g"), get_variable("SECOND_RIGHT_SELECTION_ARROW_COLOR_b"));
                text("<--", get_variable(base + "_x") + SELECTION_ARROW_OFFSET, get_variable(base + "_y") + textAscent()/3 + DOUBLE_ARROW_OFFSET);
            }

            noFill();
            strokeWeight(4);
            stroke( get_variable("SUBMIT_BUTTON_COLOR_r"), get_variable("SUBMIT_BUTTON_COLOR_g"), get_variable("SUBMIT_BUTTON_COLOR_b"));
            rect(Consts.center_pos[0] - Consts.CIRCLE_R, Consts.center_pos[1] + Consts.CIRCLE_R + 100, Consts.CIRCLE_R*2, 50, 20);
            noStroke();
    
            textSize(25);
            fill(get_variable("SUBMIT_BUTTON_COLOR_r"), get_variable("SUBMIT_BUTTON_COLOR_g"), get_variable("SUBMIT_BUTTON_COLOR_b"));
            text("Submit", Consts.center_pos[0], Consts.center_pos[1] + Consts.CIRCLE_R + 100 + textAscent()/3 + 25);
        }

        fill(0);
        textSize(100);
        if (split_values[0] != 0)
        {
            drawSpinningCircleCircle(
                SPLIT_CIRCLE_LEFT_POS[0], SPLIT_CIRCLE_LEFT_POS[1],
                0,
                [get_variable("LEFT_SPLIT_CIRCLE_COLOR_r"), get_variable("LEFT_SPLIT_CIRCLE_COLOR_g"), get_variable("LEFT_SPLIT_CIRCLE_COLOR_b")],
                150,
                split_values[0]
            );
            text(split_values[0], SPLIT_CIRCLE_LEFT_POS[0], SPLIT_CIRCLE_LEFT_POS[1] + textAscent()/3);
        }
        if (split_values[1] != 0)
        {
            drawSpinningCircleCircle(
                ...SPLIT_CIRCLE_RIGHT_POS,
                0,
                [get_variable("RIGHT_SPLIT_CIRCLE_COLOR_r"), get_variable("RIGHT_SPLIT_CIRCLE_COLOR_g"), get_variable("RIGHT_SPLIT_CIRCLE_COLOR_b")],
                150,
                split_values[1]
            );
            text(split_values[1], SPLIT_CIRCLE_RIGHT_POS[0], SPLIT_CIRCLE_RIGHT_POS[1] + textAscent()/3);
        }

          

    }


    update_animated_variables();
}

function mouseClicked()
{
    if (game_over)
    {
        textSize(30);
        if (mouseX >= Consts.canvas_size[0] - 70 - textWidth("Restart")/2 && mouseX <= Consts.canvas_size[0] - 70 + textWidth("Restart")/2 && mouseY >= Consts.canvas_size[1] - 20 - textAscent() && mouseY <= Consts.canvas_size[1] - 20)
        { 
            location.reload();
        }
        return;
    }

    if (!circle_selected)
    {
        let checks = checkIfMouseOverCircle();
        if (checks[0])
        {
            if (left_circle_amount != 1)
            {
                selected_circle = true;
                circle_selected = 1;
                animate_var("LEFT_CIRCLE_x", get_variable("LEFT_CIRCLE_x"), Consts.center_pos[0], 100, TimeMods.ease_in_out_back, 0, Loops.NONE);
                updateCircleColor("LEFT_CIRCLE_COLOR", ...NON_SELECTED_COLOR);
            }
        }
        else if (checks[1])
        {
            if (right_circle_amount != 1)
            {
                selected_circle = true;
                circle_selected = 2;
                animate_var("RIGHT_CIRCLE_x", get_variable("RIGHT_CIRCLE_x"), Consts.center_pos[0], 100, TimeMods.ease_in_out_back, 0, Loops.NONE)
                updateCircleColor("RIGHT_CIRCLE_COLOR", ...NON_SELECTED_COLOR);
            }
        }
    }
 
    if (circle_selected)
    {   
        let checkHovered = checkIfOverSelectionArrow();

        if (checkHovered[0])
        {
            if (circle_selected == 1)
                if (left_circle_amount > 0)
                { left_circle_amount -= 1; split_values[0] += 1; }
             
            if (circle_selected == 2)
                if (right_circle_amount > 0)
                {   right_circle_amount -= 1; split_values[0] += 1; }
        }
        if (checkHovered[1])
        {
            if (circle_selected == 1)
                if (left_circle_amount > 0)
                { left_circle_amount -= 1; split_values[1] += 1; }
             
            if (circle_selected == 2)
                if (right_circle_amount > 0)
                {   right_circle_amount -= 1; split_values[1] += 1; }

        }
        if (checkHovered[2])
        {
            split_values[0] -= 1;
            if (circle_selected == 1)
                left_circle_amount += 1;
            else if (circle_selected == 2)
                right_circle_amount += 1;
        }
        if (checkHovered[3])
        {
            split_values[1] -= 1;
            if (circle_selected == 1)
                left_circle_amount += 1;
            else if (circle_selected == 2)
                right_circle_amount += 1;
        }

        if (checkIfOverSubmitButton())
        {
            if ((circle_selected === 1 && left_circle_amount != 0) || (circle_selected === 2 && right_circle_amount != 0))
            { // cannot submit; haven't been fully split
                if (circle_selected === 1)
                {   animate_var("LEFT_CIRCLE_COLOR_r", 0, 255, 20, TimeMods.linear, 0, Loops.NONE);  };
                if (circle_selected === 2)
                {   animate_var("RIGHT_CIRCLE_COLOR_r", 0, 255, 20, TimeMods.linear, 0, Loops.NONE) };
            }
            else if (split_values[0] == 0 || split_values[1] == 0)
            {
                alert("You have to have at least 1 on each side!")
            }
            else if (split_values[0] == 1 && split_values[1] == 1)
            { // winning split
                animate_var("GAME_OVER_CIRCLE_rotation", 0, 6.28318530718, 1000, TimeMods.linear, 0, Loops.LOOP);
                animate_var("GAME_OVER_CIRCLE_COLOR_r", 0, 255, 100, TimeMods.linear, Math.random(), Loops.CYCLE);
                animate_var("GAME_OVER_CIRCLE_COLOR_g", 0, 255, 133, TimeMods.linear, Math.random(), Loops.CYCLE);
                animate_var("GAME_OVER_CIRCLE_COLOR_b", 0, 255, 166, TimeMods.linear, Math.random(), Loops.CYCLE);
                game_over = true;
            }
            else
            { // successful split
                animate_var("LEFT_CIRCLE_x", SPLIT_CIRCLE_LEFT_POS[0], Consts.canvas_size[0] * 1/5, 60, TimeMods.ease_out_sine, 0, Loops.NONE);
                animate_var("RIGHT_CIRCLE_x", SPLIT_CIRCLE_RIGHT_POS[0], Consts.canvas_size[0] * 4/5, 60, TimeMods.ease_out_sine, 0, Loops.NONE);
                left_circle_amount = split_values[0] + 0;
                right_circle_amount = split_values[1] + 0;
                split_values = [0, 0];
                circle_selected = undefined;
                selected_circle = false;
                
                current_turn = current_turn == 1? 2 : 1;
                
            }

        }
    }
}