const sessionAuth = (req, res, next) => {
  if (req.session.username && req.session.userId) {
    // res.status(200).send();
    console.log("logged in");
    next();
  } else {
    res.status(401).send({ message: "You are not logged in" });
    console.log("not logged in");
  }
};

module.exports = sessionAuth;
