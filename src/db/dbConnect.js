const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/node-provi',  {useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => {console.log('Conectado ao banco de dados!')})

module.exports = db;