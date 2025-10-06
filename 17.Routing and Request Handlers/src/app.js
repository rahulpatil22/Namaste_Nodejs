const express = require("express");
const app = express();

// app.use("/",(req ,res)=>{
//     res.send('Namaste Rahul');
// });       // it will match all the routes starting with "/" ,ovverided by next matching route

// app.use("/hello", (req, res) => {
//   res.send("Hello hello hello");
// });

// app.use("/hello/2", (req, res) => {
//   res.send("Hello2 hello2 hello2");
// });

// app.use("/user", (req, res) => {
//   res.send("Yess");
// });//now it will match all the routes starting with /user

// request handler - This only handles GET request,call to /user
// req/user ,/user/profile ,/user/1
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Rahul", lastName: "Patil" });
// });

// app.post("/user", (req, res) => {
//   //saving data to db
//   res.send("data successfully added to DB");
// });

// app.delete("/user", (req, res) => {
//   res.send("deleted successfully");
// });
// // request handler - matches all the HTTP methods routes starting with /test
// app.use("/test", (req, res) => {
//   res.send("Hello from server");
// });

// app.use("/", (req, res) => {
//   res.send("Namaste Rahul");
// }); // order of routes is important here, it starts matching from top to bottom


// req/user ,/user/profile ,/user/1
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Rahul", lastName: "Patil" });
// });



// you can use regex also in routes
//  ? --> zero or one
//  + --> one or more
//  * --> zero or more
//  () --> group things together
//  | --> either or     

app.get("/user/:userId/:name/:password",  (req, res) => {
    console.log(req.params);// to get query params
  res.send({ firstName: "Rahul", lastName: "Patil" });
});
// start/listen server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
