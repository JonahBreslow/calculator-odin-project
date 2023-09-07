// DOM elements
const display = document.getElementById("display");
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
      } else if (expr.lOperand !== "" && expr.rOperand !== "") {
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
      break;

    case "=":
      if (
        expr.lOperand !== "" &&
        expr.operator !== "" &&
        expr.rOperand !== ""
      ) {
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
        result = operate(expr.lOperand, expr.operator, expr.lOperand);
        expr.lOperand = result.toString();
        expr.rOperand = "";
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
      display.innerHTML = 0;
      break;

    default:
      if (expr.operator === "") {
        expr.lOperand += buttonValue;
      } else {
        expr.rOperand += buttonValue;
      }
      display.innerHTML = expr.operator === "" ? expr.lOperand : expr.rOperand;
      break;
  }
}

function operate(lo, op, ro) {
  // TODO: Deal with floating points -___-
  const left = Number(lo);
  const right = Number(ro);
  switch (op) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "x":
      return left * right;
    case "÷":
      return left / right;
  }
}

function precisionRound(number, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
