//Require packages
const mysql = require('mysql')
const inquirer = require('inquirer')

//Establish a connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_DB"
})

//Fires promptUser() function when connection is established
connection.connect((err) => {
    if (err) throw err
    console.log("connected as ID: " + connection.threadId)
    promptUser()
})

//Function that allows user to pick an option from the list on how they want to edit the database
const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: "action",
            choices: [
                "View all employees",
                "View all employees by role",
                "View all employees by department",
                "Update employee",
                "Add Role",
                "Add Department",
                "View Budget"
            ]
        }
    ]).then ((answer) => {
        //Depending on selection, proper function is fired
        switch (answer.action) {
            case "View all employees":
                viewAllEmpls()
            break
            case "View all employees by role":
                viewEmplsRoles()
            break
            case "View all employees by department":
                viewEmplsDept()
            break
            case "Update employee":
                updateEmpl()
            break
            case "Add Role":
                addRole()
            break
            case "Add Department":
                addDept()
            break
            case "View Budget":
                viewBudget()
            break
        }
    })
}

const viewAllEmpls = () => {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(empl.first_name, ' ' ,empl.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee empl on employee.manager_id = empl.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      promptUser()
    })
}

const viewEmplsRoles = () => {

}

const viewEmplsDept = () => {

}

const updateEmpl = () => {

}

const addRole = () => {

}

const addDept = () => {

}

const viewBudget = () => {

}