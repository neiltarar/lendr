const sessionAuth = (req, res, next) => {
    if (!req.session.username) {
        res.status(401).send();
    } else {
        res.json({ message: 'You need to be logged in' })
        next();
    }
  }
  
module.exports = sessionAuth;