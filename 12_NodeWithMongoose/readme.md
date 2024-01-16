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

## Sample Data:

```Node.js
db.products.insertMany([
    {
        name: "Modern TV",
        price: 6582.58,
        description: "the most top edge tv in market",
        image: "https://www.hughes.co.uk/blog/wp-content/uploads/2019/07/img-2.jpg"
    },
    {
        name: "Plantronics Puck",
        price: 222,
        description: "plantronics",
        image: "https://http2.mlstatic.com/D_NQ_NP_908635-MLB73596090350_122023-O.webp"
    },
    {
        name: "Gaming Chair",
        price: 455.95,
        description: "Chair",
        image: "https://i5.walmartimages.com/asr/32d7ee1a-879d-441d-8e7e-703e25122a95_3.5dcb4d9b9ce965a6564a0f3daa96fceb.jpeg"
    },
    {
        name: "PowerBall",
        price: 200.99,
        description: "Exercise Ball",
        image: "https://th.bing.com/th/id/OIP.tqVw-P_d9mssIzAQyL_6xgHaGV?rs=1&pid=ImgDetMain"
    },
    {
        name: "Usb Cable",
        price: 15.5,
        description: "cable",
    },
    {
        name: "Dell Laptop",
        price: 5800,
        description: "laptop",
        image: "https://images.techhive.com/images/article/2017/05/img_4210_crx_rz-100721188-orig.jpg"
    }
])
```
