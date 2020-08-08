const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: {type: String, required: true},
    token: { type: String, required: true },
    infos: {
        cpf: {type: String},
        fullName: {type: String},
        firstName: {type: String},
        LastName: {type: String},
        birthday: {type: String},
        phone: {type: Number},
        addres: {
            cep: {type: Number},
            street: {type: String},
            number: {type: Number},
            complement: {type: String},
            city: {type: String},
            state: {type: String}
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;