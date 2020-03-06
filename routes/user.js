// Requires
var express = require('express');
var bcrypt = require('bcryptjs');

var authMiddleware = require('../middlewares/tokenMiddleware');

//Initialize variables
var app = express();

//Modelo
var User = require('../models/user');

//Routes

//get users
app.get('/', (req, res, next) => {
    User.find({},
        'name email img role').exec(
            (err, user) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        message: 'Error loading users',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    users: user
                });
            });
});

//update user
app.put('/:id', authMiddleware.verifyToken, (req, res) => {
    var body = req.body;
    var id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error searching user',
                errors: err
            });
        }
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'User id' + id + ' not found',
                errors: { message: 'Not found user with that id' }
            });
        }

        user.name = body.name;
        user.email = body.email;
        user.role = body.role.toUpperCase();

        user.save((err, putUser) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    message: 'Error creating user in put',
                    errors: err
                });
            }
            putUser.password = "";
            res.status(200).json({
                ok: true,
                user: putUser
            });
        });
    });
});

//create user
app.post('/', authMiddleware.verifyToken, (req, res) => {
    var body = req.body;
    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role.toUpperCase(),
    });

    user.save((err, postUser) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'Error creating user',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            user: postUser
        });
    });
});

//delete user
app.delete('/:id', authMiddleware.verifyToken, (req, res) => {
    var id = req.params.id;
    User.findByIdAndRemove(id, (err, deletedUser) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'Error deleting user',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            user: deletedUser
        });
    });
});

module.exports = app;