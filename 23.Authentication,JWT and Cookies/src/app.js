const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const User = require("./model/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
// cookie-parser must be invoked to register the middleware
app.use(cookieParser());
const { userAuth } = require("./middlewares/auth");

//send the data to db
app.post("/signup", async (req, res) => {
  //Validation of data
  try {
   validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password - bcrypt
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("hashed password", passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user signed up successfully");
  } catch (err) {
    res.status(500).send("Please Validate data " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  console.log("Login attempt for:", emailId);

  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      console.log("User not found");
      throw new Error("Invalid Credentials");
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log("Password valid:", isPasswordValid);
    const isPasswordValid = await user.validatePassword(password);  
    
    if (isPasswordValid) {
      //create a jwt token
      // add the token to cookie and send the response to user
      // const token = jwt.sign(
      //   { _id: user._id },  
      //   "devTinderSecretKey",
      //   // { expiresIn: "1h" } // token will expire in 1 hour
      //   { expiresIn: "1d" }
      // ); write in user model as method and call here
      const token = await user.getJWTToken();
      console.log("Generated Token:", token);
      res.cookie("token", token, {
        
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // cookie will expire in 1 day
      });

      return res.send("Login successfully");
    } else {
      console.log("Invalid password");
      
      throw new Error("Invalid Credentials");
    }

  } catch (err) {
    console.log("Login error:", err.message);
    res.status(400).send("Login Failed " + err.message);
  }
});


// added userAuth middleware to protect the route, only authenticated user can access this route
// first userAuth middleware will check the token and validate it, if token is valid then only it will allow to access the route handler function, otherwise it will return unauthorized error
app.get("/profile", userAuth, async (req, res) => {
  try {     

  // const cookies = req.cookies;
  // const { token } = req.cookies;
  // if (!token) {
  //   throw new Error("No token found");
  // }
//validate the token here
// const decodedMessage = jwt.verify(token, "devTinderSecretKey");
// console.log("is token valid", decodedMessage);
// const {_id} = decodedMessage;
// console.log("user id from token", _id);

// find user from db using _id from token
// const user = await User.findById(_id);

const user = req.user; // we have attached the user object to the req object in the userAuth middleware, so we can access it here directly

// if(!user){
//   throw new Error("User not found");
// }
// console.log("user from db", user);

// return the user profile data to frontend
res.send(user);
  } catch (err) {
    return res.status(401).send("Unauthorized: " + err.message);
  }
  
  console.log("cookies", cookies);
  return res.send("Profile is running");

});

//api for send connection request 
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //want api to the hit , when user is logged in -userAuth
  //who is sending the request - read the user data from the req object, which is attached by the userAuth middleware
  const user = req.user;    
  console.log("sending connection request from user:");
  res.send("Connection request sent successfully" +  user.firstName);



  // console.log("send connection request API called");
  // res.send("Connection request sent successfully");
});
// //GET user by email id-findOne method returns single object if same email id is there
// app.get("/user", userAuth, async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.findOne({ emailId: userEmail });
//     if (users.length === 0) {
//       return res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     console.log("Error in fetching user from DB", err);
//     res.status(400).send("something went wrong");
//   }
// });

// //FeedAPI -GET/feed-get all the users data from db
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     console.log("Error in fetching user from DB", err);
//     res.status(400).send("something went wrong");
//   }
// });

// //delete data from db
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const users = await User.findByIdAndDelete(userId);
//     res.send("user deleted successfully");
//   } catch (err) {
//     console.log("Error in deleting user from DB", err);
//     res.status(400).send("something went wrong");
//   }
// });

// //update data from db
// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((update) =>
//       ALLOWED_UPDATES.includes(update)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("update not allowed!");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("skills should not be more than 10");
//     }

//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     console.log("updated user", user);
//     res.send("user data updated successfully");
//   } catch (err) {
//     res.status(400).send("Update Failed: " + err.message);
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Server is up and running");
// });

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
