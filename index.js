const inquirer = require('inquirer');
const { Client } = require('pg');

//connect to the database
const client = new Client({
    user: 'postgres',
    host:'localhost',
    database:'business_db',
    password:'rootroot',
    port:5432,
});

//SETUP MENU USER CHOOSES FROM..................................

async function menu(){

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
                
                await addNewRole()

                break;
            case 'add an employee':

                await addEmployee();

                console.log('add an employee chosen');
                break;
            case 'update an employee role':

                await updateEmployeeRole();

                break;
            case 'close':
                await client.end();
                process.exit();
                
        }

    }
    catch(err){
        console.error(err);
    }
    
    await menu();

}


//EMPLOYEE RELATED FUNCTIONS.............................................

//function displays all employees on the terminal
async function displayEmployees(){
    try{

        //query gets the employee id, first_name and last_name values from employee table then does a join with the employee table to replace the manager_id with the existing employee first and last name with that id and does a join with the role table at the role_id to include the role title and salary. another join is done between the role table and department table at the department_id so that the department name can replace the department_id and be included in the resulting table
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

//function gets list of all employees currently in database (first name last name)
async function getEmployeeChoices(){
    try{

        //query get employee id, first name and last name from the employee table
        const res = await client.query('SELECT id, first_name, last_name FROM employee');
        return res.rows.map(row =>({
            name: `${row.first_name} ${row.last_name}`,
            value: row.id
        }));

    }
    catch(err){
        console.error(err);
    }
}

//function adds an employee to the database
async function addEmployee(){

    const answers = await inquirer.prompt([
        {type:'input',
        name: 'firstName',
        message: 'First name: '},

        {type:'input',
         name:'lastName',
         message:'Last name: '   
        }

    ]);

   const {firstName, lastName} = answers;

    const currentRoles = await getRoles();
    const {newRole} = await rolePrompt(currentRoles);

    //query gets id from role table that matches the newRole title
    const roleQuery = 'SELECT id FROM role WHERE title = $1';
    const roleRes = await client.query(roleQuery, [newRole]);

    const roleID = roleRes.rows[0].id;

    const managerChoices = await getEmployeeChoices();

    const managerChosen = await inquirer.prompt([
        {
            type: 'list',
            name: 'managerID',
            message: 'Choose manager: ',
            choices: managerChoices
        }
    ]);

    const {managerID} = managerChosen;

    //query adds employe fisrt name, last name, role id and manager id into the employee table
    const employeeQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';

    await client.query(employeeQuery,[firstName, lastName, roleID, managerID]);

}

//function gets an employee and changes their role id value
async function updateEmployeeRole(){

    console.log('update an employee role chosen');

    const employeeChoices = await getEmployeeChoices();

    const employeeChosen = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeID',
            message: 'Choose manager: ',
            choices: employeeChoices
        }
    ]);

    const {employeeID} = employeeChosen;

    const currentRoles = await getRoleID();
    const {newRole} = await rolePrompt(currentRoles);

    //query updates employee with the employeeID by giving them a new role_id
    const updateQuery = 'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *';
    await client.query(updateQuery, [newRole, employeeID]);

}


//DEPARTMENT RELATED FUNCTIONS...........................................

//display departments on the terminal
async function displayDepartments(){
    try{

        //get all departments from the department table
        const departments = await client.query('SELECT * FROM departments');
        console.table(departments.rows);

    }
    catch(err){
        console.error(err);
    }
}

//get list of current departments
async function getDepartments(){

    try{
        //query gets all of the names from the departments table
        const res = await client.query('SELECT name FROM departments');
        return res.rows.map(row => row.name);

    }
    catch(err){
        console.error(err);
    }

}

//prompt user to choose from list of current departments
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


//ROLE RELATED FUNCTIONS.................................................

//display roles on the terminal
async function displayRoles(){
    try{

        //query gets the role id, role salary and role title from the role table. a join is done with the department table at the department_id and the department name is inserted
        const query = `SELECT role.id, role.title, departments.name as department, role.salary FROM role JOIN departments ON role.department_id = departments.id`;

        const res = await client.query(query);
        console.table(res.rows);

    }
    catch(err){
        console.error(err);
    }
}

//get list of existing role titles
async function getRoles(){
    try{
        //query selects all of the titles from the role table
        const res = await client.query('SELECT title FROM role');
        return res.rows.map(row => row.title);
    }
    catch(err){
        console.error(err);
    }

}

//offer list of roles to choose from
async function rolePrompt(roleNames){
    const questions = [
        {
            type: 'list',
            name: 'newRole',
            message: 'Select a role: ',
            choices: roleNames
        }
    ];

    return await inquirer.prompt(questions);
}

//add a role to the database
async function addNewRole(){
    
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

    //query gets the id corresponding to a department with a specific name from the departments table
    const departmentQuery = 'SELECT id FROM departments WHERE name = $1';
    const departmentRes = await client.query(departmentQuery,[chosenDepartment.newDepartment]);

    const departmentID = departmentRes.rows[0].id;

    //query adds a row into the role table with a title, salary and department id number
    const roleQuery = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';

    const roleRes = await client.query(roleQuery, [roleName, salaryValue, departmentID]);

    console.log('role added');

}

//get the list of role ids that currently exist
async function getRoleID(){
    try{
        //query gets the title and id from the role table as a pair. the titel is displayed and the value passed is the role id
        const res = await client.query('SELECT id, title FROM role');
        return res.rows.map(row =>({
            name: row.title,
            value: row.id
        }));

    }
    catch(err){
        console.error(err);
    }
}

//FUNCTION FOR RUNNING PROGRAM........................................................

async function main(){
    try{
        await client.connect();
        await menu();
    }
    catch(err){
        console.error(err);
        await client.end();
    }
}

//run program
main();







