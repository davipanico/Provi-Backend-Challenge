const express = require('express')
const { request, response } = require('express')
const  User = require('../schemas/User')
const isAuth = require('../auth')

const userRouter = express.Router()

userRouter.get('/', async (request, response) => {
    await isAuth(request, response, 'GET /user');

    const limit = parseInt(request.query.limit);
	const page = parseInt(request.query.page);

    const skip = (page - 1) * limit;
    
    const users = await User.find().limit(limit).skip(skip);
    const numberOfUsers = await User.countDocuments();

    const result = {
        data: users,
    };

    const hasNextPage = Math.ceil(numberOfUsers / limit) > page;
	if (hasNextPage) {
		result.nextPage = `http://localhost:3000/User?limit=${limit}&page=${page + 1}`;
    };
        
    response.status(200).json(result);
});

userRouter.put('/fullname/:id', async (request, response) => {
    await isAuth(request, response, 'GET /user');

    const id = request.params.id;
    const fullName = request.body.infos.fullName
    const name = fullName.split(' ');
    const firstName = name[0];
    const lastName = fullName.substring(name[0].length).trim();

    if( fullName && firstName && lastName.length > 0 ) {
        let documentUpdated = await User.updateOne({_id:id}, {'infos.fullName': fullName, 'infos.firstName': firstName, 'infos.lastName': lastName});

        if(documentUpdated.nModified > 0) {
            response.status(200).json({message: "Sucess, Next end-point user/cpf"})
        }else {
            response.status(500).json({message: "Failed"})
        }
    }
    else {
        response.status(400).json({message: "Missing body"})
    }
});

userRouter.put('/cpf/:id', async (request, response) => {
    await isAuth(request, response, 'GET /user');

    const id = request.params.id
    const userBody = request.body

    if( userBody && Object.keys(userBody).length > 0 ) {
        let documentUpdated = await User.updateOne({_id:id}, {'infos.cpf': userBody.infos.cpf} );

        if(documentUpdated.nModified > 0) {
            response.status(200).json({message: "Sucess, next end-point user/birthday"})
        }else {
            response.status(500).json({message: "Failed"})
        }
    }
    else {
        response.status(400).json({message: "Missing body"})
    }
});

userRouter.put('')

module.exports = userRouter;