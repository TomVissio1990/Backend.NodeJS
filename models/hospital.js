var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var hospitalSchema = new Schema({
    name: { type: String, required: [true, 'Name required'] },
    img: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

hospitalSchema.plugin(uniqueValidator, { message: 'Unique {PATH}' });

var collectionName = 'Hospitals'

module.exports = mongoose.model('Hospital', hospitalSchema, collectionName);