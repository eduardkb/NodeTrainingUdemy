# Implementing Node.js with MySQL

## Basics

- CRUD app that manages books with a MySQL database.
  - App automatically creates the table and adds some books (/myModueles/myModule.js)
  - main page (https://localhos:3000)
    - Create book: /
    - List books: /books
    - Update book: /books/edit/:id (inside book details clicking a book name on the list)
    - Delete: PLACEHOLDER

## Pre-requisites

- Install MySQL Database

  - Install and run XAMPP: \
    Official Page: https://sourceforge.net/projects/xampp/ \
    Start MySQL from XAMPP Control Panel
  - Install command line MySQL (adding MySQL bin folder to the Path ambient variable)\
    Verify current Path variable: $env:Path \
    Add directory temporarily: $senv:Path += ";C:\XAMPP\mysql\bin" \
    Add dir definitively using Admin Terminal: [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\XAMPP\mysql\bin", "Machine")
  - Start command line MySQL \
    mysql -u root
  - Use cmd of MySQL \
    SHOW DATABASES;

- Install Workbench
  - Install MySql Workbench from: https://www.mysql.com/products/workbench/

## Node packages pre-requisites (initializing project)

- MySQL driver
  - $> npm install mysql
- Basic packages
  - $> npm init -y
  - $> npm install nodemon --save-dev
  - $> npm install express express-handlebars

## Initialize App

- Execute to install:
  - $> npm install
- Execute to run
  - $> npm start
