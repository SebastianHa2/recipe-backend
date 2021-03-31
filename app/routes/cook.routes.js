const express = require('express')

const cookController = require('../controllers/cook.controller')

const router = express.Router()

router.get('/', cookController.fetchAllCooks)

router.post('/register', cookController.registerCook)

router.post('/log-in', cookController.logInCook)

module.exports = router