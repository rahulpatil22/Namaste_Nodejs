// require("./xyx.js"); // one module import another module
require("./xyx");
// const calculateSum = require("./sum.js"); 
// const obj = require("./sum.js");  //commonjs module import
// const { calculateSum ,x} = require("./calculate/sum.js");// destructuring obj
// import { calculateSum ,x} from "./sum.js"; //ES6 module import
// import "./xyx.js"; //ES6 module import
// const {calculateMultiply } = require("./calculate/multiply.js");

const {calculateSum, calculateMultiply, x} = require("./calculate"); //import from index.js file inside calculate folder
const utils = require("node:utils");
// console.log("Utils is:", utils);

const data = require("./data.json");
console.log(JSON.stringify(data));

// let x = 100;
// console.log("Hello from app.js file", x);
var name = "Namaste Nodejs";
console.log(name);


var a = 10;
var b = 20;
// calculateSum(a, b);
// obj.calculateSum(a, b);
calculateSum(a, b);
calculateMultiply(a, b);
// console.log(obj.x);

//output:
// Hello from xyz.js file
// This is sum.js file
// Namaste Nodejs
// Sum is: 30
     

