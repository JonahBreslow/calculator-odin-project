// DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button')

// Event Listeners
buttons.forEach(button => {
    button.addEventListener('click', buildExpression)
})

// functions
function buildExpression(e) {
    const button = e.target;
    const buttonValue = button.innerHTML.trim();
    console.log(buttonValue);
    let displayValue = display.textContent;
    const computeButtons = ['x', '-', '+', '=']
    if (!computeButtons.includes(buttonValue)) {
        displayValue += buttonValue;
        displayValue = displayValue.replace(/\s/g, '');
        display.innerHTML = displayValue;
    }
}