const {Client} = require('pg');

const client = new Client({

    user: 'postgres',
    host: 'localhost',
    database: 'business_db',
    password: 'rootroot',
    port: 5432,

});



async function seedDepartments(){

    const departments = [
        'Sunnydale',
        'college',
        'crypt',
        'library',
        'LA'
    ];

    try{

        for (const department of departments){
            //query creates table rows in department table and adds department name
            const query = 'INSERT INTO departments (name) VALUES ($1)';
            await client.query(query,[department]);
        }
        console.log('department table seeded');
    }
    catch(err){
        console.error(err);
    }
}

async function seedRoles(){

    const role = [
        {title:'librarian',salary:34000,department_id:3},
        {title:'witch',salary:20000,department_id:5},
        {title:'friend',salary:40000,department_id:5},
        {title:'slayer',salary:30000,department_id:2}
    ]

    try{

        for (const roles of role){
            //query inserts rows in to role table containing the role title, salary and department_id
            const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
            await client.query(query, [roles.title, roles.salary, roles.department_id]);
        }
        console.log('role table seeded');
    }
    catch(err){
        console.error(err);
    }
}

async function seedEmployees(){

    const employee = [
        {first_name:'buffy',last_name:'summers',role_id:2},
        {first_name:'willow',last_name:'lastName1',role_id:1},
        {first_name:'xander',last_name:'lastName2',role_id:3},
        {first_name: 'angel',last_name:'lastName3',role_id:1}
    ];

    try{

        for (const employees of employee){
            //query inserts employees rows into employee database with values of first name, last name, role id of employee, and the manager of the employee
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
            await client.query(query, [employees.first_name, employees.last_name, employees.role_id, employees.manager_id]);
        }
        console.log('employee table seeded');
    }
    catch(err){
        console.error(err);
    }
}

async function seedManagers(){
    const managerUpdates = [
        {first_name: 'buffy', last_name:'summers', manager_id:null},
        {first_name: 'willow', last_name:'lastName1', manager_id:1},
        {first_name: 'xander', last_name:'lastName2', manager_id:2},
        {first_name: 'angel', last_name:'lastName3', manager_id:3},
    ]

    try{

        for(const employees of managerUpdates){
            //query finds employee id using first and last name
            const employeeQuery = 'SELECT id FROM employee WHERE first_name = $1 AND last_name = $2';
            const employeeRes = await client.query(employeeQuery, [employees.first_name, employees.last_name, ]);
        
        const employeeID = employeeRes.rows[0].id;

        //query update manager_id field using the employee id to target the correct row
        const updateQuery = 'UPDATE employee SET manager_id = $1 WHERE id = $2';
        await client.query(updateQuery, [employees.manager_id, employeeID]);
        }
        console.log('employees manager_id added to employee table')
    }
    catch(err){
        console.error(err);
    }
}

async function seedTables(){
    try{
        await client.connect();

        await seedDepartments();

        await seedRoles();

        await seedEmployees();

        await seedManagers();

        console.log('all tables seeded');

    }
    catch(err){
        console.error(err);
    }
    finally{
        await client.end();
    }
}

seedTables();

//seedRoles();
//seedDepartments();
//seedEmployees();