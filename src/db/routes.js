const express = require('express')
const userController = require('./controller/userController')
const signupController = require('./controller/signupController')

const router = express.Router();

router.use('/index', userController)
router.use('/signup', signupController)

module.exports = router;