//Phil Hofer
//1/28/2015
//postfix.js
//This program does this.

//declare stack that will be used to store operators
var operatorStack = new Stack();

//this string will store the end result of converting an
//infix expression to postfix
var postfixString = "";

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
	    
	    break;
    case "-":
            
            break;
    case "*":
	    //if the incoming symbol has higher precedence than the top of
	    //the stack, push it on the stack.
            if (operatorStack.top==="+" || operatorStack.top==="-") {
              if (DEBUG) print("Adding '*' to stack");
	      operatorStack.push(z);
	    }
	    break;
    case "/":
            //if the incoming symbol has higher precedence than the top of 
	    //the stack, push it on the stack.
	    if (operatorStack.top==="+" || operatorStack.top==="-") {
              if (DEBUG) print("Adding '/' to stack");
	      operatorStack.push(z);
	    }
	    break;
    case "(":
            //if incoming symbol is a "(", push it
            if (DEBUG) print("Adding '(' to stack");
            operatorStack.push(z);
            break;
    case ")":
	    //if incoming symbol is a ")", pop the stack and print
	    //operators until you see a left parenthesis, then discard
	    //the pair of parentheses
	    var temp = operatorStack.pop();
            postfixString += temp;
	    while (!(temp=="(")) {
              temp = operatorStack.pop();
	      postfixString += temp;
	    }
	    break;
    default:
            print("You've entered in an invalid operator.");	    
  }
}

//main function that converts an infix notation function to postfix
function postfixCalc (input) {
  if (DEBUG) print("length of input: " + input.length);//DEBUG

  for (var i = 0; i < input.length; i++) {
    //if current character is an operator
    if (isOperator(input[i])) { 
      //if stack is empty or contains a "(" on top
      if ((operatorStack.length == 0) || operatorStack.top === "(") {
        if (DEBUG) print("Adding operator to stack");
	operatorStack.push(input[i]);
      } else {
	//deal with all operators      
	whichOperator(input[i]);      
      }
      if (DEBUG) print("Pushing to stack: " + input[i]);//DEBUG
    } else {
      if (DEBUG) print("Not an operator: " + input[i]);//DEBUG
      //Anything coming here is an operand. Put these characters
      //into postfixString immediately
      postfixString += input[i];
      if (DEBUG) print("This is postfixString: " + postfixString);
    }
    if (DEBUG) print("This is what the input character is: " + input[i]);//DEBUG
  }
}


