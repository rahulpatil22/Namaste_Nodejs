const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImmediate"));
setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf8", () => {
  setTimeout(() => console.log("2nd Timer "), 0);
  process.nextTick(() => console.log("2nd nextTick"));
  setImmediate(() => console.log("2nd setImmediate"));
  console.log("File Reading CB");
});

process.nextTick(() => console.log("process.nextTick"));

function printA() {
  console.log("a", a);
}

printA();
console.log("last line of the file");

// O/P
// a =100
// last line of the file
// process.nextTick
// Promise
// Timer expired
// setImmediate
// File Reading CB
// 2nd nextTick
// 2nd setImmediate
// 2nd Timer 
