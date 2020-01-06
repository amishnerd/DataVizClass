create table departments (
	dept_no varchar(4),
	dept_name varchar(30)
);

create table dept_emp (
	emp_no int,
	dept_no varchar(4),
	from_date date,
	to_date date
);

create table dept_managers (
	dept_no varchar(4),
	emp_no int,
	from_date date,
	to_date date
);

create table employees (
	emp_no int,
	birth_date date,
	first_name varchar(20),
	last_name varchar(20),
	gender varchar(1),
	hire_date date
);

create table salaries (
	emp_no int,
	salary int,
	from_date date,
	to_date date
);

create table titles (
	emp_no int,
	title varchar(20),
	from_date date,
	to_date date
);
select * from employees;

SELECT employees.emp_no,
  employees.last_name,
  employees.first_name,
  employees.gender,
  salaries.salary
FROM employees
INNER JOIN salaries ON
employees.emp_no = salaries.emp_no;

select * from dept_managers;

select * from employees where hire_date between 1986-01-01 and 1986-12-31;

SELECT departments.dept_no,
  departments.dept_name,
  dept_managers.emp_no,
  employees.last_name,
  employees.first_name,
  dept_managers.from_date,
  dept_managers.to_date
  FROM dept_managers
INNER JOIN departments ON
dept_managers.dept_no = departments.dept_no
inner join employees on 
dept_managers.emp_no = employees.emp_no;

SELECT dept_emp.emp_no,
  employees.last_name,
  employees.first_name,
  departments.dept_name
  FROM dept_emp
inner join employees on
dept_emp.emp_no = employees.emp_no
INNER JOIN departments ON
dept_emp.dept_no = departments.dept_no;

select * from employees where employees.first_name = 'Hercules' and employees.last_name like 'B%';

SELECT dept_emp.emp_no,
  employees.last_name,
  employees.first_name,
  departments.dept_name
  FROM dept_emp
inner join employees on
dept_emp.emp_no = employees.emp_no
INNER JOIN departments ON
dept_emp.dept_no = departments.dept_no
where departments.dept_name = 'Sales';

SELECT dept_emp.emp_no,
  employees.last_name,
  employees.first_name,
  departments.dept_name
  FROM dept_emp
inner join employees on
dept_emp.emp_no = employees.emp_no
INNER JOIN departments ON
dept_emp.dept_no = departments.dept_no
where departments.dept_name in ('Sales', 'Development');

SELECT last_name, COUNT (last_name)
  FROM employees
  group by last_name
  order by count desc;
