const express = require("express");
const app = express();

// app.use(
//   "/user",[
// (req  , res,next) => {
//     //Route handler
//     console.log("inside user route");
//     res.send("Resposnse 1!!!");
//     next();
//   },
//   (req, res ,next) => {
//     //route handler 2
//     console.log("inside next function");
//     res.send("Response 2!!!");
//      next();
//   },
//   (req, res,next) => {
//     //route handler 2
//     console.log("inside next function");
//     res.send("Response 3!!!");
//      next();
//   },
//   (req, res,next) => {
//     //route handler 2
//     console.log("inside next function");
//     res.send("Response 4!!!");
//   },
// ]
// );

// app.get("/user", (req, res ,next) => {
// console.log("Handling the route user");
//     next();
// });

// app.get("/user", (req, res ,next) => {
//     console.log("Handling the route user");
//   res.send("2nd Route Handler");
// }   );

//it checks for all the app.xxx("matching route") functions ,and it will try to execute one by one,till it
//gives response back to the server
//if we want to pass the control to next matching route we have to use next() function
//if we dont use next() function it will not go to next matching route
//it will be stuck in the current route only
// app.use("/", (req, res,next) => {
//     // res.send("Handling Route");
//  next();
// });

// app.get("/user",

//     //this below functions are called middleware functions
//     (req, res ,next) => {
// console.log("Handling the route user");
//     next();
// },
//   (req, res ,next) => {
// // console.log("Handling the route user");
//     next();
// },

//   (req, res ,next) => {
// // console.log("Handling the route user");
//    res.send("2nd Route Handler");
// }

// );

// why we actually needs middlewares
//1. to execute some code
//2. to make changes to req/res objects
//3. to end the req/res cycle
//4. to call the next middleware in the stack

//example of middleware handle auth middleware for all (get ,post ,delete)admin routes

// const { adminAuth ,userAuth} = require("./middlewares/auth");
// app.use("/admin", adminAuth);
// app.use("/user", userAuth);


// app.post("/user/login", (req, res) => {
//   res.send("user logged in successfully");
// });

// app.get("/user/data",userAuth, (req, res) => {
//   res.send("user data send");
// });

// app.get("/admin/getAllData", (req, res) => {
//   //logic of fetching all data
//   //logic of check  if the request is authorized or not
//   //if not authorized send a response back to user
//   // res.status(401).send({message:"User not authorized"});
//   res.send("All Data");
// });
// // so can you write a authrized logic for all admin routes ,No
// // then middlewares comes to rescue
// //create a middleware for authorization

// app.get("/admin/deleteUser", (req, res) => {
//   //logic of fetching all data
//   res.send("delete User");
// });

//Error handling 
app.get("/getuserData", (req, res) => {
    //logic of DB call and get user data
   throw new Error("DB connection failed");         
        res.send("user data send")    
});
// express has inbuilt error handling middlewares
// but if you want to create your own error handling middleware you can do that also
//error handling middlewares have 4 parameters (err,req,res,next)
app.use("/",(err,req,res,next)=>{

    if(err){
        console.log("Error is ",err);
        res.status(500).send({message:"Some thing went wrong"});
    }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
