window.todos = function () {
    return {

        filter: 'all',
    
        todos: [],

        editedTodo: null,


        get active() {
            return this.todos.filter(todo => ! todo.completed);
        },

        get completed() {
            return this.todos.filter(todo => todo.completed);
        },

        get filteredTodos() {
            // [this.filter] - array access - any object can be accessed with array notation

            return {
                all: this.todos,
                active: this.active,
                completed: this.completed,
            }[this.filter];
        },

        newTodo: '',


        addTodo() {
            this.todos.push({
                id: this.todos.length + 1,
                body: this.newTodo,
                completed: false
            });

            this.newTodo = '';
        },

        editTodo(todo) {
            // if user tries to edit after dbl click and clicks out, reverts to original txt
            todo.cachedBody = todo.body;
            this.editedTodo = todo;
        },

        cancelEdit(todo) {
            todo.body = todo.cachedBody;

            this.editedTodo = null;

            delete todo.cachedBody;
        },

        // After person double clicks and changes selection, confirm it
        editComplete(todo) {
            if (todo.body.trim() === '') {
                return this.deleteTodo(todo);
            }
            this.editedTodo = null;
        },

        deleteTodo(todo) {
            let position = this.todos.indexOf(todo);

            this.todos.splice(position, 1);
        },
        
    }


}