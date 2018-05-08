/*jshint esversion: 6 */

// ----------------- ASSIGNMENT BY IOANNA TALASLI FOR NODE.JS WEEK 3 IN SHA 05/2018 ---------------------

// Add four more actions:

// readTodo (GET /todos/:id)
// Get a single to-do with ID :id

// clearTodos (DELETE /todos)
// Clears the list of to-dos

// markAsDone (POST /todos/:id/done)
// Sets the done flag of a single to-do to true

// markAsNotDone (DELETE /todos/:id/done)
// Sets the done flag of a single to-do to false


// Importing the express package needed for Express.js
const express = require('express');
// body-parser is required in order to parse the JSON messages sent to the Express server
const bodyParser = require('body-parser');
// uuid is used to create unique identifiers
const uuidv4 = require('uuid/v4');
// db loads our in-memory database
const db = require('./database');
// database instantiates our Database function
const database = new db.Database();

// The port at which Express.js listens for requests 
const SERVER_PORT = 3000;

// Our OK response message
const OK = "OK";

// Adding a couple demo values in our database
database.add("My 1st TODO");
database.add("My 2nd TODO");

// Instantiating Express.js
const app = express();
app.use(bodyParser.json());

app.get('/', (req, resp) => {
    resp.send("its working");
});

app.get('/list', (req, resp) => {
    resp.send(database.list());
});

app.post('/add', (req, resp) => {
    // Checking if the required todo value 
    // is defined else send the Malfored Request status
    if (req.body.todo === undefined) {
        resp.status(400).send();
        return;
    }

    // Adding the todo to our database
    let r = database.add(req.body.todo);
    resp.status(201).json(r);
});


app.post('/add/:todo', (req, resp) => {
    if (!req.params.uuid || req.params.uuid == '') {
    let r = database.addTodo(uuidv4(), req.params.todo);
    resp.status(201).json(r);
    }
});

app.delete('/remove', (req, resp) => {
    if (req.body.uuid === undefined) {
        resp.status(400).json(null);
        return;
    }

    let r = database.removeTodo(req.body.uuid);
    if (!r) {
        resp.status(404).json(null); //not found
        return;
    }

    resp.status(202).json(true);
});

app.delete('/remove/:uuid', (req, resp) => {
    if (!req.params.uuid || req.params.uuid == '') {
        resp.status(400).json(null);
        return;
    }

    let r = database.removeTodo(req.params.uuid);
    if (!r) {
        resp.status(404).json(null);
        return; 
    }

    resp.status(202).json(true);
});

app.delete('/reset', (req, resp) => {
    database.clearTodos();
    resp.status(200).json(database.list());
});

app.put('/update', function(req, resp) {
    if (req.body.uuid === undefined || req.body.todo === undefined) {
        resp.status(400).json(null);
        return;
    }

    let r = database.update(req.body.uuid, req.body.todo);
    if (r === false) {
        resp.status(400).json(null);
        return;
    }

    resp.status(200).json(r);
});

app.post('/todos/:id/done', (req, resp) => {
    if (!req.params.id || req.params.id == '') {
        resp.status(400).json(null);
        return;
    }

    let r = database.markAsDone(req.params.id);
    if ( r=== false) {
        resp.status(404).json(null);
        return;
    }

    resp.status(200).json(r);
});

app.delete('/todos/:id/done', (req, resp) =>{
    if (!req.params.id || req.params.id == '') {
        resp.status(400).json(null);
        return;
    }

    let r = database.markAsNotDone(req.params.id);
    if ( r === false) {
        resp.status(404).json(null);
        return;
    }

    resp.status(200).json(r);
});


app.listen(SERVER_PORT);
console.log(`Started server on port ${SERVER_PORT}...`);

