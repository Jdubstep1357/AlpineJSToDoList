window.todos = function () {
    return {
    
        todos: [],

        editedTodo: null,


        get active() {
            return this.todos.filter(todo => ! todo.completed);
        },

        get completed() {
            return this.todos.filter(todo => todo.completed);
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
            this.editedTodo = todo;
        },

        // After person double clicks and changes selection, confirm it
        editComplete(todo) {
            this.editedTodo = null;
        },

        deleteTodo(todo) {
            let position = this.todos.indexOf(todo);

            this.todos.splice(position, 1);
        },
        
    }


}