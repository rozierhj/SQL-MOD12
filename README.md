# SQL-MOD12
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description 
    Project to create a database (business_db) and three tables (departments, employee, role) in PostgreSQL. Project demonstrates using SQL queries to manipulate SQL tables by adding and editing table rows. Project also demonstrates the use of foreign keys in tables to connect table data across tables. 

  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)  

  ## Installation
    Install dependincies 'figlet', 'inquirer' and 'pg'.

  ## Usage

  #### [link to the application demonstration video](https://app.screencastify.com/v3/watch/2fOabOYJyFk3YZeOXU2W)
  #### [link to the git repository](https://github.com/rozierhj/SQL-MOD12)
  #### [link to the website](#)

    To begin the demonstration a database named business_db is created in PostgreSQL. The database has three tables;
    - departments: id | name
    - employee:    id | first_name | last_name | role_id | manager_id
    - role:        id | title | salary | department_id
    Next, using inquirer, the user demonstrates the options of
    - displaying the departments on the terminal, 
    - displaying the roles on the terminal (swapping in department names via the department_id foreign key) 
    - displaying the employees on the terminal (swapping in role title and salary, department name and manager name via the role_id, department_id and manager_id foreign keys)
    - adding a new department
    - adding a new role
    - adding a new employee
    - changing an employee's role 

  Webpage Design
    n/a

  ## License

  Application is covered under the [MIT license](https://opensource.org/licenses/MIT)

  ## Contributing
    n/a

  ## Tests
    n/a

  ## Questions

  #### Github user profile for: [rozierhj](https://github.com/rozierhj)
  #### For more information, you can email at: [hunter.rozier@yahoo.com](hunter.rozier@yahoo.com)