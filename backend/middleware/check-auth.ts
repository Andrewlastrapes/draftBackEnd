const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    console.log(req)
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token)
    }
    catch {
        res.status(401).json({
            message: "Not authorized"
        })
    }
  

    next()
}