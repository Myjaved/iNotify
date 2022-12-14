const { Router } = require('express')
const express = require('express')
const User = require('../mgsmodels/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')
var getuser = require('../middleware/getuser')

const JWTokenSecret = "chidiyachuggayi@khet"

// Route-1 :create user using :POST "/api/auth/createuser" , No login required
router.post('/createuser', [
    //validation is here
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success=false
    // if there are error then returns bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    // check whether user exists already OR not
    try {
        const salt = await bcrypt.genSalt(10)
        const secpassword = await bcrypt.hash(req.body.password, salt)
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpassword,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWTokenSecret)
        success=true
        res.json({success, authToken })


    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})






//Route-2: create user using :POST "/api/auth/login, No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success=false
            return res.status(400).json({ error: "Please try to Login with correct credentials" })
        }

        const passwordcompare = await bcrypt.compare(password, user.password)
        if (!passwordcompare) {
            success=false
            return res.status(400).json({success, error: "Please try to Login with correct credentials" })
        }


        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWTokenSecret)
        success=true
        res.json({success, authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ")
    }
})


//Route-3: Get Logged in User details using :POST "/api/auth/getuser, login required

router.post('/getuser', getuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ")
    }
})

module.exports = router