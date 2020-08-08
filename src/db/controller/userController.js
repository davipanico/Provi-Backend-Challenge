const express = require('express')
const { request, response } = require('express')
const { User } = require('../schemas/User')

const userRouter = express.Router()

userRouter.get('/', (request, response) => {
    response.json({message:'testando api'})
})

module.exports = userRouter;