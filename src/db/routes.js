const express = require('express')
const userController = require('./controller/userController')
const signupController = require('./controller/signupController')

const router = express.Router();

router.use('/User', userController)
router.use('/Signup', signupController)

module.exports = router;