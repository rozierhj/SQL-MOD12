const inquirer = require('inquirer');

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

function userInput(){

    inquirer.prompt(userChoice).then(answers =>{
    
        switch(answers.choice){
            case 'view all departments':
                console.log('view all departments chosen');
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
                console.log('application closed');
                return;
        }
    userInput();
    })

}

userInput();





