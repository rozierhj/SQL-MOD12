const {Pool} = require('pg');

function viewDB(choice){

    const pool = new Pool({

        user:'postgres',
        host: 'localhost',
        database:'employee_db',
        password:'rootroot'
    });

    let print = '';

    pool.connect()
    .then(()=>{
        pool.query(`SELECT * FROM ${choice}`)
        .then(({rows})=>{
            console.log(rows);
        });

    })
    .then(()=>{
        //console.log(print.rows);
    })
    .catch(err=>{
        console.error('sometin went wrong',err);
    })
    .finally(()=>{
        pool.end();
    });   

}

module.exports = viewDB;