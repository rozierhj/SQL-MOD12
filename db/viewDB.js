const {Client} = require('pg');

function tableGet(){

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database:'company',
        password: 'rootroot',
        port: 5432,
    });

    client.connect()
    .then(()=>{
        console.log(client.database);
        const db = client.database;
        client.query(`SELECT * FROM locations`)
        .then((data)=>{
            console.log(data.rows);
        })
        .catch(err=>{
            console.error('Error in the table making step',err);
        });
    })
    .catch(err=>{
        console.error('Error in the table making step',err);
    })
    .finally(()=>{
        client.end();
        console.log('we done');
        process.exit(0);
    });
}
module.exports = tableGet();