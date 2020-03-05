var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a role'
}

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: { type: String, required: [true, 'Name required'] },
    email: { type: String, unique: true, required: [true, 'Email required'] },
    password: { type: String, required: [true, 'Password required'] },
    img: { type: String },
    role: { type: String, required: true, default: 'USER_ROLE', enum: validRoles }
});

userSchema.plugin(uniqueValidator, { message: 'Unique {PATH}' });

var collectionName = 'Users'

module.exports = mongoose.model('User', userSchema, collectionName);