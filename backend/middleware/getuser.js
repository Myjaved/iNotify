var jwt = require('jsonwebtoken')
const JWTokenSecret = "chidiyachuggayi@khet"

const getuser = (req, res, next) => {

    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "please authnticate using a valid token" })
    }

    try {
        const data = jwt.verify(token, JWTokenSecret)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({ error: "please authnticate using a valid token" })

    }


}


module.exports = getuser
