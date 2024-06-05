const {Client} = require('pg');
const inquirer = require('inquirer');

function viewDB(choice){

    const client = new Client({

        user:'postgres',
        host: 'localhost',
        database:'books_db',
        password:'rootroot'
    });

    let print = '';

    client.connect()
    .then((client)=>{
        console.log('connected to db');
       return client.query(`SELECT * FROM ${choice}`)
    })
    .then((res)=>{
        console.log(res);
    })
    .catch(err=>{
        console.error('sometin went wrong',err);
    })
    .finally(()=>{
        pool.end();
    });   

}

//viewDB('books_db');

async function getTable(){

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database:'books_db',
        password: 'rootroot',
        port: 5432
    });

    try{

        await client.connect();
        const res = await client.query('SELECT * FROM books_db');
        console.log(res.rows);
    }
    catch(err){
        console.error('error',err);
    }finally{
        
        await client.end();
        console.log('we done');
    }


}

getTable();
//module.exports = viewDB;