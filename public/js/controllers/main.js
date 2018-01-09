angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos','toaster', function($scope, $http, Todos, toaster) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.title && $scope.formData.description && $scope.formData.start_date && $scope.formData.priority) {
				$scope.loading = true;
				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.popAdd();
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.popDelete();
					$scope.todos = data; // assign our new list of todos
				});
		};
		
		// Display toaster message on successful add
		$scope.popAdd = function() {
			toaster.pop('success', "Success", "To Do Item Added", 5000);
		}
		
		// Display toaster message on successful deletion
		$scope.popDelete = function() {
			toaster.pop('success', "Success", "To Do Item Deleted", 5000);
		}
	}]);