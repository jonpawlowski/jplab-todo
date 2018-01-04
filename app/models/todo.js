var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    title: String,
	description: String,
	//start_date: { type: Date, default: Date.now },
	//completed_date: { type: Date, default: '' },
	start_date: String,
	completed_date: String,
	priority: Number
});