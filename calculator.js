let operator = [];
let operand = [];
let expression = "";
let history = [];

function isNumber(char) {
return !isNaN(parseFloat(char));
}

const appendNumber = (number) => {
document.getElementById("result").value += number;
expression += number;
};

const appendCharacter = (char) => {
document.getElementById("result").value += char;
expression += char;
};

function getPrecedence(operator) {
switch (operator) {
case "(":
return 0;
case ")":
return 1;
case "+":
case "-":
return 2;
case "*":
case "/":
case "%":
return 3;
case "^":
case "sqrt":
case "cos":
case "tan":
case "sin":
case "PI":
case "e":
return 4;
default:
return -1;
}
}
const applyOperator = (operator) => {
const a = parseFloat(operand.pop());
let result;
switch (operator) {
case "+":
result = parseFloat(operand.pop()) + a;
break;
case "-":
result = parseFloat(operand.pop()) - a;
break;
case "*":
result = parseFloat(operand.pop()) * a;
break;
case "/":
result = parseFloat(operand.pop()) / a;
break;
case "%":
result = parseFloat(operand.pop()) % a;
break;
case "^":
result = Math.pow(parseFloat(operand.pop()), a);
break;
case "sqrt":
result = Math.sqrt(a);
break;
case "tan":
result = Math.tan((Math.PI / 180) * a);
break;
case "cos":
result = Math.cos((Math.PI / 180) * a);
break;
case "sin":
result = Math.sin((Math.PI / 180) * a);
break;
case "PI":
result = a* 3.14159;
console.log("The PI result",parseFloat(result))
break;
case "e":
  console.log(a)
  result = a * 2.71828;
  console.log(result)
break;
default:
result = 0;
break;
}
operand.push(result.toString());
return result;
};

const calculateResult = () => {
expression = document.getElementById("result").value;
operand = [];
operator = [];
const regex = /(\d+(\.\d+)?|\+|\-|\*|\/|\(|\)|\%|\^|sqrt|cos|tan|sin|PI|e)/g;
const tokens = expression.match(regex);
if (!tokens || tokens.length === 0) {
const err = "Add correct Expression";
document.getElementById("Error").value = err;
console.log("Invalid expression");
return;
}
for (let i = 0; i < tokens.length; i++) {
const token = tokens[i];
if (isNumber(token)) {
operand.push(token);
} else if (token === "(") {
operator.push(token);
} else if (token === ")") {
while (operator.length > 0 && operator[operator.length - 1] !== "(") {
const result = applyOperator(operator.pop());
operand.push(result);
}
if (operator.length > 0 && operator[operator.length - 1] === "(") {
operator.pop(); // Pop "(" from the operator stack
}
} else {
while (
operator.length > 0 &&
getPrecedence(operator[operator.length - 1]) >= getPrecedence(token)
) {
const result = applyOperator(operator.pop());
operand.push(result);
}
operator.push(token);
}
}

while (operator.length > 0) {
const result = applyOperator(operator.pop());
operand.push(result);
}

finalResult = operand[0];

if (finalResult.includes(".")) {
finalResult = parseFloat(finalResult);
finalResult = finalResult.toFixed(4);
}
document.getElementById("result").value = finalResult;
history.unshift(expression + " = " + finalResult);
if (history.length > 6) {
history.pop();
}
localStorage.setItem("history", JSON.stringify(history));
};
const handleHistory = () => {
history = JSON.parse(localStorage.getItem("history")) || [];
let historyText = "";
for (let i = 0; i < history.length; i++) {
const historyItem = history[i];
// const binIcon = `<span class="delete-icon" onclick="deleteHistoryItem(${i})">🗑</span>`;
historyText += historyItem + "\n";
}
document.getElementById("history").innerHTML = historyText;
};
const clearInput = () => {
document.getElementById("result").value = "";
document.getElementById("history").value = "";

expression = "";
operand = [];
operator = [];
};
const deleteHistoryItem = (index) => {
history.splice(index, 1);
localStorage.setItem("history", JSON.stringify(history));
handleHistory();
};
const appendBackspace = () => {
let expression = document.getElementById("result").value;
expression = expression.slice(0, -1);
document.getElementById("result").value = expression;
};

