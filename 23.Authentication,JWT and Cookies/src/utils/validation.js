
const validator = require("validator");
const validateSignupData = (req) => {
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName ) {
        throw new Error("Name is not valid");
    }
    // else if(!firstName.length<4 && firstName.length>30){
    //     throw new Error("First name must be between 4 to 30 characters");
    // }


    else if(!emailId || !validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!password || !validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
};

module.exports = {validateSignupData};