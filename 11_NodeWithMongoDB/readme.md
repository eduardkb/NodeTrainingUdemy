# Node With MongoDB

---

## Running project

- Configure database
  - Install community MongoDB or Azure/AWS MongoDB
  - Get connection string
  - Mongo DB Parameters and Password from connection string have to be set.
  - Follow instructions on ./db/conn.js inside mDb object
- Run the application
  - $> npm install
  - $> npm start

## MongoDB Basics Commands

### Show databases

- show dbs

### Create or use Database

- use <db_name>

### Show collections

- show collections

### Insert

- db.products.insert({ name: 'Laptop Dell', color: 'Black' })
- db.products.insert({ name: 'Mouse Logitech', color: 'Gray', price: 159.59 })
- db.products.insert({ name: 'Headset Sennheiser', color: 'White', price: 299.2 })
- db.products.insert({ name: 'Ceiling Fan', color: 'Indigo Blue', price: 689.99, options: {blades: 6, watts: '120w'} })

### Get

- db.products.find({})
- db.products.findOne({price:{$gt:100}})

### Update

- db.products.update({name: 'Mouse Logitech'}, {$set: {color: 'Red', price: 58.55}})
- db.products.update({name: 'Laptop Dell'}, {$set: {price: 6559.9}})

### Delete

- db.products.deleteOne({ name: 'Headset Sennheiser' });

## MongoDB Initialize Node Project

- $> npm init -y
- $> npm install express express-handlebars mongodb nodemon
