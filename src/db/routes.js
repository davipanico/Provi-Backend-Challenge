const express = require('express')
const userController = require('./controller/userController')
const signupController = require('./controller/signupController')

const router = express.Router();

router.use('/user', userController)
router.use('/signup', signupController)

module.exports = router;