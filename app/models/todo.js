var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    title: String,
	description: String,
	start_date: { type: Date, default: Date.now },
	completed_date: { type: Date, default: '' },
	priority: Number
});