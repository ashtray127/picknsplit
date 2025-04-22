
function easeOut_quad(x)
{
  return 1 - (1 - x) * (1 - x); 
}

function easeOut_quart(x)
{
  return 1 - Math.pow(1 - x, 4);
}

function easeOut_cubic(x)
{
  return 1 - Math.pow(1 - x, 3);
}

function easeInOut_cubic(x)
{
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeInOutBack(x)
{
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return x < 0.5? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

function easeOutElastic(x)
{
  const c4 = (2 * Math.PI) / 3;

  return x === 0? 0: x === 1? 1: Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}


function no_mod(x)
{
    return x;
}