const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    //TODO: change to Authorization header... follow the Industry Standards
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.indexOf("Bearer") >= 0) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) res.status(401).json("Unauthorized");
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("Unauthorized")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }else{
            res.status(403).json("Forbidden!");
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        }else{
            res.status(403).json("Forbidden!");
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };