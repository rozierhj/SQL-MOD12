const { Client, Pool } = require('pg');

function createDB(){

    return new Promise((resolve, reject) =>{

        const config = {
            user:'postgres',
            host: 'localhost',
            password: 'rootroot',
            port: 5432,
            database: 'postgres'
        };
        
        const client = new Client(config);
        
        client.connect()
            .then(()=>{
                console.log('postgreSQL connected');
                return client.query('CREATE DATABASE employee_db');
            })
            .then(()=>{
                console.log('Created DataBase employee_db');
            })
            .catch(err =>{
                if(err.code === '42P04'){
                    console.log('Database already exists')
                } else{
                    console.error('Error in creating database',err);
                }
            })
            .finally(()=>{
                client.end();
            });

    });

}
function connectDB(){

    return new Promise((resolve, reject)=>{
        const pool = new Pool(
            {
                user:'postgres',
                password:'rootroot',
                host: 'localhost',
                database: 'employee_db'
            },
            console.log('Connected to employee_db database')
        )
        pool.connect();

    });

}
function createTables(){

    return new Promise((resolve, reject)=>{

    const departmentTable = `
        CREATE TABLE IF NOT EXISTS department(
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) UNIQUE NOT NULL
    );
    `;
    const rolesTable = `
        CREATE TABLE IF NOT EXISTS role(
        id SERIAL PRIMARY KEY,
        title VARCHAR(30) UNIQUE NOT NULL,
        salary DECIMAL NOT NULL,
        department_id INTEGER NOT NULL,
        FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
    );
    `;

    const employeeTable = `
        CREATE TABLE IF NOT EXISTS employee(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INTEGER NOT NULL,
        manager_id INTEGER,
        FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
        FOREIGN KEY (manager_id) REFERENCES employee(id)
    );
    `;

        const pool = new Pool(
            {
                user:'postgres',
                password:'rootroot',
                host: 'localhost',
                database: 'employee_db'
            },
            console.log('Connected to employee_db database')
        )
        pool.connect()
        .then(()=>{
            pool.query(departmentTable);
        })
        .then(()=>{
            pool.query(rolesTable);
        })
        .then(()=>{
            pool.query(employeeTable);
        })
        .catch(err=>{
            console.error('sometin went wrong',err);
        })
        .finally(()=>{
            pool.end();
        });

        
        
        

    });


}

async function createConnectDB(){

    const client = new Client({

        user:'postgres',
        host:'localhost',
        database:'postgres',
        password:'rootroot',
        port: 5432,

    });

    const query = `SELECT 1 FROM pg_database WHERE datname = $1`;
    let createDB = false;

    try{
        await client.connect();

        res = await client.query(query,['employee_db']);

        if(res.rowCount > 0){
            console.log('employee_db exists');
        }
        else{
            await createDB();
            console.log('DB creation complete');
        }
    }
    catch{
        console.error('Error in checking',err);
    }
    try{
        await connectDB();
        console.log('DB Connected');
    }
    catch{
        console.error('DB Already Connected',error.message);
    }
    try{
        await createTables();
        console.log('Tables created');
    }
    catch{
        console.error('Error',error.message);
    }

}



module.exports = {createDB, connectDB, createConnectDB};