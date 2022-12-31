const express = require("express");
const router = express.Router();
const {verifyJwt} = require('../middleware/verifyJwt')
const customerController = require("../controller/customerController");
const Role_List = require('../config/Role_List')
const {verifyRoles} = require('../middleware/verifyRoles')
router.use(verifyJwt)
router.post("/admin", verifyRoles(Role_List.Admin),customerController.createNewCustomer);

module.exports= router