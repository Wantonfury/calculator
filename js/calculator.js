let screen = document.querySelector("#screen-text");
let screenSubtext = document.querySelector("#screen-subtext");

let displayValue = "0";
let displayStored = "";
let storedValue = "";
let storedOperator = "";

let displayReplace = true;

let calculate = () => {
    if (storedOperator == "") return;
    
    let a = parseFloat(storedValue);
    let b = parseFloat(displayValue);
    
    displayStored += " " + displayValue + " =";
    
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
    
    storedValue = "";
    storedOperator = "";
    
    displayReplace = true;
}

let operate = op => {
    if (storedOperator != "") calculate();
    
    storedOperator = op;
    storedValue = displayValue;
    displayStored = displayValue + " " + storedOperator;
    displayValue = "0";
    
    displayReplace = true;
}

let opClear = () => {
    displayValue = "0";
    displayStored = "";
    storedValue = "";
    storedOperator = "";
    displayReplace = true;
}

let opSign = () => {
    if (displayValue == "0") return;
    
    if (displayValue[0] != "-") displayValue = "-" + displayValue;
    else displayValue = displayValue.substring(1);
}

let opPercent = () => {
    if (displayValue == "0") return;
    displayValue = "0.0" + displayValue;
}

let btnNumber = e => {
    if (displayReplace) {
        displayValue = e.target.dataset.key;
        displayReplace = false;
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
    screenSubtext.textContent = displayStored;
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