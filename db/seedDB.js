const inquirer = require('inquirer');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

//prep for database
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'rootroot',
    post: 5432,

});

//db name
const dbName = 'business_db';

//preparing db file
const dbFilePath = path.join(__dirname,'schema.sql');
const dbTables = fs.readFileSync(dbFilePath, 'utf8');

async function createDatabase(){
    try{

        await client.connect();

        await client.query(`DROP DATABASE IF EXISTS ${dbName}`);

        await client.query(`CREATE DATABASE ${dbName}`);

    }catch(err){
        console.error(err);
    }
    finally{
        await client.end();
    }
}

async function createTables(){

    const dbClient = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'business_db',
        password: 'rootroot',
        port: 5432,
    });

    try{

        await dbClient.connect();

        await dbClient.query(dbTables);

    }
    catch(err){
        console.error(err);
    }
    finally{
        await dbClient.end();
    }

}

async function seed(){
    await createDatabase();
    await createTables();
}

seed();
