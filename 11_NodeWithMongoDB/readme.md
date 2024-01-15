# Node With MongoDB

---

## MongoDB Basics

### Insert

- db.products.insert({ name: 'Laptop Dell', color: 'Black' })
- db.products.insert({ name: 'Mouse Logitech', color: 'Gray', price: 159.59 })
- db.products.insert({ name: 'Headset Sennheiser', color: 'White', price: 299.2 })
- db.products.insert({ name: 'Ceiling Fan', color: 'Indigo Blue', price: 689.99, options: {blades: 6, watts: '120w'} })

### Get

- db.getCollection("products").find({})
- db.getCollection("products").find({price:{$gt:100}})

### Update

- db.products.update({name: 'Mouse Logitech'}, {$set: {color: 'Red', price: 58.55}})
- db.products.update({name: 'Laptop Dell'}, {$set: {price: 6559.9}})

### Delete

- db.products.deleteOne({ name: 'Headset Sennheiser' });
