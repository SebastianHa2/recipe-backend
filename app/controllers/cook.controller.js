const Cook = require('../models/cook.model')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.registerCook = async (req, res) => {
    // We are receiving the information in the request body
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(422).json({message: 'Validation failed', errors: errors.array()})
        }

        const hash = await bcrypt.hash(req.body.password, 10)
    
        Cook.create({
            username: req.body.username,
            password: hash
        }).then(data => {
            res.send({
                message: "Cook account created successfully"
            })
        })
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Something went wrong during registration..."
        })
    }

}

exports.logInCook = async (req, res) => {
    // We are receiving the username and password in the request body
        Cook.findAll({
            where: {
                username: req.body.username
            }
        }).then(async user => {
            if(user){
                const passwordCheck = await bcrypt.compare(req.body.password, user[0].password)
                if(passwordCheck){
                    const token = jwt.sign({
                        userData: user,
                        loggedIn: true
                    }, 'long secret of misery',
                    {expiresIn: '1h'})

                    res.cookie('jwt', token)
                    res.status(200).json({
                        token: token,
                        user: user
                    })
                }else{
                    res.status(401).json({
                        message: "Incorrect username or password"
                    })
                }
            }else{
                res.status(401).json({
                    message: "Incorrect username or password"
                })
            }
        }).catch(err => {
        console.log(err)
        res.send({
            message: "Something went wrong during logging in..."
        })
    })
}

exports.logOutCook = (req, res) => {
    res.status(200).json({
        message: 'Successfully logged out'
    })
}

exports.fetchAllCooks = (req, res) => {
    Cook.findAll().then(data => {
        res.send(data)
    }).catch(err => {
        res.send({
            message: err.message || "Something went wrong while fetching users..."
        })
    })
}


exports.isLoggedIn = (req, res, next) => {
    if(req.session.user) {
        res.send({
            isLoggedIn: req.session.loggedIn,
            isLoggedInAs: req.session.user,
            csrf: req.csrfToken()
        })
    }
    else{
        res.send({
            message: 'Not logged in'
        })
    }
        
}