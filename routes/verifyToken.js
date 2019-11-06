const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {

    const token = req.header('Authorisation')
    if (!token) res.status(401).send('Access denied')

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err) {
        res.status(404).send("Invalid Token")
    }
}

module.exports.verify = verify