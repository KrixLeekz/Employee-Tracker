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
                "Add employee",
                "Add Role",
                "Add Department",
                "View Budget"
            ]
        }
    ]).then((answer) => {
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
            case "Add employee":
                addEmpl()
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

//View All Employees
const viewAllEmpls = () => {
    connection.query("SELECT * FROM `employees_DB`.`employee`;",
        (err, res) => {
            if (err) throw err
            console.table(res)
            promptUser()
        })
}

//View Employees by Roles
const viewEmplsRoles = () => {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        (err, res) => {
            if (err) throw err
            console.table(res)
            promptUser()
        })
}

//View Employees by Department
const viewEmplsDept = () => {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        (err, res) => {
            if (err) throw err
            console.table(res)
            promptUser()
        })
}

const updateEmpl = () => {

}

//Adds Employee
const addEmpl = () => {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter first name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter last name "
        },
        {
            name: "role",
            type: "list",
            message: "What is the role of this employee? ",
            choices: chooseRole()
        },
        {
            name: "manager",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then((answers) => {
        var roleId = chooseRole().indexOf(answers.role) + 1
        var managerId = selectManager().indexOf(answers.manager) + 1

        let query = "INSERT into employee (first_name, last_name, manager_id, role_id) VALUES (?,?,?,?)"
        let args = [answers.firstname, answers.lastname, managerId, roleId]
        connection.query(query, args)
        console.table(answers)
        promptUser()
    })
}

//Adds Role
const addRole = () => {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", (err, res) => {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the role?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"

            }
        ]).then(function (res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                (err) => {
                    if (err) throw err
                    console.table(res)
                    promptUser()
                }
            )

        })
    })
}

const addDept = () => {

}

const viewBudget = () => {

}

//--------------------------------Supplement functions----------------------------//


var roleArr = []
const chooseRole = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            roleArr.push(res[i].title)
        }
    })
    return roleArr
}

var managersArr = [];
const selectManager = () => {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", (err, res) => {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }

    })
    return managersArr;
}