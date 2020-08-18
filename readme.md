# Provi Node.js Challenge

<p align="center">
 <a href="#background">Background</a> •
 <a href="#objective">Objective</a> • 
 <a href="#tecnology">Tecnology</a> • 
 <a href="#how to use">How to Use</a> • 
</p>

# Background

Provi is a fintech that offers loans for educational purposes without guarantees for individuals. Our goal is promote specialized education for brazilians to get qualified and reach their dream. We finance courses and specializations for designers, developers, data scientists, digital marketers, etc.

# Objective

This API has the objective of create a new user with email & password and register some informations about it, like: Name, Addres, CPF, Phone Number and Amount Of Loan. All this data will be saved in a noSQL database. All the data will be in worked in JSON.

# Tecnology

- Express 
- Axios
- Bcrypt (To encrypt the password)
- Nodemon
- Mongoose
- Uuid (To generate a token for user)

# How to use

First you need to clone this repo
 - https://github.com/davipanico/Provi-Backend-Challenge.git

Install dependecies
 - npm install

Then start the API
 - npm start

End Points

/signup</br>
type: POST</br>
Body: "Email" (String), "Password" (String).</br>
Body Type: "JSON"</br>
Example: {"Email": "davi@provi.com", "Password": "123"}</br>

Here will be your entry point at API. You need to pass at body your e-mail and a password, and the API will generate a token for you and return on the response. You will use the token to send requests across the API, to do that you need to add a new Key to requisition header with 'Token' name and, the token as value just like the image above (Postman).

user/index</br>
type: GET</br>
body: none</br>

At this end-point you will receive a list of all users registered on your database.

user/cpf/:id (pass id of the user you want to edit as params on url)</br>
type: PUT</br>
body: "CPF" (String).</br>
body type: JSON</br>
example: {"CPF": "12345678910"}</br>

With this end-point you will register CPF number of the user.

user/fullname/:id (pass id of the user you want to edit as params on url)</br>
type: PUT</br>
body: "fullName" (String)</br>
body type: JSON</br>
example: {"fullName": "Davi Moreira"}</br>

Here you will register the full name of the user, that name will be splitted to "First Name" and "Last Name" on your DB.

user/birthday/:id (pass id of the user you want to edit as params on url)</br>
type: PUT</br>
body: "day" (String), "month" (String), "year" (String).</br>
body type: JSON</br>
example: {"day": "09", "month": "09" "year": "2020"}</br>

At this end-point you will pass day, month and year of birth. That birthday will be concatenated as one on DB.

user/phone/:id (pass id of the user you want to edit as params on url)</br>
type: PUT</br>
body: "phone" (Number).</br>
body type: JSON</br>
example: {"phone": "11999999999"}</br>

Here you will register the phone number of the user, you need to pass the DDD together with the phone number.

user/addres/:id (pass id of the user you want to edit as params on url)</br>
type: PUT</br>
body: "cep" (String),</br> "street" (String),</br> "number": (Number),</br> "complement": (String),</br> "city": (String),</br> "state": (String).</br>
body type: JSON</br>
example: {"cep": "04052050", "street": "Rua Orissanga", "number": 0, "complement": "apto 0", "city": "São Paulo", "state": "São Paulo"}.

Here you will register the addres informations of the user. Some part of the addres will be validated (Street, cep and City), so pay attention on the information you pass, the name of the street and city must exactly the same on the https://viacep.com.br/ API.

user/phone/:id (pass id of the user you want to edit as params on url)</br>
type: PUT</br>
body: "amount" (Number).</br>
body type: JSON</br>
example: {"amount": 450.50}</br>

Here you will register how much the user wants for a loan, every ',' you need to change for '.' the value will be registered as cents on your DB.



Thank you!



