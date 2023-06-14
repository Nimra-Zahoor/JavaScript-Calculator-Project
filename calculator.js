let firstOperand = null;
let secondOperand = null;
let operator = null;
const appendNumber = (operand) => {
  if (operator === null) {
    // If no operator is set, update the first operand
    if (firstOperand === null) {
      firstOperand = operand;
     // document.getElementById('result').value = firstOperand;
    } else {
      firstOperand += operand;
    }
  } else {
    // Operator is set, update the second operand
    if (secondOperand === null) {
      secondOperand = operand;
    } else {
      secondOperand += operand;
    }
  }
  console.log(firstOperand);
  console.log(secondOperand);
  document.getElementById('result').value = firstOperand;
  document.getElementById('result').value = secondOperand;
};
const appendCharacter = (op) => {
  operator = op;
  console.log(operator)
};
const calculateResult = () => {
  let result = null;
  if (firstOperand !== null && operator !== null && secondOperand !== null) {
    switch (operator) {
      case '+':
        result = parseFloat(firstOperand) + parseFloat(secondOperand);
        break;
      case '-':
        result = parseFloat(firstOperand) - parseFloat(secondOperand);
        break;
      case '*':
        result = parseFloat(firstOperand) * parseFloat(secondOperand);
        break;
      case '/':
        result = parseFloat(firstOperand) / parseFloat(secondOperand);
        break;
        
    }
    firstOperand = result.toFixed(4);
    operator = null;
    secondOperand = null;
  }
 if( result.toString().includes(".")){
  document.getElementById('result').value = result.toFixed(4);}
  document.getElementById('result').value = result
};
 const clearInput=()=>{
    document.getElementById('result').value = "";

 }

 const appendBackspace = () => {
    var expression = document.getElementById('result').value;
    expression = expression.slice(0, -1);
    document.getElementById('result').value = expression;
  };
   
    // const evaluate =()=>{
    // const operand1 = appendNumber(number);
    // console.log(operand1);
    // console.log(operand2);
    // const operator= appendCharacter(char);
    // const operand2 = appendNumber(number);
    // let result;

    // if(operator == '+')
    // {
    //     result = operand1 + operand2;
    // }
    // else if(operator == '-')
    // {
    //     result = operand1 - operand2;
    // }
    // console.log(result)
    //     document.getElementById('result').value += result;

    // }
        
  