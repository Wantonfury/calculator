let screen = document.querySelector("#screen-text");
let screenSubtext = document.querySelector("#screen-subtext");

let displayValue = "0";
let storedValues = ["", ""];
let storedOperator = "";

let displayRequireInput = true;

let calculate = () => {
    if (!storedOperator || displayRequireInput) return;
    
    let a = parseFloat(storedValues[0]);
    let b = parseFloat(displayValue);
    
    storedValues[1] = displayValue;
    
    switch (storedOperator) {
        case "+":
            displayValue = String(a + b);
            break;
        case "-":
            displayValue = String(a - b);
            break;
        case "*":
            displayValue = String(a * b);
            break;
        case "/":
            displayValue = String(a / b);
            break;
    }
    
    displayRequireInput = true;
}

let operate = op => {
    if (displayRequireInput) {
        if (storedValues[0]) {
            storedValues[0] = displayValue;
            storedValues[1] = "";
            storedOperator = op;
        }
        return;
    }
    
    if (storedOperator) {
        calculate();
        storedValues[0] = displayValue;
        storedValues[1] = "";
        storedOperator = op;
    }
    else {
        storedOperator = op;
        storedValues[0] = displayValue;
        storedValues[1] = "";
        displayValue = "0";
        
        displayRequireInput = true;
    }
}

let opClear = () => {
    displayValue = "0";
    storedValues = ["", ""];
    storedOperator = "";
    displayRequireInput = true;
}

let opSign = () => {
    if (displayValue == "0" || displayRequireInput) return;
    
    if (displayValue[0] != "-") displayValue = "-" + displayValue;
    else displayValue = displayValue.substring(1);
}

let opPercent = () => {
    if (displayValue == "0" || displayRequireInput) return;
    displayValue = (displayValue[0] == "-" ? "-0.0" : "0.0") + displayValue.replace(".", "").replace("-", "");
}

let btnNumber = e => {
    if (displayRequireInput && e.target.dataset.key == "0") return;
    if (displayRequireInput) {
        displayValue = e.target.dataset.key;
        displayRequireInput = false;
    }
    else displayValue = displayValue + e.target.dataset.key;
    
    display();
}

let btnOperator = e => {
    switch (e.target.dataset.key) {
        case "c":
            opClear();
            break;
        case "s":
            opSign();
            break;
        case "%":
            opPercent();
            break;
        case "=":
            calculate();
            break;
        default:
            operate(e.target.dataset.key);
            break;
    }
    
    display();
}

let display = () => {
    screenSubtext.textContent = storedValues[0] + (storedOperator ? ` ${storedOperator} ` : '') + storedValues[1];
    screen.textContent = displayValue;
}

let init = () => {
    let buttons = document.querySelectorAll("#keypad button");
    
    buttons.forEach(b => {
        if (!isNaN(b.dataset.key) && !isNaN(parseFloat(b.dataset.key))) {
            b.addEventListener('click', btnNumber);
        } else b.addEventListener('click', btnOperator);
    });
}

init();