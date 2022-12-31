const express = require('express')
const loginController = require('../controller/loginController')
const router = express.Router()

router.post('/user-login', loginController.login)


module.exports = router;