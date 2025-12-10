function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let numA = 0;
let numB = 0;
let operand = "undefined";

function operate(a, b, operand) {
    switch (operand) {
        case "add": {
            return add(a, b);
        }
        case "subtract": {
            return subtract(a, b);
        }
        case "multiply": {
            return multiply(a, b);
        }
        case "divide": {
            return divide(a, b);
        }
    }
}