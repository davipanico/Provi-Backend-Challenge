const express = require('express')
require ('./db/dbConnect')

const app = express()
app.use(express.json());
app.use(require('./db/routes'))

app.listen(3000, () => {
    console.log('Server online e pronto para acabar com seu cerébro')
})