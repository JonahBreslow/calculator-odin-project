// DOM elements
const display = document.getElementById("display");
const expression = document.getElementById("expression");
const buttons = document.querySelectorAll("button");

// Variables
let expr = {
  lOperand: "",
  operator: "",
  rOperand: "",
};

// Event Listeners
buttons.forEach((button) => {
  button.addEventListener("click", buildExpression);
});

function buildExpression(e) {
  const button = e.target;
  const buttonValue = button.innerHTML.trim();

  switch (buttonValue) {
    case "+":
    case "-":
    case "x":
    case "÷":
      if (expr.lOperand !== "" && expr.rOperand === "") {
        expr.operator = buttonValue;
        expression.innerHTML = `${expr.lOperand} ${expr.operator}`;
      } else if (expr.lOperand !== "" && expr.rOperand !== "") {
        expression.innerHTML = `${expr.lOperand} ${expr.operator} ${expr.rOperand} ${buttonValue}`;
        result = operate(expr.lOperand, expr.operator, expr.rOperand);
        expr.lOperand = result.toString();
        expr.operator = buttonValue;
        expr.rOperand = "";
        display.innerHTML = expr.lOperand;
      } else if (expr.lOperand === "" && expr.rOperand === "") {
        result = operate(0, buttonValue, 0);
        console.log(result);
        expr.lOperand = "0";
        expr.operator = buttonValue;
        expr.rOperand = "";
      }
      console.log(expr);
      break;

    case "=":
      if (
        expr.lOperand !== "" &&
        expr.operator !== "" &&
        expr.rOperand !== ""
      ) {
        expression.innerHTML = `${expr.lOperand} ${expr.operator} ${expr.rOperand} = `;
        result = operate(expr.lOperand, expr.operator, expr.rOperand);
        expr.lOperand = result.toString();
        expr.operator = "";
        expr.rOperand = "";
        display.innerHTML = expr.lOperand;
      } else if (
        expr.lOperand !== "" &&
        expr.operator !== "" &&
        expr.rOperand === ""
      ) {
        expression.innerHTML = `${expr.lOperand} ${expr.operator} ${expr.lOperand} = `;
        result = operate(expr.lOperand, expr.operator, expr.lOperand);
        expr.rOperand = result.toString();
        display.innerHTML = expr.lOperand;
      }
      console.log(expr);
      break;

    case "C":
      expr = {
        lOperand: "",
        operator: "",
        rOperand: "",
      };
      expression.innerHTML = "";
      display.innerHTML = 0;
      console.log(expr);
      break;

    default:
      addToOperands(buttonValue);
      break;
  }
}

function resetCalculator() {
  display.innerHTML = "";
  expression.innerHTML = "";
  expr = {
    lOperand: "",
    operator: "",
    rOperand: "",
  };
}

function addToOperands(buttonValue) {
  if (expr.operator === "") {
    expr.lOperand += buttonValue;
  } else {
    expr.rOperand += buttonValue;
  }
  display.innerHTML = expr.operator === "" ? expr.lOperand : expr.rOperand;
  console.log(expr);
}

function operate(lo, op, ro) {
  const left = Number(lo);
  const right = Number(ro);
  switch (op) {
    case "+":
      return round(left + right);
    case "-":
      return round(left - right);
    case "x":
      return round(left * right);
    case "÷":
      return round(left / right);
  }
}

// TODO: Make rounding better. This is too naive. use precision based on inputs, not just 1000
function round(number) {
  return Math.round(number * 1000) / 1000;
}
