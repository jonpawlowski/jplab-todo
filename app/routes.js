var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find({ 'archive': 0 }, function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getFormattedDate() {
    var todayTime = new Date();
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return month + "/" + day + "/" + year;
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
			progress: 0,
			title: req.body.title,
			description: req.body.description,
			start_date: req.body.start_date,
			completed_date: req.body.completed_date,
			priority: req.body.priority,
			archive: 0
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

	app.put('/api/todos/:todo_id', function (req, res) {
        // use mongoose to get all todos in the database
		let id = req.params.todo_id;
		var currentDate = getFormattedDate();
		var updateData = {
			progress : 1,
			completed_date : currentDate
		}
		Todo.findByIdAndUpdate(id, updateData, function(err, todo) {
			if (err)
				res.send(err);
			getTodos(res);
		});
    });
	
    // archive a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        // use mongoose to get all todos in the database
		let id = req.params.todo_id;
		var updateData = {
			archive : 1
		}
		Todo.findByIdAndUpdate(id, updateData, function(err, todo) {
			if (err)
				res.send(err);
			getTodos(res);
		});
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
