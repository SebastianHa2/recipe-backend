const express = require('express')
const { body } = require('express-validator/check')

const Cook = require('../models/cook.model')
const cookController = require('../controllers/cook.controller')
const isAuth = require('../util/is-auth')

const router = express.Router()

router.get('/', cookController.fetchAllCooks)

router.post('/register', [body('username').isLength({ min: 4, max: 12}).custom(value => {
    Cook.findAll({username: value}).then(user => {
        if(user){
            throw new Error('User with this username already exists!')
        }
        return true
    })
}), body('password').isLength({min: 6, max: 20}).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/), body('confirmPassword').custom((value, { req }) => {
    if( value !== req.body.password){
        throw new Error('Passwords must match!')
    }
    return true
})], cookController.registerCook)

router.post('/log-in', cookController.logInCook)

router.post('/log-out', cookController.logOutCook)

router.get('/is-logged-in', isAuth)

module.exports = router