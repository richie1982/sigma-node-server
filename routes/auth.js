const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../services/validation')


router.get('/inventory', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("User not found")

    res.send(user)
})

router.get('/validate', (req, res) => {

})

router.post('/users', async (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const emailVerify = await User.findOne({ email: req.body.email })
    if (emailVerify) res.status(400).send("Email already exists")

    const salt = await bcrypt.genSalt(10)
    const hashPassword =  await bcrypt.hash(req.body.password, salt)

    const user = new User({
        firstName: req.body.firstName,
        surName: req.body.surName,
        email: req.body.email,
        password: hashPassword,
    })

    const savedUser = await user.save()
    if (!savedUser) return res.status(400).send("An Error Occured")

    const token = await jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header("Authorisation", token).send(savedUser)
})

router.post('/log_in', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Invalid Email/Password")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Invalid Email/Password")

    const token = await jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET)
    res.header("Authorisation", token).send(token)
})

router.post('/products', (req, res) => {

})

router.delete('/delete', (req, res) => {

})

module.exports = router