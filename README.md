# node.js

--------------------- HOMEWORK WEEK 1 -----------------


Create an HTTP server that can add and subtract from a number, which we will call state.

Rule 1
DO NOT USE EXPRESS.JS

Rule 2
You can use other packages, but you must also make a version without any npm packages. http, of course, is a built-in Node.js package, so you can use that.

// The state variable
let state = 10;
Endpoints criteria
/* /state
 * response: the current state in a HTML format
 * When the server starts, this should return '10'
 */
const stateUrl = 'http://localhost:8080/state';

/* /add
 * Response: "11" in HTML format
 * This should add 1 to the current state
 */
const addUrl = 'http://localhost:8080/add';

/* /subtract
 * Response: "10" in HTML format
 * This should subtract 1 ƒrom the current state
 */
const subtractUrl = 'http://localhost:8080/subtract';

/* /reset
 * Response: "OK" in HTML format
 * This should set the state back to '10'
 */
const resetUrl = 'http://localhost:8080/reset';

/* Any other URL
 * Response: return error code 404: 'Not found' with a friendly message and do
 * not change the state variable
 */
const badUrl = 'http://localhost:8080/bad';



DEALINE : 25/04/2018 ---- SUBMISSION DATE : 24/04/2018



--------------------- HOMEWORK WEEK 2 -----------------


These are the specs for this week's assignment:

Write a Node.js command line application
The user must be able to run the file using node index.js or node . in the project directory
There must be a help section that lists all the commands and a short description for each of them
The user must be able to add, remove and list to-dos.
The user must be able to remove all to-dos at once.
The following commands must be present:

No command or help
Shows help section

node index.js
or

node index.js help
list
Shows current to-dos, or shows an appropriate text if there are no to-dos

node index.js list
add
Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.

node index.js add "Buy groceries"
remove
Removes a to-do item by its 1-base index, e.g. to remove second item, execute:

node index.js remove 2
reset
Removes all to-do items from the list:

node index.js reset
Bonus assignment
Use JSON to store to-dos
Split each action (i.e. read, write, etc.) into a separate file
Use commander library to implement command line interface
Add following commands:

update
Updates a to-do item with new text:

node index.js update 3 "Brush teeth"
Things to consider
What representation you use in your file (CSV, TSV, JSON, etc).
Handle edge cases, i.e. control what happens if user enters unexpected input, e.g. remove -100.



DEALINE : 02/05/2018 ---- SUBMISSION DATE : 02/05/2018



--------------------- HOMEWORK WEEK 3 -----------------


Read through the code from the lecture, make sure you understand the flow of the program.

Add four more actions:

readTodo (GET /todos/:id)
Get a single to-do with ID :id

clearTodos (DELETE /todos)
Clears the list of to-dos

markAsDone (POST /todos/:id/done)
Sets the done flag of a single to-do to true

markAsNotDone (DELETE /todos/:id/done)
Sets the done flag of a single to-do to false

Requirements
All requests that need a body should be in JSON format, and follow the request structure of the other actions
All responses should be in JSON format, and follow the response structure of the other actions
Follow the anatomy of the project
Make sure your code is DRY
Follow the REST design principles: use the proper method, response status codes, and consistent URL paths
Test your API using Postman



DEALINE : 09/05/2018 ---- SUBMISSION DATE : 08/05/2018


----- Thank you for taking time to check out my repository on node.js. -----

---- Any constructive feedback on my work, would be greatly appreciated. ----










