const inquirer = require('inquirer');
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host:'localhost',
    database:'business_db',
    password:'rootroot',
    port:5432,
});

async function displayDepartments(){
    try{

        const departments = await client.query('SELECT * FROM departments');
        console.table(departments.rows);

    }
    catch(err){
        console.error(err);
    }
}

async function displayRoles(){
    try{

        const query = `SELECT role.id, role.title, departments.name as department, role.salary FROM role JOIN departments ON role.department_id = departments.id`;

        const res = await client.query(query);
        console.table(res.rows);

    }
    catch(err){
        console.error(err);
    }
}

async function displayEmployees(){
    try{

        const query = `
        SELECT 
       e.id AS id,
        e.first_name,
        e.last_name,
        r.title,
        d.name AS department,
        r.salary,
        COALESCE(m.first_name || ' ' || m.last_name,'No Manager') AS manager
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN departments d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        `;

        const res = await client.query(query);
        console.table(res.rows);
    }

    catch(err){
        console.error(err);
    }
}

const userChoice = [
    {
        type: 'list',
        name: 'choice',
        message: 'What do you want to do',
        choices:[
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role',
            'close'
        ]
    }
];

async function userInput(){

    try{

        const answers = await inquirer.prompt(userChoice);

        switch(answers.choice){
            case 'view all departments':

                await displayDepartments();

                break;
            case 'view all roles':
                
                await displayRoles();

                break;
            case 'view all employees':
                
                await displayEmployees();

                break;
            case 'add a department':
                console.log('add a department chosen');
                break;
            case 'add a role':
                console.log('add a role chosen');
                break;
            case 'add an employee':
                console.log('add an employee chosen');
                break;
            case 'update an employee role':
                console.log('update an employee role chosen');
                break;
            case 'close':
                await client.end();
                process.exit();
                
        }

    }
    catch(err){
        console.error(err);
    }
    
    await userInput();

}

async function main(){
    try{
        await client.connect();
        await userInput();
    }
    catch(err){
        console.error(err);
        await client.end();
    }
}

main();







