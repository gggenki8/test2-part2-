document.addEventListener("DOMContentLoaded", () => {
    const states = document.getElementById("states");
    let currentInput = "0";
    let firstOperand = null;
    let operator = null;
    let ResetInput = false;
    let currentEquation = "";
  
    const addNumber = (number) => {
      if (ResetInput) {
        currentInput = number;
        ResetInput = false;
      } else {
        if (currentInput === "0" && !currentInput.includes(".")) {
          if (number === "0" || number === "00") {
            return;
          } else {
            currentInput = number;
          }
        } else {
          currentInput += number;
        }
      }
      if (operator !== null) {
        currentEquation = `${firstOperand} ${operator} ${currentInput}`;
      } else {
        currentEquation = currentInput;
      }
      states.textContent = currentEquation;
    };
  
    const addDot = () => {
      if (currentInput.includes(".")) return;
      currentInput += ".";
      if (operator !== null) {
        currentEquation = `${firstOperand} ${operator} ${currentInput}`;
      } else {
        currentEquation = currentInput;
      }
      states.textContent = currentEquation;
    };
  
    const setOperator = (newOperator) => {
      if (currentInput === "") return;
      if (operator && ResetInput) {
        operator = newOperator;
        currentEquation = `${firstOperand} ${operator}`;
        states.textContent = currentEquation;
        return;
      }
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
      } else if (operator) {
        firstOperand = calculateResult();
      }
      operator = newOperator;
      currentEquation = `${firstOperand} ${operator}`;
      states.textContent = currentEquation;
      ResetInput = true;
    };
  
    const calculateResult = () => {
      if (operator === null || firstOperand === null)
        return parseFloat(currentInput);
      const secondOperand = parseFloat(currentInput);
      switch (operator) {
        case "+":
          return firstOperand + secondOperand;
        case "-":
          return firstOperand - secondOperand;
        case "*":
          return firstOperand * secondOperand;
        case "/":
          return secondOperand !== 0 ? firstOperand / secondOperand : "error";
        default:
          return secondOperand;
      }
    };
  
    const calculate = () => {
      if (operator == null) return;
      const result = calculateResult();
      states.textContent = result;
      firstOperand = result;
      operator = null;
      ResetInput = true;
      currentEquation = "";
      currentInput = result.toString();
    };
  
    const clearAll = () => {
      currentInput = "0";
      firstOperand = null;
      operator = null;
      ResetInput = false;
      currentEquation = "";
      states.textContent = "0";
    };
  
    document.getElementById("seven").addEventListener("click", () => addNumber("7"));
    document.getElementById("eight").addEventListener("click", () => addNumber("8"));
    document.getElementById("nine").addEventListener("click", () => addNumber("9"));
    document.getElementById("four").addEventListener("click", () => addNumber("4"));
    document.getElementById("five").addEventListener("click", () => addNumber("5"));
    document.getElementById("six").addEventListener("click", () => addNumber("6"));
    document.getElementById("one").addEventListener("click", () => addNumber("1"));
    document.getElementById("two").addEventListener("click", () => addNumber("2"));
    document.getElementById("three").addEventListener("click", () => addNumber("3"));
    document.getElementById("zero").addEventListener("click", () => addNumber("0"));
    document.getElementById("dobleZero").addEventListener("click", () => addNumber("00"));
    document.getElementById("dotto").addEventListener("click", addDot);
  
    document.getElementById("plus").addEventListener("click", () => setOperator("+"));
    document.getElementById("minus").addEventListener("click", () => setOperator("-"));
    document.getElementById("multiply").addEventListener("click", () => setOperator("*"));
    document.getElementById("surasshu").addEventListener("click", () => setOperator("/"));
  
    document.getElementById("result").addEventListener("click", calculate);
    document.getElementById("delete").addEventListener("click", clearAll);
  });
  