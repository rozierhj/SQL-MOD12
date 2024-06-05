
const {Pool} = require('pg');

const pool = new Pool(
    {
        user:'postgres',
        password:'rootroot',
        host: 'localhost',
        database: 'employee_db'
    },
    console.log('Connected to employee_db database')
)

const dprtTable = `
INSERT INTO department (name) 
VALUES 
('engineering'),
('supply chain'),
('accounting'),
('quality');
`;

const roleTable = `
INSERT INTO role (title, salary, department_id) 
VALUES 
('cheif engineer', 100,1),
('shipping person',23,1),
('accountant',344,1),
('quality manager',45,1);
`;

const employeeTable = `
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
('tom','tinker',1,1),
('sam','smith',1,1),
('sara','jane',1,1),
('billy','bob',1,1);
`;

pool.connect()
.then(()=>{
    pool.query(`DELETE FROM employee;`)
})
.then(()=>{
    pool.query(`DELETE FROM role;`)
})
.then(()=>{
    pool.query(`DELETE FROM department;`)
})
.then(()=>{
    pool.query(dprtTable);
})
.then(()=>{
    pool.query(roleTable);
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