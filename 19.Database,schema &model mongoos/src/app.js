const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();

const User = require("./model/user");

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  //login logic
  //   const userObj ={
  //     firstName:"Rahul",
  //     lastName:"Patil",
  //     email:"rahulpatil@gmail.com",
  //     password:"rahul@123",

  //creating a new instance of user model
  const user = new User({
    //object of user model ,or put data of userObj in constructor
    firstName: "Sachin",
    lastName: "Tendulkar",
    emailId: "sachint@gmail.com",
    password: "sachin@123",
  });
  try {
    await user.save(); //returns a promise save data in db
    res.send("user signed up successfully");
  } catch (err) {
    console.log("Error in saving user to DB", err);
    res.status(500).send("Internal Server Error");
  }
});

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
