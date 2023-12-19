# The Thoughts Project

- Full projects with relational database to do CRUD operations
- With session management

## Basics

- A project using: sequelize, SQLite, node

## Initialize project

- $> npm init -y
- Install packageto generate and cypher passwords
    - $> npm install bcryptjs 
- Install package to handle cookies and sessions
    - $> npm install connect-flash express-flash express-session cookie-parser cookie-session session-file-store
- Standard Packages:
    - $> npm install express express-handlebars sqlite3 sequelize nodemon
- Create start script inisde package.json
    - "start": "nodemon index.js",
- Create MVC folders and files: -models; -views; -controllers; -routes
    - $> touch index.js
    - $> mkdir models
    - $> mkdir db
    - $> mkdir views
    - $> mkdir controllers
    - $> mkdir routes
    - $> mkdir public
    - $> mkdir public/css
    - $> touch public/css/styles.css
- Create Sessions folder
    - $> mkdir sessions