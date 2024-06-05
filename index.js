const figlet = require('figlet');
const fs = require('fs');
const { Client } = require('pg');
const DB = require('./db/createDB');
const viewDB = require('./db/viewDB');
const inquirer = require('inquirer');
const readline = require('readline');

// const rl = readline.createInterface({

//     input: process.stdin,
//     output: process.stdout,
//     terminal: true,

// });
// function test(){
//     console.log(test);
//     return 45;
// }

// function onEnterKeyPress(){
//     console.log('Begin program...');
//     let a = test();
//     console.log(a);
//     userInput();
//     return( a );
    
// }


// async function userInput(){

//     const menu = [
//         {
//         type:'list',
//         name:'menu',
//         message: 'what do you want to do?',
//         choices: ['view all departments','view all roles','view all employees','add a department', 'add a role','add an employee','update employee role'],
//     },
// ];
// try{
//     const choices = await inquirer.prompt(menu);
    
//     if(choices.menu === 'view all departments'|| choices.menu === 'view all roles'|| choices.menu === 'view all employees'){

//         viewDB('department');
//         return;

//     }
//     else if(choices.menu === 'view all roles'){
//         viewDB('role');
//         return;
//     }
//     else if(choices.menu === 'view all employees'){
//         viewDB('employee');
//     }
//     else{
//         console.log(choices.menu);
//         return;
//         //viewDB(choices);
//     }
//     return;

// }
// catch(err){
//     console.error('Error:',err);
//     return;
// }
// }

// rl.on('line',(input)=>{
//     if(input.trim() === ''){
//         onEnterKeyPress();

        
        
//     }
// });



// figlet('Hello World!',(err, data)=>{
//     if(err){
//         console.log('figlet could not figure it out.');
//         console.dir(err);
//         return;
//     }

//     console.log(data);
// });


DB.createConnectDB();




