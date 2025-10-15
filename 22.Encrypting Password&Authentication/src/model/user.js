const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 4, maxlength: 30 },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
       message: "Invalid email format",
      
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Email is invalid: " + value);
          
        }
      }
    },
    password: { type: String, required: true,
       validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("your pasword is not strong: " + value);
        }
      }

     },
    age: { type: Number, min: 18 },

    gender: {
      type: String,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error(" Gender must be valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://skiblue.co.uk/wp-content/uploads/2015/06/dummy-profile.png",
        validate(value){
        if(!validator.isURL(value)){
          throw new Error("invalid photo url: " + value);
        }
      }
    },
    about: { type: String, default: "Hey there! I am using DevTinder" },
    skills: { type: [String] },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
