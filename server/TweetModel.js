const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const twatSchema = new Schema({
	twat: {
		type: String,
		required: true
	},
	number: {
		type: Number
	}
})
const Twat = new model('Twat', twatSchema);
module.exports = Twat;