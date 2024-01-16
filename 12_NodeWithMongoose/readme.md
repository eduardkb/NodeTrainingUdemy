# Node With Mongoose Project

- this project is a conversion from previous project (NodeWithMongoDB)
  from manual written models to the mongoose automated module.

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

## Install mongoose

- $> npm install mongoose

## Settings from temp MongoDB on Azure (MISSING PASSWORD)

```Node.js
const mDb = {
    idName: "ekbmongodata",
    idPass: process.env.mongoDbPass,
    pass: "<MYPASS>",
    server: "ekbmongodata.mongo.cosmos.azure.com",
    port: "10255",
    dbName: "nodeProductsApp",
    params: "?ssl=true&retrywrites=false&maxIdleTimeMS=120000",
};
```
