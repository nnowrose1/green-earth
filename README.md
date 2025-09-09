#### 1) What is the difference between var, let, and const?
When we declare variables using var, it can be re-declared and re-assigned. When we declare variables using let, it can be re-assigned but it can not be re-declared. When we use const to declare variables, it can neither be re-assigned nor be re-declared.
Another difference is, var only maintains function scope, but it does not maintain global/block scope. Let and const both maintain all the scopes.
var variables are hoisted and initialized with undefined. let, const variables are also hoisted without initialization, so if we attempt to access them before declaration, it causes a reference error.

#### 2) What is the difference between map(), forEach(), and filter()? 
map(), forEach(), filter()-all of them are array methods. map() method access all the elements of an array, executes a particular function on each element and then return the result in a new array.

forEach() works kind of similarly like map() method, takes all the elements of an array, executes a particular function on each element. The difference is, forEach() method returns nothing.

filter() also access all the elements of an array and then filters the elements based on a particular condition or multiple conditions. It returns a new array containing the filtered elements that match the condition. It will return an empty array if no element matches the condition.

#### 3) What are arrow functions in ES6?
Arrow functions are a precise method of function declaration, that has been introduced in ES6. We can omit function keyword and even return keyword while declaring a single line arrow function. However, return keyword is needed for multi line arrow functions.
Example of arrow function:
const sum = (a,b) => a+b; //single line arrow function
<br>
const oper = (a,b) => {
        <br>
        const sum = a+b;
        <br>
        const subtract = a-b;
        <br>
        return sum * subtract;
        <br>
} //multi-line arrow function
<br>
one key difference of arrow functions compared to normal functions is arrow functions do not have their own "this".

#### 4) How does destructuring assignment work in ES6?
If we want to assign array elements /object properties to certain variables, destructuring method makes it very handy. For example,
<br>
const numbers = [5, 10, 15];
<br>
const [first, second] = numbers;//array destructuring
<br>
console.log(first);  //o/p 5
<br>
console.log(second);  //o/p 10
<br>

const person = {name: "Rahim", age: 30, address: "Pabna"};
<br>
const {name, address} = person;
<br>
console.log(name); //o/p Rahim
<br>
console.log(address); //o/p Pabna
<br>
In general, variables name and key names should be same. But if we want to change the variable name, that can also be done.
<br>
const {age:hisAge} = person;
<br>
console.log(hisAge); //o/p 30
<br>

#### 5) Explain template literals in ES6. How are they different from string concatenation?
Generally, we define strings using single or double quotation. When we define strings using backticks, they are called template literals. They are a modern method of defining strings and they offer enhanced functionalities in comparison to string concatenation.
We normally use comma or plus sign or .concat() method for string concatenation. For example,
<br>
const name = "Rahim";
<br>
const age = 30;
<br>
console.log("Hello" + name + "! Are you" + age + "years old?");
<br>
//o/p Hello Rahim! Are you 30 years old? 
<br>
When we concatenate strings like this, it becomes very clumsy while reading it. If we use template literals, 
console.log(`Hello ${name}! Are you ${age} years old?`);
//o/p Hello Rahim! Are you 30 years old? 
Template literals make it very precise and readable. Moreover, template literals support multi-line string without any new line expressions. Variables and any valid JS or mathematical expressions can be written inside ${}, thus make it easy creating dynamic strings.