const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: {type: String, required: true},
    token: { type: String, required: true },
    infos: {
        cpf: {type: String},
        fullName: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        birthday: {type: String},
        phone: {type: Number},
        addres: {
            cep: {type: String},
            street: {type: String},
            number: {type: Number},
            complement: {type: String},
            city: {type: String},
            state: {type: String}
        }
    },
    amountRequested: {type: Number},
    onboardingStep: {type: String},
    createdAt: {type: Date},
    updatedAt: {type: Date}
});

const User = mongoose.model('User', userSchema);

module.exports = User;