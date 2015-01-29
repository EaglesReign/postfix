//Phil Hofer
//1/28/2015
//postfix.js
//This program does this.

//Prompts the user for an infix expression
var input = readline();
//Passes input to the main function that does the work of converting
//from infix to postfix notation.
postfixCalc(input);

//Stack constructor
function Stack() {
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.length = length;
}

//push function
function push(element) {
  this.dataStore[this.top++] = element;
}

//pop function
function pop() {
  return this.dataStore[--this.top];
}

//peek function
function peek() {
  return this.dataStore[this.top-1];
}

//length function
function length() {
  return this.top;
}

//clear function
function clear() {
  this.top = 0;
}

function isOperand(x) {
  if (!(isNaN(x))) {
    return true;
  } else {
    return false;
  }
}

//main function that converts an infix notation function to postfix
function postfixCalc (input) {
  var operandatorStack = new Stack();
  for (var i = 0; i < input.length; i++) {
    if (isOperand(input[i])) {
      operandatorStack.push(input[i]);
      print("Pushing to stack:" + input [i]);
    }
    //operandatorStack.push(input[i]);
    //isOperand(input[i]);
    print("This is what the input character is: " + input[i]);
  }
}


