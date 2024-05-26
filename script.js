
let divisionByZero = false;
let numbers = [];
let operator = null;
let tempNum = '';
const MAX_DECIMALS = 4;

const Operators = {
    ADD: 'add',
    SUBTRACT: 'subtract',
    MULTIPLY: 'multiply',
    DIVIDE: 'divide',
    EQUAL: 'equal'
}

const keybrd = document.getElementById('keyboard');
const upperSpan = document.querySelector('#upper-numbers span');
const lowerSpan = document.querySelector('#lower-numbers span');


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
    if (b === 0) {
        divisionByZero = true;
        return 'ERROR';
    }

    let result = a / b;
    let resultToString = result.toString();

    if (resultToString.includes('.')) {
        if (resultToString.split('.')[1].length > MAX_DECIMALS) {
            return Number(resultToString).toFixed(MAX_DECIMALS);
        }
    }

    return result;
}

function operate(a, b, op) {
    switch(op) {
        case Operators.ADD:
            return add(a, b);
        case Operators.SUBTRACT:
            return subtract(a, b);
        case Operators.MULTIPLY:
            return multiply(a, b);
        case Operators.DIVIDE:
            return divide(a, b);
        default:
            return null;
    }
}


function resetCalculator() {
    lowerSpan.textContent = '0';
    upperSpan.textContent = '';
    tempNum = '';
    numbers = [];
    operator = null;
    divisionByZero = false;
}

keybrd.addEventListener('click', e => {
    const targetClass = e.target.getAttribute('class');
    const targetId = e.target.getAttribute('id');
    const targetText = e.target.textContent;

    if (divisionByZero === true) resetCalculator();

    // Clicked a number.
    if (targetClass === 'number') {
        tempNum += targetText;
        lowerSpan.textContent = tempNum;
    }

    // Clicked the dot.
    if (targetId === 'dot' && !tempNum.includes('.') /*&& tempNum !== ''*/) {
        tempNum += '.';
        lowerSpan.textContent = tempNum;        
    }

    // Clicked an operator.
    if (targetClass === 'operator') {    
        let result = null;
    
        if (operator !== Operators.EQUAL){
            numbers.push(Number(tempNum));
            lowerSpan.textContent = tempNum = '';
        }

        if (numbers.length === 2) {
            result = operate(numbers[0], numbers[1], operator);
            numbers = (!divisionByZero) ? [result] : [];
        }
    
        operator = targetId;

        // Update display

        if (operator != Operators.EQUAL) {

            upperSpan.textContent = (divisionByZero) ? result :
            numbers[0] + targetText;
        } else {
            upperSpan.textContent = '';
            lowerSpan.textContent = (divisionByZero) ? result : 
            numbers[0];
        }
    }

    // Clicked AC.
    if (targetId === 'all-clear') {
        resetCalculator();
    }

    // Clicked C.
    if (targetId === 'clear') {
        tempNum = tempNum.slice(0, -1);
        lowerSpan.textContent = tempNum || '0';
    }

});