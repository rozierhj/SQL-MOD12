const { Client, Pool } = require('pg');

function createConnectDB(){

    const client = new Client({

        user:'postgres',
        host:'localhost',
        database:'postgres',
        password:'rootroot',
        port: 5432,

    });

    client.connect();

    const query = `SELECT 1 FROM pg_database WHERE datname = employee_db`;
    
    client.query(query)
    .then((res)=>{

        if(data.rowCount > 0){
            console.log('employee_db exists');
            return;
        }
        else{
            console.log('postgreSQL connected');
            return client.query('CREATE DATABASE employee_db');
        }

    })
    .then((data)=>{

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
                const departmentTable = `
                    CREATE TABLE IF NOT EXISTS department(
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(30) UNIQUE NOT NULL
                    );
                `;

               return pool.query(departmentTable);
            })
            .then((data)=>{
                const rolesTable = `
                CREATE TABLE IF NOT EXISTS role(
                id SERIAL PRIMARY KEY,
                title VARCHAR(30) UNIQUE NOT NULL,
                salary DECIMAL NOT NULL,
                department_id INTEGER NOT NULL,
                FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
            );
                `;
                pool.query(rolesTable);
            })
            .then((data)=>{
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
                return pool.query(employeeTable);
            })
            .catch(err=>{
                console.error('Error in the table making step');
            });
    })
    .then((data)=>{
        console.log('datbase has been created and tables created');
        return;
    })
    .catch(err=>{
        if(err.code === '42P04'){
            console.log('Database already exists')
        } else{
            console.error('Error in creating database',err);
        }
    })
    return;
}

createConnectDB();
//module.exports = createConnectDB();