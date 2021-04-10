const express = require('express')

const cookController = require('../controllers/cook.controller')

const router = express.Router()

router.get('/', cookController.fetchAllCooks)

router.post('/register', cookController.registerCook)

router.post('/log-in', cookController.logInCook)

router.post('/log-out', cookController.logOutCook)

router.get('/is-logged-in', cookController.isLoggedIn)

module.exports = router