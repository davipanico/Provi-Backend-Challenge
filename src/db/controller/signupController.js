const express = require('express')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const { request, response } = require('express')
const User  = require('../schemas/User')


const signupRouter = express.Router()

signupRouter.get('/', (request, response) => {
    response.status(405).json({message: 'Method not allowed'})
})

signupRouter.put('/', (request, response) => {
    response.status(405).json({message: 'Method not allowed'})
})

signupRouter.delete('/', (request, response) => {
    response.status(405).json({message: 'Method not allowed'})
})

signupRouter.post('/', async (request, response) => {
    const email = (request.body || {}).email;
    
    if(!email) {
        response.status(406).json({message: 'Send a body with an \'email\' attribute'})
        return;
    };

    const password = (request.body || {}).password;
    if(!password) {
        response.status(406).json({message: 'Send a body with an \'password\' attribute'})
        return;
    };


    const user = await User.findOne({email: email})
    if(user) {
        response.status(200).json({message: 'User already exists', token: user.token})
        return;
    }

    const hashPassword = bcrypt.hashSync(password, 5)
    const token = uuid.v4();
    const newUser = new User({
        email: email,
        password: hashPassword,
        token: token
    });

    newUser.save()
        .then(() => {
            response.status(201).json({message: 'Your token', token:token })
        })
        .catch((err) => {
            response.status(400).json({message: err.message})
        })

});

module.exports = signupRouter;