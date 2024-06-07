const { Client } = require('pg');

function createDB(){

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'rootroot',
    port: 5432,
});

client.connect();

const createDB = 'CREATE DATABASE employee_db';

client.query(createDB, (err, res) =>{
    if(err){
        console.error('bad',err);
    }else{
        console.log('we did it');
    }
    client.end();
});

}

function createTable(){

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database: 'employee_db',
        password: 'rootroot',
        port: '5432',
    });

    client.connect();

    const createTableQR = `

        CREATE TABLE employee (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30),
            email VARCHAR(50) UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        )
    `;

    client.query(createTableQR, (err, res) =>{
        if(err){
            console.error('bad',err);
        }else{
            console.log('good');
        }

        client.end();
    });

}

//createTable();
console.log('why so fast');