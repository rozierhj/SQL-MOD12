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

        await client.connect();

        const departments = await client.query('SELECT * FROM departments');
        console.table(departments.rows);

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
                console.log('view all roles chosen');
                break;
            case 'view all employees':
                console.log('view all employees chosen');
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

userInput();





