const express = require('express')
const { request, response } = require('express')
const  User = require('../schemas/User')

const userRouter = express.Router()

async function isAuth (request, response, url) {
    const token = request.header('Token');
    const user = await User.findOne({ token });
    if (!user) {
		response.status(401).json({ message: 'Unauthorized Acess, you need a token'});
		return false;
	}
};

userRouter.get('/', async (request, response) => {
    await isAuth(request, response, 'GET /User')

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

    
})

module.exports = userRouter;