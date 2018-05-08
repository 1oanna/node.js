/*jshint esversion: 6 */

const uuidv4 = require('uuid/v4');

class Database {
    
    constructor() {
        this.todos = {};
    }

    list() {
        return this.todos;
    }

    add(todo) {
        let uuid = uuidv4();
        return this.addTodo(uuidv4(), todo);
    }

    addTodo(uuid, todo) {
        this.todos[uuid] = {descr: todo, done: false};
        return this.todos[uuid];
    }

    removeTodo(uuid) {
        if (this.todos[uuid] === undefined)
            return false;

        delete this.todos[uuid];
        return true;
    }

    update(uuid, todo) {
        if (this.todos[uuid] === undefined)
            return false;

        this.todos[uuid].descr = todo;
        return this.todos[uuid];
    }

    reset() {
        this.todos = {};
    }

    readTodo(uuid) {
        return (this.todos[uuid] === undefined) ? false : this.todos[uuid];
    }

    clearTodos() {
        this.todos = {};
    }

    markAsDone(uuid) {
        if (this.todos[uuid] === undefined) 
            return false;

        this.todos[uuid].done = true;
        return this.todos[uuid];
    }   

    markAsNotDone(uuid) {
        if (this.todos[uuid] === undefined) 
            return false;

        this.todos[uuid].done = false;
        return this.todos[uuid];
    }
}

module.exports = { Database };