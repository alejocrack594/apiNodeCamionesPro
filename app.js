var express = require('express');
var app = express();
//cargar ruta
var transporte_routes = require('./routes/transporte');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//ruta base
app.use('/api', transporte_routes);


module.exports = app;