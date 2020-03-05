var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

//verify token
exports.verifyToken = function (req, res, next) {
    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'Unauthorize',
                errors: err
            });
        };
        return res.status(401).json({
            ok: true,
            decoded1: decoded
        });
        next();
    });
};


