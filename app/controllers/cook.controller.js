const Cook = require('../models/cook.model')
const bcrypt = require('bcryptjs')

exports.registerCook = async (req, res) => {
    // We are receiving the information in the request body
    try{
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
                    req.session.loggedIn = true
                    req.session.user = user
                    req.session.save((err) => {
                        console.log(err)
                        res.status(200).send({
                            isLoggedIn: req.session.loggedIn,
                            isLoggedInAs: req.session.user
                        })
                    })
                }else{
                    res.send({
                        message: "Incorrect username or password"
                    })
                }
            }
        }).catch(err => {
        console.log(err)
        res.send({
            message: "Something went wrong during logging in..."
        })
    })
}

exports.logOutCook = (req, res) => {
    req.session.destroy(() => {
        res.status(200).send({
            message: "Logged out successfully"
        })
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
