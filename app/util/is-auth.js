const e = require('express')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('json-web-token')
    let decodedToken
    try {
        decodedToken = jwt.verify(token, 'long secret of misery')
        res.json({
            user: decodedToken.userData
        })

    } catch {
        res.status(500).json({
            message: 'User is not authenticated'
        })
    }
}