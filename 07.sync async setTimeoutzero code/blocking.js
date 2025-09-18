const crypto = require ("node:crypto");
console.log("Hello World");

var a = 10;
var b = 20;

// password based key derivation function

// Synchronous function - Will block the main thread - don't use it

console.log("====")

crypto.pbkdf2Sync("password", "salt", 500000, 50, "sha512");   //synchronous function   
    console.log("First key is generated");

    setTimeout(() => {
    console.log("call me right now ");
},0); // trust issue with setTimeout , it runs after 0 miliseconds when call stack of main thread is empty


// async function
crypto.pbkdf2("password", "salt", 500000, 50, "sha512",(err,key)  => {   
    console.log("Second key is generated"); 


});

function multiplyFn(x,y){
    const result = a*b;
    return result
}
var c = multiplyFn(a,b);

console.log("Multiply is:", c);

// o/p =
// Hello World
// First key is generated
// Multiply is: 200
// Second key is generated

