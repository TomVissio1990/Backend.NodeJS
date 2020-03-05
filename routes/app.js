// Requires
var express = require('express');

//Initialize variables
var app = express();

//Routes
app.get('/', (req, res, next) => {
    res.status(404).json({
        ok: true,
        message:'peticion aceptada'
    });
});

module.exports = app;