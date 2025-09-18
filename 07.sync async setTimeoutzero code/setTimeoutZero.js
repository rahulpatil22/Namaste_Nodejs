console.log("Hello world");

var a = 1078698;
var b = 20986;

// this callback will only be pushed to call stack in v8 once the call stack is empty
setTimeout(() => {
    console.log("call me right now ");
},0); // trust issue with setTimeout , it runs after 0 miliseconds when call stack of main thread is empty

setTimeout(() => {
    console.log("setTimeout call after 3 sec");
},3000);   

function multiplyFn(x,y){
    const result = a*b;
    return result;
}
var c = multiplyFn(a,b);
console.log("Multiply is:", c);

// o/p =>
    // hello world
    // multiply is: 22637556228
    // call me right now
    // setTimeout call after 3 sec