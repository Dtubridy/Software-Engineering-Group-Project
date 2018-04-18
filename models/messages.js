var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var messageSchema = new Schema({
	message: {type: String},
    date_created: {type: Date, default: new Date()}

	});

module.exports = mongoose.model('Message', messagesSchema);