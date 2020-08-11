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
    const fullName = request.body.fullName
    const name = fullName.split(' ');
    const firstName = name[0];
    const lastName = fullName.substring(name[0].length).trim();

    const validator = await User.findOne({'infos.fullName': fullName})

    if(validator) {
        response.status(409).json({message: 'Data already registered'})
        return false;
    }

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

    const id = request.params.id;
    const cpf = request.body.cpf;

    const validator = await User.findOne({'infos.cpf': cpf})

    if(validator) {
        response.status(409).json({message: 'Data already registered'})
        return false;
    }

    if( cpf.length == 11) {
        let documentUpdated = await User.updateOne({_id:id}, {'infos.cpf': cpf} );

        if(documentUpdated.nModified > 0) {
            response.status(200).json({message: "Sucess, next end-point user/birthday"});
        }else {
            response.status(500).json({message: "Failed"});
        }
    }
    else {
        response.status(400).json({message: "CPF must contain 11 numbers"});
    }
});

userRouter.put('/birthday/:id', async (request, response) =>{
    await isAuth(request, response, 'GET /user');

    const id = request.params.id;
    const day = request.body.day;
    const month = request.body.month;
    const year = request.body.year;
    const birthday = day + '/' + month + '/' + year;

    if( birthday.length == 10) {
        let documentUpdated = await User.updateOne({_id:id}, {'infos.birthday': birthday} );

        if(documentUpdated.nModified > 0) {
            response.status(200).json({message: "Sucess, next end-point user/phone"});
        }else {
            response.status(500).json({message: "Failed"});
        }
    }
    else {
        response.status(400).json({message: "Data must contain Day, Month and Year"});
    }

});

userRouter.put('/phone/:id', async (request, response) => {
    await isAuth(request, response, 'GET /user');

    const id = request.params.id;
    const phone = request.body.phone;

    const validator = await User.findOne({'infos.phone': phone})

    if(validator) {
        response.status(409).json({message: 'Data already registered'})
        return false;
    }

    if( phone.toString().length >= 10) {
        let documentUpdated = await User.updateOne({_id:id}, {'infos.phone': phone} );

        if(documentUpdated.nModified > 0) {
            response.status(200).json({message: "Sucess, next end-point user/addres"});
        }else {
            response.status(500).json({message: "Failed"});
        }
    }
    else {
        response.status(400).json({message: "Data must contain a phone number"});
    }

});

userRouter.put('/addres/:id', async (request, response) => {
    await isAuth(request, response, 'GET /user');

    const id = request.params.id;
    const cep = request.body.cep;
    const street = request.body.street;
    const number = request.body.number;
    const complement = request.body.complement;
    const city = request.body.city;
    const state = request.body.state;

    if(cep.length != 8) {
        response.status(400).json({message: "Cep must contain 8 numbers"});
    }

    if(city && state && street.length <= 0) {
        response.status(400).json({message: "City, State and Stret, can not be empty."});
    }

    let check = true

    if (check == true){
        let documentUpdated = await User.updateOne({_id:id}, {
            'infos.addres.cep': cep,
            'infos.addres.street': street,
            'infos.addres.number': number,
            'infos.addres.complement': complement,
            'infos.addres.city': city,
            'infos.addres.state': state
        });

        if(documentUpdated.nModified > 0) {
            response.status(200).json({message: "Sucess"});
        }else {
            response.status(500).json({message: "Failed"});
        }
    }
    else {
        response.status(400).json({message: "Missing some information o body"});
    }

});

module.exports = userRouter;