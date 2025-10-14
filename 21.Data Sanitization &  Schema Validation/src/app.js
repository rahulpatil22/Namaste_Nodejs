const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();

const User = require("./model/user");

app.use(cors());
app.use(express.json());

//send the data to db
app.post("/signup", async (req, res) => {
  console.log(req.body);

  const user = new User(req.body);

  try {
    await user.save();
    res.send("user signed up successfully");
  } catch (err) {
    console.log("Error in saving user to DB", err);
    res.status(500).send("Internal Server Error");
  }
});

//GET data by email id - find method returns an array
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//   const users =  await User.find({ emailId: userEmail });
//   if (users.length === 0) {
//     return res.status(404).send("User not found");
//   }else{
//   res.send(users);
//     }
//   } catch (err) {
//     console.log("Error in fetching user from DB", err);
//     res.status(400).send("something went wrong");
//   }
// });

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
