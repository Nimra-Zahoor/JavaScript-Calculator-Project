let operator = [];
let operand = [];
let variables = {}; // Object to store variables and their values
let expression = "";
let history = [];
let err = "";
let sign ;

const isNumber = (char)=> {
  return !isNaN(parseFloat(char));
  }
  const appendNumber = (number) => {
   if(isNumber(number))
   {
    console.log("if working")
    expression+=number;
    document.getElementById("result").value += number;
   }
   else{
    console.log("not a number")
   }
    // if(number<0)
    // { 
    //   number = "-"+"number"
    //   document.getElementById("result").value += number;
    //   expression += number;
    // }
   
//    expression += number;
    
  };
  
  
const appendCharacter = (char) => {

 
    document.getElementById("result").value += char;
  expression += char;
};

const getPrecedence = (operator) => {
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
};
const applyOperator = (operator) => {
  const b = parseFloat(operand.pop());
  const a = parseFloat(operand.pop());
  let result;
  switch (operator) {
    case "+":
    case "":  
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
  // Validate the expression format using regular expressions
  let regex = /^(-?\d+(\.\d+)?|[a-zA-Z]+)(\s*[-+\/*^%]\s*(-?\d+(\.\d+)?|[a-zA-Z]+))*$/;
  if (!regex.test(expression)) {
    err = "Invalid Expression";
    document.getElementById("error").textContent = err;
    document.getElementById("result").classList.add("error-input");

    return;
  }
  operand = [];
  operator = [];
   regex = /(\d+(\.\d+)?|[a-zA-Z]+|\+|\-|\*|\/|\(|\)|\%|\^|sqrt|cos|tan|sin|PI|e)/g;
  if(!isNumber(expression[0])){
    regex = /(-?\d+(\.\d+)?|[a-zA-Z]+|\+|\-|\*|\/|\(|\)|\%|\^|sqrt|cos|tan|sin|PI|e)/g;
  }
  const tokens = expression.match(regex);
  console.log("tokens",tokens)
  if (!tokens || tokens.length === 0) {
    err = "Add correct Expression";
    document.getElementById("error").value = err;
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
      if (token in variables) {
        // Use variable value instead of the variable name
        operand.push(variables[token]);
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
  console.log(finalResult)
};
let historyText = "";
const handleHistory = () => {
  history = JSON.parse(localStorage.getItem("history")) || [];
  console.log(history.length)
  for (let i = 0; i < history.length; i++) {
  const historyItem = history[i];
  historyText += historyItem + "\n";
  }
  document.getElementById("history").innerHTML = historyText;
  };
  const deleteHistoryItem = (index) => {
    console.log("delete history working")
    if (index >= 0 && index <= history.length) {
      console.log("if working")
      console.log("i am history before delete",history)
      history.splice(index, 1);
      localStorage.setItem("history", JSON.stringify(history));
      console.log("i am history after delete",history)
      document.getElementById("history").innerHTML = history+"\n";
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
    console.log(variables);

  }
  else {
    err = "Variable already exists";
    console.log("i am working")
    document.getElementById("error").textContent = err;
    document.getElementById("variableName").classList.add("error-input");
    document.getElementById("variableValue").classList.add("error-input");
  }
};
handleHistory();
