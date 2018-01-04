var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    title: {
        type: String,
        default: ''
    }
	description: {
        type: String,
        default: ''
    }
	start_date: {
        type: Date,
        default: ''
    }
	completed_date: {
        type: Date,
        default: ''
    }
	    priority: {
        type: Number
    }
});