/*jshint esversion: 6 */

// ----------------- ASSIGNMENT BY IOANNA TALASLI FOR NODE.JS WEEK 2 IN SHA 05/2018 ---------------------

// -------------------------- Write a Node.js command line application ----------------------------------
// ----- The following commands must be present -----
// 1) The user must be able to run the file using node index.js 
// 2) No command or help ---> to display the available commands ----> node index.js . or node index.js help
// 3) list ---> Shows current to-dos, or shows an appropriate text if there are no to-dos --> node index.js list
// 4) add ---> Adds a to-do item. All the words behind add are entered as 1 to-do item to the list ---> ex. node index.js add item 1 
// 5) remove ---> Removes a to-do item by its 1-base index, e.g. to remove second item, execute ---> node index.js remove 2 
// 6) reset ---> Removes all to-do items from the list ---> node index.js reset
// ----------------------------------------- Bonus assignment -------------------------------------------
// 1) Use JSON to store to-dos
// 2) update ---> Updates a to-do item with new text ----> node index.js update 3 "Brush teeth"
// ---------------------------------------- Things to consider -----------------------------------------------------
// What representation you use in your file (CSV, TSV, JSON, etc).
// Handle edge cases, i.e. control what happens if user enters unexpected input, e.g. remove -100



//include fs
const fs = require('fs');
let data = [];

let args = process.argv.slice(2);

//console.log(args);

//--- internals ----
const readData = ( cl ) => {
    fs.readFile('./data.txt', 'utf8', (err, fileData) => {
        if (!err) {         
            
            //parse json
            data = JSON.parse(fileData);
            cl();

        } else {

            if (err.code === 'ENOENT') {
                console.log('no data found');
                return;
            }

            console.log(err);
        }
    });
};

const dumpData = ( dataToWrite, cl ) => {
    fs.writeFile('./data.txt', JSON.stringify(dataToWrite), function(err) {
        if (!err) {
            cl();
            return;
        }

        console.log(err);
    });
};

//--- todo actions ----

const list = () => {
    if (!data || data.length == 0) {
        console.log("There are no todos yet.");
        return;
    }

    //pretty print
    let strData = '\r\n-------- TODOs --------\r\n\r\n';
    data.map( (d, i) => {
        strData += (i+1) + ". " + d + "\r\n";
    });
    strData += '\r\n-----------------------\r\n';
    console.log(strData);
};

const add = () => {
    //get proper text
    const todoText = args.slice(1).join(" ");
    data.push(todoText);

    dumpData(data, () => {
        console.log("Item [" + todoText + "] added");
    });
};

const remove = () => {
    if (!args[1] || isNaN(parseInt(args[1])) || parseInt(args[1]) == 0 ) {
        console.log("sorry, that is not a valid index to remove.");
        return;
    }

    const removeIndex = parseInt(args[1]) - 1;
    // check if the user input is <0
    if (removeIndex <0 ) { 
        console.log("sorry, that is not a valid index to remove."); 
        return; 
    }
    // check if the user input does not exist
    if (typeof data[removeIndex] == "undefined") { 
        console.log("item does not exist please try again with a valid index to remove"); 
        return; 
    }
    data.splice(removeIndex, 1);

    dumpData(data, () => {
        console.log("Item [" + (removeIndex+1) + "] removed");
    });
};

const reset = () => {
    dumpData([], () => { //write an empty array
        console.log("Todos reset.");
    });
};

const update = () => {
    //get index
    const idx = parseInt(args[1]);
    const todoText = args.slice(2).join(" ");

    if (isNaN(idx) || idx==-1 ) {
        console.log("sorry, that is not a valid index to update.");
        return;
    }

    //check if item exists
    if (typeof data[idx - 1] === 'undefined') {
        console.log("sorry, there is no item in that index.");
        return;
    }

    if (todoText == "") {
        console.log("Please add some text to update");
        return;
    }

    data[idx -1] = todoText;
    dumpData(data, () => {
        console.log("Item [" + (idx) + "] updated to [" + todoText + "]");
    });
};

const help = () => {
    const helpText = `
------------------------- Available commands and examples for valid input ---------------------------
    help : shows the Available commands --> node index.js help or node index.js .
    add : adds an item in the end of the list --> node index.js add "item 3"
    list : list all items that are present in the todo list --> node index.js list
    update : update an item --> ex. the 3rd --> node index.js update 3 "new 3rd item in your list"
    remove : remove an item --> ex. the 3rd --> node index.js remove 3 
    reset : removes all items from the list --> node index.js reset 
-----------------------------------------------------------------------------------------------------`;
    console.log(helpText);
};


switch(args[0]) {
    case "list":
        readData(list);
        break;
    case "add":
        readData(add);
        break;
    case "remove":
        readData(remove);
        break;
    case "reset":
        readData(reset);
        break;  
    case "update":
        readData(update);
        break;
    case "help":
        readData(help);
        break;
    default:
        help();
        break;
}