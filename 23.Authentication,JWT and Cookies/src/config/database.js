const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastenode:rahul4972@namastenode.2idigoi.mongodb.net/devTinder?retryWrites=true&w=majority"
  );
};



module.exports = connectDB;
