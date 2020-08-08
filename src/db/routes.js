const express = require('express')
const userController = require('./controller/userController')

const router = express.Router();

router.use('/User', userController)

module.exports = router;