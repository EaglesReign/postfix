//Phil Hofer
//1/28/2015
//postfix.js
//This program does this.

//DEBUG variable to debug code as I work
var DEBUG = true;

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

function isOperator(x) {
  //if y is a valid operator, return true.
  if (x==="+" || x==="-" || x==="*" || x==="/" || x==="(" || x===")") {
    print("What is being looked at: " + x);
    return true;
  } else {
    return false;
  }
}

function isOperand(y) {
  //if x is a number, return true.
  if (!(isNaN(y))) {
    return true;
  } else {
    return false;
  }
}

function whichOperator(z) {
  switch (z) {
    case "+":
	    return z;
	    break;
    case "-":
            return z;
            break;
    case "*":
            return z;
	    break;
    case "/":
            return z;
	    break;
    case "(":
            return z;
            break;
    case ")":
	    return z;
	    break;
    default:
            print("You've entered in an invalid operator.");	    
  }
}

//main function that converts an infix notation function to postfix
function postfixCalc (input) {
  //declare new stack as operatorStack
  var operatorStack = new Stack();
  //declare new string for the end result that will be printed out 
  //to the user.
  var postfixString = "";
  if (DEBUG) print("length of input: " + input.length);//DEBUG
  for (var i = 0; i < input.length; i++) {
    //if current character is an operator
    if (isOperator(input[i])) { 
      //if stack is empty or contains a "(" on top
      //if (DEBUG) print("operatorStack.length: " + operatorStack.length);
      if ((operatorStack.length == 0) || operatorStack.top === "(") {
        if (DEBUG) print("Adding to stack");
	operatorStack.push(input[i]);
      } else {
	//if (DEBUG) print("adding: " + input[i]);      
        operatorStack.push(input[i]);
      }
      //operatorStack.push(input[i]);
      if (DEBUG) print("Pushing to stack: " + input[i]);//DEBUG
    } else {
      if (DEBUG) print("Not an operator: " + input[i]);//DEBUG
      //Anything coming here is an operand. Put these characters
      //into postfixString
      postfixString += input[i];
      if (DEBUG) print("This is postfixString: " + postfixString);
    }
    if (DEBUG) print("This is what the input character is: " + input[i]);//DEBUG
  }
}


