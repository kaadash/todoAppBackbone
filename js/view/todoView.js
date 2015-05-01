var TodoView = Backbone.View.extend({
	tagName: 'li',
	events:{
		'dblclick label': 'edit',
		'blur .edit': 'close',
		'keypress .edit': 'updateOnEnter',
		'click .delete': 'delete'
	},
	template: _.template($('#item-template').html()),
	initialize: function() {
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		this.input = this.$('.edit');
		return this;
	},
	edit: function(){
		this.$el.addClass('editing');
		this.input.focus();
	},
	close: function(){
		var value = this.input.val();
		if(value){
			this.model.set({title: value});
		}
		this.$el.removeClass('editing');
	},
	updateOnEnter: function(e){
		if(e.which === 13){
			this.close();
		}
	},
	
	delete: function(){
		this.model.destroy();
	}

});