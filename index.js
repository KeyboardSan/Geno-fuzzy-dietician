const express = require('express');
var BaseConfig=require('./server/config/BaseConfig');
var PORT =80,
    ipaddress="localhost"

const app=express()
app.get('/',function (req,res) {})

app.listen(PORT)
console.log("Server started on port ",PORT);
