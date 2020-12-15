
DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(8,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUE ("Marketing");
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Research and Development");
INSERT INTO department (name)
VALUE ("Executive");


INSERT INTO role (title, salary, department_id)
VALUE ("Head Researcher", 170000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Agent", 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 90000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 60000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Researcher", 110000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("CEO", 600000, 5);


INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Laura", "Lamb", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jake", "Poltry", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kristen","Yeusewitz",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Gardner", "Webb", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Chris", "Lyko", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kyle", "Singer", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("David", "Cruz", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Bryan", "Maust", null, 7);

