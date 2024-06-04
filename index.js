const figlet = require('figlet');
const fs = require('fs');
const { Client } = require('pg');
const DB = require('./db/createDB');

figlet('Hello World!',(err, data)=>{
    if(err){
        console.log('figlet could not figure it out.');
        console.dir(err);
        return;
    }

    console.log(data);
});

DB.createConnectDB();




