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

const role = [
    {title:'accountant',salary:34000,department_id:3},
    {title:'drafter',salary:20000,department_id:5},
    {title:'design engineer',salary:40000,department_id:5}
]

async function seedRoles(){
    try{
        await client.connect();

        for (const roles of role){
            const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
            await client.query(query, [roles.title, roles.salary, roles.department_id]);
        }
    }
    catch(err){
        console.error(err);
    }
    finally{
        await client.end();
    }
}

const employee = [
    {first_name:'buffy',last_name:'summers',role_id:2},
    {first_name:'willow',last_name:'lastName1',role_id:1},
    {first_name:'xander',last_name:'lastName2',role_id:3}
];

async function seedEmployees(){
    try{
        await client.connect();

        for (const employees of employee){
            const query = 'INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)';
            await client.query(query, [employees.first_name, employees.last_name, employees.role_id]);
        }
    }
    catch(err){
        console.error(err);
    }
    finally{
        await client.end();
    }
}

//seedRoles();
//seedDepartments();
seedEmployees();