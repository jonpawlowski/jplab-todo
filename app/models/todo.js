var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    title: String,
    description: String,
    start_date: String,
    completed_date: String,
    priority: Number
});
