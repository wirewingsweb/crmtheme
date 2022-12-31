const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()
const Role_List = require('../config/Role_List')
const {verifyJwt} = require('../middleware/verifyJwt')
const {verifyRoles} = require('../middleware/verifyRoles')
// router.use(verifyJwt)
router.post('/user-signUp', verifyJwt, verifyRoles(Role_List.Admin),userController.createNewUser)


module.exports = router;