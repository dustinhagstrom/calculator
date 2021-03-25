//below are the variables that I use to store click data and a boolean to direct numbers to the first or second variable.
let firstNumber = "";
let secondNumber = "";
let displayString = "";
let operation = "";
let operatorStringSwitch = true;

//targets for the buttons and one target for the display
const addButton = document.querySelector("#operator-add");
const minusButton = document.querySelector("#operator-minus");
const multiplyButton = document.querySelector("#operator-multiply");
const divideButton = document.querySelector("#operator-divide");
const oneButton = document.querySelector("#number-1");
const twoButton = document.querySelector("#number-2");
const threeButton = document.querySelector("#number-3");
const fourButton = document.querySelector("#number-4");
const fiveButton = document.querySelector("#number-5");
const sixButton = document.querySelector("#number-6");
const sevenButton = document.querySelector("#number-7");
const eightButton = document.querySelector("#number-8");
const nineButton = document.querySelector("#number-9");
const zeroButton = document.querySelector("#number-0");
const periodButton = document.querySelector("#number-period");
const clearButton = document.querySelector("#number-clear");
const equalsButton = document.querySelector("#number-equals");
const theDisplay = document.querySelector("#display-result");

//event listeners for the buttons
addButton.addEventListener("click", operatorClickedHandler);
minusButton.addEventListener("click", operatorClickedHandler);
multiplyButton.addEventListener("click", operatorClickedHandler);
divideButton.addEventListener("click", operatorClickedHandler);
oneButton.addEventListener("click", numberClickedHandler);
twoButton.addEventListener("click", numberClickedHandler);
threeButton.addEventListener("click", numberClickedHandler);
fourButton.addEventListener("click", numberClickedHandler);
fiveButton.addEventListener("click", numberClickedHandler);
sixButton.addEventListener("click", numberClickedHandler);
sevenButton.addEventListener("click", numberClickedHandler);
eightButton.addEventListener("click", numberClickedHandler);
nineButton.addEventListener("click", numberClickedHandler);
periodButton.addEventListener("click", periodClickedHandler);
zeroButton.addEventListener("click", numberClickedHandler);
clearButton.addEventListener("click", clearClickedHandler);
equalsButton.addEventListener("click", equalsClickedHandler);

//------------------------math functions--------------------

//this function adds chars 0-9 to either the first or second variable and displays all the chars pressed thus far.

function numberClickedHandler(event) {
  displayString += event.target.innerText;
  if (operatorStringSwitch === true) {
    firstNumber += event.target.innerText;
  }
  if (operatorStringSwitch === false) {
    secondNumber += event.target.innerText;
  }
  theDisplay.innerText = displayString;
}

//this function adds a char that subtracts, adds, multiplies, or divides to the display if one of those chars is not already in the display. If one of those chars already in display then it calls the function that processes an equal click to perform the math on display -> put result in first variable -> display the result and also then display the new operator char. at the end it also directs new button presses to second variable by changing boolean to false.

//strange case if the result of an operation is negative then the first variable contains a "-", therefore you have to account for that negative which explains the first part of the if statement.

function operatorClickedHandler(event) {
  if (displayString === "-") {
  }
  if (
    parseInt(displayString) > 0 &&
    (displayString.includes("-") ||
      displayString.includes("+") ||
      displayString.includes("*") ||
      displayString.includes("/"))
  ) {
    equalsClickedHandler();
  }
  if (displayString.length < 1) {
    return displayString;
  }
  displayString += event.target.innerText;
  theDisplay.innerText = displayString;
  operatorStringSwitch = !operatorStringSwitch;
  operation = event.target.getAttribute("data-num");
}

//this function performs the math on display. it also sets result as first variable and clears the second variable then it changes the boolean to put numbers to false. if this function is run by the operatorClickedHandler then the boolean is set to true and later set to false by the operatorClickedHandler.

function equalsClickedHandler() {
  displayString = eval(firstNumber + operation + secondNumber);
  displayString = displayString.toString();
  firstNumber = displayString;
  secondNumber = "";
  operatorStringSwitch = !operatorStringSwitch;
  theDisplay.innerText = displayString;
}

//this function resets all data sets to original values.

function clearClickedHandler(params) {
  theDisplay.innerText = "";
  displayString = "";
  firstNumber = "";
  secondNumber = "";
  operation = "";
  operatorStringSwitch = true;
}

//this function adds a period to the display. It is then focused on either the first number or the second number variable (whichever the boolean is set to at this time). If the variable for our number already has a period then everything clears by calling the clear function. If our variable does not have a period then a period is added to our variable.

function periodClickedHandler(event) {
  displayString += event.target.innerText;
  theDisplay.innerText = displayString;
  if (operatorStringSwitch === true && firstNumber.includes(".") === false) {
    return (firstNumber += event.target.innerText);
  }
  if (operatorStringSwitch === false && secondNumber.includes(".") === false) {
    return (secondNumber += event.target.innerText);
  } else {
    clearClickedHandler();
  }
}
