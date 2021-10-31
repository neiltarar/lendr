const sessionAuth = (req, res, next) => {
    if (!req.session.username) {
        res.status(401).send();
        console.log('not logged in');
    } else {
        console.log('logged in');
        next();
    }
  }
  
module.exports = sessionAuth;