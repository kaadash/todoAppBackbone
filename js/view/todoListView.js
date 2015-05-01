var TodoListView = Backbone.View.extend({
	el: '#todoapp',
	initialize: function(){
		this.input = this.$('#new-todo');
		todoList.on('add', this.addOne, this);
		todoList.on('remove', this.addAll, this);
		todoList.fetch();
	},
	events: {
		'keypress #new-todo': 'CreateTodoOnEnter'
	},
	CreateTodoOnEnter: function(e){
		if (e.which !== 13 || !this.input.val().trim()) {
			return;
		};
		todoList.create(this.newAtribute());
		this.input.val('');
	},
	addOne: function(todo){
		var view = new TodoView({model:todo});
		$('#todo-list').append(view.render().el);
	},
	addAll: function(){
		this.$('#todo-list').html('');
		todoList.each(this.addOne, this);
	},
	newAtribute: function(){
		return {
			title: this.input.val().trim(),
			completed: false
		}
	}
});

