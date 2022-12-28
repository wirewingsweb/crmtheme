const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()

router.post('/user-signUp', userController.createNewUser)


module.exports = router;