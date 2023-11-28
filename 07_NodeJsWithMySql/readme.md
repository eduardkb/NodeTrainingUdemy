# Implementing Node.js with MySQL

## Basics
#### App Description
- CRUD app that manages books with a MySQL database.
  - App automatically creates the table and adds some books (/myModueles/myModule.js)
  - main page (https://localhos:3000)
    - Create book: /
    - List books: /books
    - Update book: /books/edit/:id (inside book details. Click List All and select a book.)
    - Delete: /books/edit/:id (inside book details. Click List All and select a book.)

#### Implementing Connection Pool

- Connection Pool is a cache to accelerate database connections
- Implementation
  - created new file /db/conn.js and migrated database connection to it.
  - imported conn with pool variable inside index.js
  - used pool variable instead of conn

## How to Run App

- Execute to install:
  - $> npm install
- Execute to run
  - $> npm start

## Pre-requisites

- Install MySQL Database
  - Install and run XAMPP:
    Official Page: https://sourceforge.net/projects/xampp/
    Start MySQL from XAMPP Control Panel
- OPTIONAL: Install Workbench to manage DB
  - SQL local manager
  - Install MySql Workbench from: https://www.mysql.com/products/workbench/
- OPTIONAL: Install command line MySQL (adding MySQL bin folder to the Path ambient variable)\
  - Verify current Path variable:\
    $> $env:Path
  - Add directory temporarily:\
    $> $senv:Path += ";C:\XAMPP\mysql\bin"
  - Add dir definitively using Admin Terminal:\
    $> [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\XAMPP\mysql\bin", "Machine")
  - Start command line MySQL\
    $> mysql -u root
  - Use cmd of MySQL (command example)\
    $> SHOW DATABASES;


## Node packages pre-requisites (initializing project)

- MySQL driver
  - $> npm install mysql
- Install basic packages
  - $> npm init -y
  - $> npm install nodemon --save-dev
  - $> npm install express express-handlebars
