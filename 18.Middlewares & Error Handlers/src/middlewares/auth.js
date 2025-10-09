 const adminAuth = (req, res, next) => {
  console.log("inside admin middleware");
  //if authorized then only fetch all the data and send it back to user
  const token = "admin@123";
  const isAdminAutorized = token === "admin@123";
  if (!isAdminAutorized) {
    return res.status(401).send({ message: "User not authorized" });
  } else {
    next();
  }
}


 const userAuth = (req, res, next) => {
  console.log("inside admin middleware");
  //if authorized then only fetch all the data and send it back to user
  const token = "admin@123";
  const isAdminAutorized = token === "admin@123";
  if (!isAdminAutorized) {
    return res.status(401).send({ message: "User not authorized" });
  } else {
    next();
  }
}

module.exports = { adminAuth ,userAuth};