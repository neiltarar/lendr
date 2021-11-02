const sessionAuth = (req, res, next) => {
    if (!req.session.username) {
        res.status(401).send( {message: "You are not logged in"} );
        console.log('not logged in');
    } else {
        res.status(200).send();
        console.log('logged in');
        next();
    }
  }
  
module.exports = sessionAuth;