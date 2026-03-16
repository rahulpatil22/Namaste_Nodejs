const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    //job of this middleware- Read the token from the req cookies


    const { token } = req.cookies;
    if (!token) { //if token is not present in the cookie, then user is not authenticated
      throw new Error("Token not found");
    }
    const decodedobj = await jwt.verify(token, "devTinderSecretKey");// never used hardcoded token in production, use env variable
    const {_id} = decodedobj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");

    }
    //attach the user object to the req object, so that we can access the user object in the route handler function
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send("Unauthorized: " + err.message);
  }
  // validate the token
  //Find the user



};

module.exports = { userAuth };
