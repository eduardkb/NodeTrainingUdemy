# BackEnd - Get a Pet Project

---

## To-Do

- images
  - make option to upload images to azure
  - write log to a file

## Intro

- uses Node.js for the backend
- uses mongoose to consult a MongoDB database
- uses Azure Keyvault to get keys (MongoDb and jwtSignature)

## How to start Application

- install database
  - Install local MongoDB or configure Azure/AWS MongoDB instance
  - get MongoDB connection string
- This application requires some configuration
  - read the file .env_SAMPLE for instructions
- install backend
  - $> npm install
  - $> npm start

## Initializing Project

- $> npm init -y
- $> npm install express nodemon cors mongoose bcrypt cookie-parser jsonwebtoken multer dotenv
- Packages for keyvault
- $> npm install @azure/keyvault-secrets @azure/identity
- Packages for swagger
- $> npm install swagger-autogen swagger-ui-express body-parser

## Database Initial Sample Data

- Sample data for Application
- ```Node.js
    // Insert Users
    db.users.insertMany([
        {
        "_id": ObjectId("65a7c2a0e4cdfbeee4ce53f6"),
        "name": "Maria",
        "email": "maria@edu.com",
        "password": "$2b$12$VH.LKt4cx9RZ41yadGcJkOtcpbN.WHqC5FvkIRSIm5z8KAO9oO/N.",
        "phone": "+1-587-487-4488",
        "createdAt": ISODate("2024-01-12T12:05:52.441Z"),
        "updatedAt": ISODate("2024-01-12T12:05:52.441Z")
        },
        {
        "_id": ObjectId("65a7c335a29687af108e32d8"),
        "name": "João",
        "email": "joao@edu.com",
        "password": "$2b$12$rl2oF0L23uh521Np4sqSDOPbVpzNjhOiaruTpz/O7V8ogI8GdqaOy",
        "phone": "+1-489-997-9977",
        "createdAt": ISODate("2024-01-17T12:08:21.672Z"),
        "updatedAt": ISODate("2024-01-17T12:08:21.672Z")
        },
        {
        "_id": ObjectId("65a7cc4f1ea75aeafa93be78"),
        "name": "Pedro",
        "email": "pedro@edu.com",
        "password": "$2b$12$0a2Ii894BdNSLSlkmAie2Oz/lsfn02V.d8iKcOuVlVnxp2x5dV0sS",
        "phone": "+1-158-158-1588",
        "createdAt": ISODate("2024-01-12T12:47:11.526Z"),
        "updatedAt": ISODate("2024-01-12T12:47:11.526Z")
        }
    ])
    db.getCollection("users").find({})

    // Insert Pets
    db.pets.insertMany([
    {
  	  "_id": ObjectId("65aeb0905b09e0fa1d23bf22"),
  	  "name": "Pipoca",
  	  "age": 9,
  	  "weight": 13,
  	  "color": "Gold",
  	  "breed": "Golden",
  	  "images": [],
  	  "available": true,
  	  "user": {
  		  "_id": ObjectId("65a7c2a0e4cdfbeee4ce53f6"),
  		  "name": "Maria",
  		  "image": "1705603890199_jose.jpg",
  		  "phone": "+1-888-999-1004"
  	  },
  	  "createdAt": ISODate("2024-01-17T18:14:40.473Z"),
  	  "updatedAt": ISODate("2024-01-17T18:14:40.473Z")
    },
    {
  	  "_id": ObjectId("65aeb15b5b09e0fa1d23bf28"),
  	  "name": "Mimi",
  	  "age": 4,
  	  "weight": 4.8,
  	  "color": "Branco",
  	  "breed": "Persa",
  	  "images": [],
  	  "available": true,
  	  "user": {
  		  "_id": ObjectId("65a7c2a0e4cdfbeee4ce53f6"),
  		  "name": "Maria",
  		  "phone": "+1-587-487-4488"
  	  },
  	  "createdAt": ISODate("2024-01-22T18:18:03.914Z"),
  	  "updatedAt": ISODate("2024-01-22T18:18:03.914Z"),
  	  "adopter": {
  		  "_id": "65b568bc8a7d4df56a580730"
  	  }
    },
    {
  	  "_id": ObjectId("65afb8fc405b9bc054499f87"),
  	  "name": "Pluto",
  	  "age": 13,
  	  "weight": 16,
  	  "color": "Preto",
  	  "breed": "Pastor Alemao",
  	  "images": [],
  	  "available": true,
  	  "user": {
  		  "_id": ObjectId("65a7c335a29687af108e32d8"),
  		  "name": "João",
  		  "phone": "+2-222-222-2222"
  	  },
  	  "createdAt": ISODate("2024-01-23T13:02:52.184Z"),
  	  "updatedAt": ISODate("2024-01-23T13:02:52.184Z")
    },
    {
  	  "_id": ObjectId("65b3ba09a30639ead1d33d62"),
  	  "name": "Astro",
  	  "age": 5,
  	  "weight": 4,
  	  "color": "Marron",
  	  "breed": "Salsichinha",
  	  "images": [
  		  "1706277384548_0824_goldPet4.png",
  		  "1706277384549_0236_JujubaPet3.jpg",
  		  "1706277384553_0703_caraPet2..jpg",
  		  "1706277384555_0481_ninaPet1.jpg"
  	  ],
  	  "available": true,
  	  "user": {
  		  "_id": ObjectId("65a7c335a29687af108e32d8"),
  		  "name": "João",
  		  "phone": "+2-222-222-2222"
  	  },
  	  "createdAt": ISODate("2024-01-26T13:56:25.403Z"),
  	  "updatedAt": ISODate("2024-01-26T13:56:25.403Z")
    },
    {
  	  "_id": ObjectId("65b3ba3ba30639ead1d33d68"),
  	  "name": "Sky",
  	  "age": 2,
  	  "weight": 4,
  	  "color": "Marron",
  	  "breed": "Beagle",
  	  "images": [
  		  "1706277435201_0867_goldPet4.png",
  		  "1706277435201_0031_JujubaPet3.jpg",
  		  "1706277435204_0364_caraPet2..jpg",
  		  "1706277435205_0655_ninaPet1.jpg"
  	  ],
  	  "available": true,
  	  "user": {
  		  "_id": ObjectId("65a7c2a0e4cdfbeee4ce53f6"),
  		  "name": "Maria",
  		  "phone": "+2-222-222-2222"
  	  },
  	  "createdAt": ISODate("2024-01-26T13:57:15.920Z"),
  	  "updatedAt": ISODate("2024-01-26T13:57:15.920Z")
    }
    ])
    db.getCollection("pets").find({})
  ```
