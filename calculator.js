let operator = [];
let operand = [];
let variables = {};
let expression = "";
let history = [];
let err = "";

const isNumber = (char) => {
  return !isNaN(parseFloat(char));
};

const appendNumber = (number) => {
  if (isNumber(number)) {
    expression += number;
    document.getElementById("result").value += number;
  }
};

const appendCharacter = (char) => {
  document.getElementById("result").value += char;
  expression += char;
};

const getPrecedence = (operator) => {
  const precedence = {
    "(": 0,
    ")": 1,
    "+": 2,
    "-": 2,
    "*": 3,
    "/": 3,
    "%": 3,
    "^": 4,
    "sqrt": 4,
    "cos": 4,
    "tan": 4,
    "sin": 4,
    "PI": 4,
    "e": 4,
  };

  return precedence[operator] || -1;
};

const applyOperator = (operator) => {
  const b = parseFloat(operand.pop());
  const a = parseFloat(operand.pop());
  let result;
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
    case "%":
      result = a % b;
      break;
    case "^":
      result = Math.pow(a, b);
      break;
    case "sqrt":
      result = Math.sqrt(b);
      break;
    case "tan":
      result = Math.tan((Math.PI / 180) * b);
      break;
    case "cos":
      result = Math.cos((Math.PI / 180) * b);
      break;
    case "sin":
      result = Math.sin((Math.PI / 180) * b);
      break;
    case "PI":
      result = Math.PI * b;
      break;
    case "e":
      result = Math.E * b;
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
  document.getElementById("result").classList.remove("error-input");

  if (!expression) {
    err = "Expression cannot be empty";
    document.getElementById("error").textContent = err;
    return;
  }
  operand = []
  operator = []
regex = /(\d+(\.\d+)?|[a-zA-Z]+|\+|\-|\*|\/|\(|\)|\%|\^|sqrt|cos|tan|sin|PI|e)/g;
if(!isNumber(expression[0])){
  console.log("expression[0]",expression[0])
regex = /(-?\d+(\.\d+)?|[a-zA-Z]+|\+|\-|\*|\/|\(|\)|\%|\^|sqrt|cos|tan|sin|PI|e)/g;
}
const tokens = expression.match(regex);
if (!tokens || tokens.length === 0) {
err = "Add correct Expression";
console.log("tokens",tokens)
document.getElementById("error").value = err;
return;
}
  let i =0;
  for (i in tokens ){
    const token = tokens[i];
    if (isNumber(token)) {
      operand.push(token);
    } else if (token === "(") {
      operator.push(token);
    } else if (token === ")") {
      while (operator.length > 0 && operator[operator.length - 1] !== "(") {
        const result = applyOperator(operator.pop());
        console.log("Result of bracket",result)
        operand.pop();
        operand.push(result);
        console.log("operands",operand);
      }
      if (operator.length > 0 && operator[operator.length - 1] === "(") {
        operator.pop();
      }
    } else {
      if (token in variables) {
        operand.push(variables[token]);
      } 
       else {
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
  }

  while (operator.length > 0) {
    const result = applyOperator(operator.pop());
    operand.push(result);
  }

  let finalResult = operand[0];

  if (finalResult.includes(".")) {
    finalResult = parseFloat(finalResult);
    finalResult = finalResult.toFixed(4);
  }

  if (
    isNaN(finalResult) ||
    finalResult === undefined ||
    finalResult === null ||
    finalResult === "Infinity" ||
    finalResult === ""
  ) {
    err = "Invalid Expression";
    document.getElementById("error").textContent = err;
    document.getElementById("result").classList.add("error-input");
  } else {
    document.getElementById("error").textContent = "";
    document.getElementById("result").classList.remove("error-input");

    document.getElementById("result").value = finalResult;
    history.unshift(expression + " = " + finalResult);
    localStorage.setItem("history", JSON.stringify(history));
  }
};

const handleHistory = () => {
  history = JSON.parse(localStorage.getItem("history")) || [];
  let historyText = "";
  for (let i = 0; i < history.length; i++) {
    const historyItem = history[i];
    historyText += historyItem + "\n";
  }
  document.getElementById("history").innerHTML = historyText;
};

const deleteHistoryItem = (index) => {
  if (index >= 0 && index < history.length) {
    history.splice(index, 1);
    localStorage.setItem("history", JSON.stringify(history));
    handleHistory();
  }
};

const clearInput = () => {
  document.getElementById("result").value = "";
  document.getElementById("history").value = "";
  expression = "";
  history = [];
  operand = [];
  operator = [];
};

const appendBackspace = () => {
  let expression = document.getElementById("result").value;
  expression = expression.slice(0, -1);
  document.getElementById("result").value = expression;
};

const addVariable = () => {
  const variableName = document.getElementById("variableName").value;
  const variableValue = document.getElementById("variableValue").value;
  if (variableName && variableValue && !variables[variableName]) {
  
  variables[variableName] = variableValue;
  document.getElementById("variableName").value = "";
  document.getElementById("variableValue").value = "";
  document.getElementById("variableName").classList.remove("error-input");
  document.getElementById("variableValue").classList.remove("error-input");
  err = "";
  document.getElementById("error").textContent = err;
  
  }
  else {
  err = "Variable already exists";
  document.getElementById("error").textContent = err;
  document.getElementById("variableName").classList.add("error-input");
  document.getElementById("variableValue").classList.add("error-input");
  }
  };
handleHistory();
