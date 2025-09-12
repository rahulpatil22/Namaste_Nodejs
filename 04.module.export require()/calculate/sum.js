console.log("This is sum.js file");
 


 function calculateSum(a, b) {
  const sum = a + b;
  console.log("Sum is:", sum);
}   

// module.exports = calculateSum;
// module.exports ={
//     x:x,
//     calculateSum:calculateSum,
// // }
// module.exports = {x,calculateSum}; //commonjs module export
// export {x,calculateSum}; //ES6 module export


module.exports.calculateSum = calculateSum;
console.log("Module exports is:", module.exports);