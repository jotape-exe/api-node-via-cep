const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser');

//Mensagem de depreciação no terminal
mongoose.set('strictQuery', true);

const app = express();

//Middleware 
//permite que o servidor receba e interprete solicitações HTTP com o corpo em formato JSON.
app.use(bodyParser.json())

const apiRoutes = require('./routes/apiRoutes')
app.use('/person', apiRoutes)

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.diz8kla.mongodb.net/ecommerce?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connected -> MongoDB[ecommerce]")
        app.listen(3000)
    })
    .catch((error) => console.log(error)) 