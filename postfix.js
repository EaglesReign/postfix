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
var DEBUG = false;

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

//This function determines which operator is being used and reacts accordingly.

//If the incoming symbol has higher precedence than the top of the stack, push it 
//on the stack.

//If the incoming symbol has equal precedence with the top of the stack,
//use association. If the association is left to right, pop and print the 
//top of the stack and then push the incoming operator. If the association is
//right to left, push the incoming operator.

//If the incoming symbol has lower precedence that the stmbol on the top of the
//stack, pop the stack and print the top operator. Then test the incoming
//operator against the new top of the stack.
function whichOperator(z) {
  switch (z) {
    case "+":
            //equal precedence
	    var temp;
	    if (operatorStack.peek()==="+" || operatorStack.peek()==="-") {
              temp = operatorStack.pop();
              postfixString += temp;
	      operatorStack.push(z);
	    } else {

	    //lower precedence
	    if (operatorStack.peek()==="*" || operatorStack.peek()==="/") {
              temp = operatorStack.pop();
	      postfixString += temp;
	      whichOperator(z);
	    }
	    }
	    break;
    case "-":
	    //equal precedence
	    var temp;
	    if (operatorStack.peek()==="+" || operatorStack.peek()==="-") {
              temp = operatorStack.pop();
	      postfixString += temp;
	      operatorStack.push(z);
	    } else {

	    //lower precedence
	    if (operatorStack.peek()==="*" || operatorStack.peek()==="/") {
              temp = operatorStack.pop();
	      postfixString += temp;
	      whichOperator(z);
	    }
	    }
            break;
    case "*":
	    var temp;
	    //higher precedence
            if (operatorStack.peek()==="+" || operatorStack.peek()==="-") {
	      operatorStack.push(z);
	    } else {

	    //equal precedence
	    if (operatorStack.peek()==="*" || operatorStack.peek()==="/") {
              temp = operatorStack.pop();
	      postfixString += temp;
	      operatorStack.push(z);
	    }
	    }
	    break;
    case "/":
	    var temp;
	    //higher precedence
	    if (operatorStack.peek()==="+" || operatorStack.peek()==="-") {
	      operatorStack.push(z);
	    } else {

	    //equal precedence
	    if (operatorStack.peek()==="*" || operatorStack.peek()==="/") {
              temp = operatorStack.pop();
	      postfixString += temp;
	      operatorStack.push(z);
	    }
	    }
	    break;
    case "(":
            //if incoming symbol is a "(", push it
            operatorStack.push(z);
            break;
    case ")":
	    //if incoming symbol is a ")", pop the stack and print
	    //operators until you see a left parenthesis, then discard
	    //the pair of parentheses
	    var temp;
	    do {
	      temp = operatorStack.pop();
              //ensures that "(" is not added to postfixString.
	      if (!(temp==="(")) {
	        postfixString += temp;
	      }
	    }
	    //while temp is not equal to '(', continue popping the stack and 
	    //compare again
	    while (!(temp==="("));
	    break;
	    }
}

//main function that converts an infix notation function to postfix
function postfixCalc (input) {

  for (var i = 0; i < input.length; i++) {
    //if current character is an operator
    if (isOperator(input[i])) { 
      //if stack is empty or contains a "(" on top
      //I believe that this next line is what is causing the bug where 
      //operators are not being pushed onto the stack.
      if ((operatorStack.length == 0) || operatorStack.peek() === "(") {
	operatorStack.push(input[i]);
      } else {
	//deal with all operators      
	whichOperator(input[i]);      
      }
    } else {
      //Anything coming here is an operand. Put these characters
      //into postfixString immediately
      postfixString += input[i];
    }
   
  }
  //end of user's input expression
  //pop and print all operators on the stack.
  //there should be no parentheses at this point.
  var temp1;
  for (var i = 0; i < operatorStack.length; i++) {
    temp1 = operatorStack.pop();
    postfixString += temp1;
  }
  //print the original input
  print("User's Input (Infix Notation): " + input);
  //print postfix notation
  print("Postfix Notation of Input: " + postfixString);
}


