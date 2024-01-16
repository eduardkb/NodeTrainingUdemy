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
{
    "_id" : ObjectId("65a698e91732399868478a09"),
    "name" : "Modern televisor",
    "price" : 10582.58,
    "description" : "the most top edge tv in market",
    "image" : "https://www.hughes.co.uk/blog/wp-content/uploads/2019/07/img-2.jpg",
    "__v" : NumberInt(0)
}
{
    "_id" : ObjectId("65a6ae6e12479a58a6a4a47a"),
    "name" : "Plantronics Puck",
    "price" : NumberInt(222),
    "description" : "plantronics",
    "image" : "https://http2.mlstatic.com/D_NQ_NP_908635-MLB73596090350_122023-O.webp",
    "__v" : NumberInt(0)
}
{
    "_id" : ObjectId("65a6aed212479a58a6a4a484"),
    "name" : "Gaming Chair",
    "price" : 455.95,
    "description" : "Chair",
    "image" : "https://i5.walmartimages.com/asr/32d7ee1a-879d-441d-8e7e-703e25122a95_3.5dcb4d9b9ce965a6564a0f3daa96fceb.jpeg",
    "__v" : NumberInt(0)
}
{
    "_id" : ObjectId("65a6b351614cac539b4e6e94"),
    "name" : "PowerBall",
    "price" : 200.99,
    "description" : "Exercise Ball",
    "image" : "https://th.bing.com/th/id/OIP.tqVw-P_d9mssIzAQyL_6xgHaGV?rs=1&pid=ImgDetMain",
    "__v" : NumberInt(0)
}
{
    "_id" : ObjectId("65a6b3f5614cac539b4e6e9c"),
    "name" : "Usb Cable",
    "price" : 15.5,
    "description" : "cable",
    "image" : "",
    "__v" : NumberInt(0)
}
{
    "_id" : ObjectId("65a6b404614cac539b4e6e9f"),
    "name" : "Dell Laptop",
    "price" : NumberInt(5800),
    "description" : "laptop",
    "image" : "https://images.techhive.com/images/article/2017/05/img_4210_crx_rz-100721188-orig.jpg",
    "__v" : NumberInt(0)
}
```
