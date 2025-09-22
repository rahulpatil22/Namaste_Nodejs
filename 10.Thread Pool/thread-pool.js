const fs = require("fs");

const crypto = require ("node:crypto");


process.env.UV_THREADPOOL_SIZE = 2;

crypto.pbkdf2("password", "salt", 500000, 50, "sha512" ,(err ,key)=>{
console.log("1-crypto key is generated");

});   


// fs.readFile("./file.txt","utf8",()=>{   

//     console.log("File Reading CB")
// });

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err,key)=>{
    console.log("2-crypto key is generated");
})   

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err,key)=>{
    console.log("3-crypto key is generated");
})   
crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err,key)=>{
    console.log("4-crypto key is generated");
})   
crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err,key)=>{
    console.log("5-crypto key is generated");
})

// o/p
// 1-crypto key is generated
// 2-crypto key is generated
// 4-crypto key is generated
// 3-crypto key is generated
// 5-crypto key is generated

// 4 crypto comes at a time but 5th take a time , initialy also thread take a time give output at a time and order also chnaged everytime
   