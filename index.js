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

let currentOperand = '0';
let previousOperand = '';
let operation = null;

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

// DOM elements
const currentOperandElement = document.querySelector('.current-operand');
const previousOperandElement = document.querySelector('.previous-operand');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const decimalButton = document.querySelector('.decimal');

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    if (operation && previousOperand !== '') {
        const operatorSymbol = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷'
        }[operation];
        previousOperandElement.textContent = `${previousOperand} ${operatorSymbol}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

function appendNumber(number) {
    if (currentOperand === '0') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!currentOperand.includes('.')) {
        currentOperand += '.';
        updateDisplay();
    }
}

function chooseOperation(operator) {
    if (previousOperand !== '') {
        calculate();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

function calculate() {
    if (operation === null || previousOperand === '') return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    let result = operate(prev, current, operation);

    if (operation === 'divide' && current === 0) {
        currentOperand = 'Error';
    } else {
        currentOperand = String(result);
    }

    operation = null;
    previousOperand = '';
    updateDisplay();
}

function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand.length === 1 || currentOperand === 'Error') {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.number);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.dataset.operator);
    });
});

equalsButton.addEventListener('click', calculate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
decimalButton.addEventListener('click', appendDecimal);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape') {
        clear();
    } else if (e.key === 'Backspace') {
        deleteNumber();
    } else if (e.key === '+') {
        chooseOperation('add');
    } else if (e.key === '-') {
        chooseOperation('subtract');
    } else if (e.key === '*') {
        chooseOperation('multiply');
    } else if (e.key === '/') {
        e.preventDefault();
        chooseOperation('divide');
    }
});