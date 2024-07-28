const {Client} = require('pg');

const client = new Client({

    user: 'postgres',
    host: 'localhost',
    database: 'business_db',
    password: 'rootroot',
    port: 5432,

});

const departments = [
    'Supply Chain',
    'Purchasing',
    'Accounting',
    'Process Engineering',
    'Product Engineering'
];

async function seedDepartments(){
    try{

        await client.connect();

        for (const department of departments){
            const query = 'INSERT INTO departments (name) VALUES ($1)';
            await client.query(query,[department]);
        }
    }
    catch(err){
        console.error(err);
    }
    finally{
        await client.end();
    }
}

seedDepartments();