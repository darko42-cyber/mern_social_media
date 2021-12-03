const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res)=>{
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    const accessToken = jwt.sign({
        _id: user._id,
        isAdmin: user.isAdmin
    },process.env.JWT_SEC,{
        expiresIn:'1h'
    })
 
    try {
        const newUser = await user.save()
        res.send({...newUser._doc,accessToken})
        
    } catch (error) {
        res.send({msg: error.message})
        
    }
})


router.post('/login', async (req, res)=>{

    try {
        const user = await User.findOne({
            email: req.body.email,
        })
        if(user){
            const comparePassword = await bcrypt.compareSync(req.body.password, user.password)
            !comparePassword && res.status(401).send({msg:"invalid credentials"})

            const accessToken = jwt.sign({
                _id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SEC, {
                expiresIn: '1'
            })
            const {password, updatedAt, ...others} = user._doc
            
            if(comparePassword) return res.status(201).send({...others,accessToken})
        }
        !user && res.status(401).send({msg: 'User not found'})
        
    } catch (error) {
        res.status(500).send(error)
    }
    
})


module.exports = router