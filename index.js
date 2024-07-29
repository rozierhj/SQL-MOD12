const inquirer = require('inquirer');
const { Client } = require('pg');
const readline = require('readline');

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
                
                const addNewDepartment = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentName',
                        message: 'Enter the new department name: '
                    }
                ]);

                const {departmentName} = addNewDepartment;

                const query = 'INSERT INTO departments (name) VALUES ($1) RETURNING *';
                const res = await client.query(query,[departmentName]);
                console.log('New department added: ', res.rows[0]);

                break;
            case 'add a role':
                
            const newRole = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Enter the new role name: '
                }
            ]);

            const {roleName} = newRole;

            const newSalary = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'salaryValue',
                    message: 'Enter the salary: '
                }
            ]);

            const {salaryValue} = newSalary;

            const currentDepartments = await getDepartments();

            const chosenDepartment = await departmentPromt(currentDepartments);

            console.log(chosenDepartment.newDepartment);

            const departmentQuery = 'SELECT id FROM departments WHERE name = $1';
            const departmentRes = await client.query(departmentQuery,[chosenDepartment.newDepartment]);

            const departmentID = departmentRes.rows[0].id;

            const roleQuery = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';

            const roleRes = await client.query(roleQuery, [roleName, salaryValue, departmentID]);

            console.log('role added');


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

async function getDepartments(){

    try{
        const res = await client.query('SELECT name FROM departments');
        return res.rows.map(row => row.name);

    }
    catch(err){
        console.error(err);
    }

}

async function getRoles(){
    try{
        const res = await client.query('SELECT title FROM role');
        return res.rows.map(row => row.map);
    }
    catch(err){
        console.error(err);
    }

}

async function getEmployees(){
    try{

        const res = await client.query('SELECT first_name, last_name FROM employee');

        return res.rows.map(row => `${row.first_name} ${row.last_name}`);

    }
    catch(err){
        console.error(err);
    }
    


}

async function employeePromt(employeeNames){
    const questions = [
        {
            type: 'list',
            name: 'employee',
            message: 'Select an employee',
            choices: employeeNames
        }
    ];

    const answers = await inquirer.prompt(questions);
}

async function rolePromt(roleNames){
    const questions = [
        {
            type: 'list',
            name: 'employee',
            message: 'Select an employee',
            choices: roleNames
        }
    ];

    const answers = await inquirer.prompt(questions);
}

async function departmentPromt(departmentNames){
    const questions = [
        {
            type: 'list',
            name: 'newDepartment',
            message: 'Select a department: ',
            choices: departmentNames
        }
    ];

    return await inquirer.prompt(questions);

}

async function addNewRole(){
    
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







