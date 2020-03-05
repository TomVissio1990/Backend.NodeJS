// Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

//Initialize variables
var app = express();

//Modelo
var User = require('../models/user');

app.post('/', (req, res) => {
    var body = req.body;
    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error searching users',
                errors: err
            });
        }
        if (!userDB) {
            res.status(400).json({
                ok: false,
                message: 'Wrong credentials - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            res.status(400).json({
                ok: false,
                message: 'Wrong credentials - password',
                errors: err
            });
        };

        //Create token
        userDB.password = '';
        var token = jwt.sign({ user: userDB }, SEED, { expiresIn: 14400 })//4 hours

        res.status(200).json({
            ok: true,
            user: userDB,
            token: token,
            id: userDB.id
        });
    });
});

module.exports = app;