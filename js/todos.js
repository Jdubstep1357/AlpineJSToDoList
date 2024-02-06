// Local storage
window.todoStore = {
    // call save method
    todos: JSON.parse(localStorage.getItem('todo-store') || '[]'),

    // write local storage and make it stringified content of all todos
    save() {
        localStorage.setItem('todo-store', JSON.stringify(this.todos));
    }
};

// Making a new Todo item
window.Todo = function (body) {
    this.id = Date.now();
    this.body = body;
    this.completed = false;
};


window.todos = function () {
    return {

        // ... merges another object - references window.todoStore
        ...todoStore,
        filter: 'all',
        newTodo: '',
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

        get allComplete() {
            return this.todos.length === this.completed.length;
        },



        addTodo() {


            if (! this.newTodo) {
                return;
            }

            // referes up to window.Todo
            this.todos.push(new Todo(this.newTodo));

            // Original before making constructor up top
            // this.todos.push({
            //     // Each id is only accociated with unique id
            //     id: Date.now(),
            //     body: this.newTodo,
            //     completed: false
            // });

            // update / save to local storage
            this.save();

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

            this.save();
        },

        deleteTodo(todo) {
            let position = this.todos.indexOf(todo);

            this.todos.splice(position, 1);

            this.save();
        },

        toggleTodoCompletion(todo) {
            todo.completed = ! todo.completed;

            this.save();
        },

        toggleAllComplete() {

            let allComplete = this.allComplete;

            this.todos.forEach(
                todo => todo.completed = ! allComplete
                );

            this.save();
        },

        clearCompletedTodos() {
            this.todos = this.active;

            this.save();
        }
        
    }


}