//importing modules
const express = require('express');

//setting up variables.
var PORT =80,
    ipaddress="localhost"
//creating instances
const app=express()

//creating controllers.
const homeController = require('./server/controllers/home');

//configuration of view engine
app.set('views', __dirname + '/server/views');
app.set('view engine','jade');

// setting static foldler
app.use(express.static('public'));

app.get('/',homeController.getIndex);

app.listen(PORT)
console.log("Server started on port ",PORT);
