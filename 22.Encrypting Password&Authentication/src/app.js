const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();

const User = require("./model/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

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

  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
       res.send("Login successfully");
    }else{
       throw new Error("Invalid Credentials");
    }
   
  } catch (err) {
    
    res.status(400).send("Login Failed " + err.message);
  }
});

//GET user by email id-findOne method returns single object if same email id is there
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (users.length === 0) {
      return res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    console.log("Error in fetching user from DB", err);
    res.status(400).send("something went wrong");
  }
});

//FeedAPI -GET/feed-get all the users data from db
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.log("Error in fetching user from DB", err);
    res.status(400).send("something went wrong");
  }
});

//delete data from db
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const users = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    console.log("Error in deleting user from DB", err);
    res.status(400).send("something went wrong");
  }
});

//update data from db
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((update) =>
      ALLOWED_UPDATES.includes(update)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed!");
    }

    if (data?.skills.length > 10) {
      throw new Error("skills should not be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log("updated user", user);
    res.send("user data updated successfully");
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
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
