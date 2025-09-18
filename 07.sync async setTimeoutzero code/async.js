const fs = require("fs");
const https = require("https");
console.log("Hello world");

var a = 1078698;
var b = 20986;

//synchronous function - block the main thread  

fs.readFileSync("./file.txt", "utf-8");
  console.log("This will execute only after file read");


https.get("https://dummyjson.com/products/1", (res) => {
  console.log("fetched data successfully");
});

setTimeout(() => {
  console.log("setTimeout call after 5 sec");
}, 5000);



//async function
fs.readFile("./file.txt", "utf-8", (err,data) => {
  console.log("File Data :", data);
});

function multiplyFn(x, y) {
  const result = a * b;
  return result;
}

var c = multiplyFn(a, b);
console.log("Multiply is:", c);


// o/p =

// Hello world
// Multiply is: 22637556228
// File Data : This is the file data
// fetched data successfully
// setTimeout call after 5 sec
