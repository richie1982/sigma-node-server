const router = require('express').Router()
const { User, Product } = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { registerValidation, loginValidation } = require('../services/validation')


router.get('/inventory', async (req, res) => {
    const id = jwt.decode(req.headers.authorisation)
    const user = await User.findById(id)
    if (!user) return res.status(400).json({error: "User not found"})

    const products = await Product.find({user: user._id})
    if (!products) return res.status(400).json({error: "No products"})
    res.send(products)
})

router.get('/users', async (req, res) => {
    const users = await User.find()
    if (!users) return res.status(400).json({error: "No users found"})
    res.send(users)
})

router.get('/validate', async (req, res) => {
    const id = jwt.decode(req.headers.authorisation)
    const user = await User.findById(id)
    if (!user) return res.status(401).json({error: "Invalid Token"})

    const token = await jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET)
    res.header("authorisation", token).json({
        token: token, 
        firstName: user.firstName, 
        email: user.email})
})

router.post('/users', async (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({error: error.details[0].message})

    const emailVerify = await User.findOne({ email: req.body.email })
    if (emailVerify) return res.status(400).json({error: "Email already exists"})

    const salt = await bcrypt.genSalt(10)
    const hashPassword =  await bcrypt.hash(req.body.password, salt)

    const user = new User({
        firstName: req.body.firstName,
        surName: req.body.surName,
        email: req.body.email,
        password: hashPassword,
        _id: new mongoose.Types.ObjectId(),
    })

    const savedUser = await user.save()
    if (!savedUser) return res.status(400).json({error: "An Error Occured"})

    const token = await jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header("authorisation", token).json({
        token: token,
        firstName: savedUser.firstName, 
        email: savedUser.email, 
        id: savedUser._id
    })
})

router.post('/log_in', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send({error: error.details[0].message})

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({error:"Invalid Email/Password"})

    const validPassword = await bcrypt.compare(req.body.password, user.password).catch(e => console.log(e))
    if (!validPassword) return res.status(400).json({error:"Invalid Email/Password"})

    const token = await jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET)
    res.header("authorisation", token).json({
        token: token, 
        firstName: user.firstName, 
        email: user.email})
})

router.post('/products', async (req, res) => {
    const id = await jwt.decode(req.headers.authorisation)
    if (!id) return res.status(400).send({error: "Id invalid"})
    // console.log(id)
    const user = await User.findById(id)
    if (!user) return res.status(400).json({error: "User not found"})

    const product = new Product({
        ticker: req.body.ticker,
        name: req.body.name,
        user: user._id
    })

    const savedProduct = await product.save()
        .catch(error => res.status(400).send({error: error}))
    
    res.send(savedProduct)
    
})

router.get('/products', async (req, res) => {
    const products = await Product.find()
    if (!products) return res.status(400).json({error: "No products"})
    res.send(products)
})

router.delete('/delete', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.body._id)
    if (!product) return res.status(400).json({error: "Product not found"})
    res.send(product)
})

module.exports = router