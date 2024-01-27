# BackEnd - Get a Pet Project

---

## Intro

- uses Node.js for the backend
- uses mongoose to consult a MongoDB database
- uses Azure Keyvault to get keys (MongoDb and jwtSignature)

## How to start Application

- install database
  - Install local MongoDB or configure Azure/AWS MongoDB instance
  - get MongoDB connection string
- This application requires some configuration
  - read the file .envSAMPLE for instructions
- install backend
  - $> npm install
  - $> npm start

## Initializing Project

- $> npm init -y
- $> npm install express nodemon cors mongoose bcrypt cookie-parser jsonwebtoken multer dotenv
- Packages for keyvault
- $> npm install @azure/keyvault-secrets @azure/identity

## Database Initial Sample Data

- API to backup: /admin/getdbbackup
- Data Dump:
- ```Node.js
    {
      "message": "Success Retreiving Data.",
      "AllUsers": [
          {
              "_id": "65a7c2a0e4cdfbeee4ce53f6",
              "name": "Maria",
              "email": "maria@edu.com",
              "password": "$2b$12$VH.LKt4cx9RZ41yadGcJkOtcpbN.WHqC5FvkIRSIm5z8KAO9oO/N.",
              "phone": "+1-587-487-4488",
              "createdAt": "2024-01-17T12:05:52.441Z",
              "updatedAt": "2024-01-17T12:05:52.441Z",
              "__v": 0
          },
          {
              "_id": "65a7c335a29687af108e32d8",
              "name": "João",
              "email": "joao@edu.com",
              "password": "$2b$12$rl2oF0L23uh521Np4sqSDOPbVpzNjhOiaruTpz/O7V8ogI8GdqaOy",
              "phone": "+1-489-997-9977",
              "createdAt": "2024-01-17T12:08:21.672Z",
              "updatedAt": "2024-01-17T12:08:21.672Z",
              "__v": 0
          },
          {
              "_id": "65a7cc4f1ea75aeafa93be78",
              "name": "Pedro",
              "email": "pedro@edu.com",
              "password": "$2b$12$0a2Ii894BdNSLSlkmAie2Oz/lsfn02V.d8iKcOuVlVnxp2x5dV0sS",
              "phone": "+1-158-158-1588",
              "createdAt": "2024-01-17T12:47:11.526Z",
              "updatedAt": "2024-01-17T12:47:11.526Z",
              "__v": 0
          },
          {
              "_id": "65a813303cf478b4d2358fc0",
              "name": "JoséMaria",
              "email": "josemaria@edu.com",
              "password": "$2b$12$mvx/DVw3UEiBOODVF6Si8u/Y.t/qVLSxZ/xbWCPSy2bMaUO/YTASe",
              "phone": "+1-888-999-1004",
              "createdAt": "2024-01-17T17:49:36.271Z",
              "updatedAt": "2024-01-18T18:51:31.139Z",
              "__v": 0,
              "image": "1705603890199_jose.jpg"
          },
          {
              "_id": "65afb683866f0d9aa9a7deb1",
              "name": "Arthur",
              "email": "arthur@edu.com",
              "password": "$2b$12$PSiJTBZ47LdnnDEi04fjLe5Tc71lOObdIHa75R29FwnKK3CuUcsim",
              "phone": "+2-222-222-2222",
              "createdAt": "2024-01-23T12:52:19.881Z",
              "updatedAt": "2024-01-23T13:01:31.057Z",
              "__v": 0
          },
          {
              "_id": "65b568bc8a7d4df56a580730",
              "name": "James",
              "email": "james@edu.com",
              "password": "$2b$12$pwxMnH2qcirFDxaibV0W/uGuFwfaB1szunorcgRBhahCyEgZHkBL2",
              "phone": "+1-259-259-2599",
              "createdAt": "2024-01-27T20:34:04.378Z",
              "updatedAt": "2024-01-27T20:34:04.378Z",
              "__v": 0
          }
      ],
      "AllPets": [
          {
              "_id": "65aeb0905b09e0fa1d23bf22",
              "name": "Pipoca",
              "age": 9,
              "weight": 5.5,
              "color": "black",
              "breed": "Pincher",
              "images": [],
              "available": true,
              "user": {
                  "_id": "65a813303cf478b4d2358fc0",
                  "name": "JoséMaria",
                  "image": "1705603890199_jose.jpg",
                  "phone": "+1-888-999-1004"
              },
              "createdAt": "2024-01-22T18:14:40.473Z",
              "updatedAt": "2024-01-22T18:14:40.473Z",
              "__v": 0
          },
          {
              "_id": "65aeb15b5b09e0fa1d23bf28",
              "name": "Mimi",
              "age": 4,
              "weight": 4.8,
              "color": "Amarelo",
              "breed": "Maltês",
              "images": [],
              "available": true,
              "user": {
                  "_id": "65a7c2a0e4cdfbeee4ce53f6",
                  "name": "Maria",
                  "phone": "+1-587-487-4488"
              },
              "createdAt": "2024-01-22T18:18:03.914Z",
              "updatedAt": "2024-01-22T18:18:03.914Z",
              "__v": 0,
              "adopter": {
                  "_id": "65b568bc8a7d4df56a580730"
              }
          },
          {
              "_id": "65afb8fc405b9bc054499f87",
              "name": "Pluto",
              "age": 13,
              "weight": 16,
              "color": "Preto",
              "breed": "Pastor Alemao",
              "images": [],
              "available": true,
              "user": {
                  "_id": "65afb683866f0d9aa9a7deb1",
                  "name": "Arthur",
                  "phone": "+2-222-222-2222"
              },
              "createdAt": "2024-01-23T13:02:52.184Z",
              "updatedAt": "2024-01-23T13:02:52.184Z",
              "__v": 0
          },
          {
              "_id": "65b3b3ed989eba1435667814",
              "name": "Lola",
              "age": 10,
              "weight": 4,
              "color": "Caramelo",
              "breed": "Outro",
              "images": [
                  "1706275819672_caraPet2..jpg"
              ],
              "available": true,
              "user": {
                  "_id": "65afb683866f0d9aa9a7deb1",
                  "name": "Arthur",
                  "phone": "+2-222-222-2222"
              },
              "createdAt": "2024-01-26T13:30:21.895Z",
              "updatedAt": "2024-01-26T13:30:21.895Z",
              "__v": 0
          },
          {
              "_id": "65b3b44d989eba1435667819",
              "name": "Nino",
              "age": 6,
              "weight": 10,
              "color": "Ouro",
              "breed": "Golden",
              "images": [
                  "1706275917063_goldPet4.png",
                  "1706275917064_ninaPet1.jpg"
              ],
              "available": true,
              "user": {
                  "_id": "65afb683866f0d9aa9a7deb1",
                  "name": "Arthur",
                  "phone": "+2-222-222-2222"
              },
              "createdAt": "2024-01-26T13:31:57.811Z",
              "updatedAt": "2024-01-26T13:31:57.811Z",
              "__v": 0
          },
          {
              "_id": "65b3ba09a30639ead1d33d62",
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
                  "_id": "65afb683866f0d9aa9a7deb1",
                  "name": "Arthur",
                  "phone": "+2-222-222-2222"
              },
              "createdAt": "2024-01-26T13:56:25.403Z",
              "updatedAt": "2024-01-26T13:56:25.403Z",
              "__v": 0
          },
          {
              "_id": "65b3ba29a30639ead1d33d65",
              "name": "Luca",
              "age": 2,
              "weight": 4,
              "color": "Marron",
              "breed": "Beagle",
              "images": [
                  "1706277416631_0787_goldPet4.png",
                  "1706277416633_0073_JujubaPet3.jpg",
                  "1706277416636_0492_caraPet2..jpg",
                  "1706277416638_0733_ninaPet1.jpg"
              ],
              "available": true,
              "user": {
                  "_id": "65afb683866f0d9aa9a7deb1",
                  "name": "Arthur",
                  "phone": "+2-222-222-2222"
              },
              "createdAt": "2024-01-26T13:56:57.418Z",
              "updatedAt": "2024-01-26T13:56:57.418Z",
              "__v": 0
          },
          {
              "_id": "65b3ba3ba30639ead1d33d68",
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
                  "_id": "65afb683866f0d9aa9a7deb1",
                  "name": "Arthur",
                  "phone": "+2-222-222-2222"
              },
              "createdAt": "2024-01-26T13:57:15.920Z",
              "updatedAt": "2024-01-26T13:57:15.920Z",
              "__v": 0
          },
          {
              "_id": "65b3ba6fa30639ead1d33d6b",
              "name": "Fifi",
              "age": 2,
              "weight": 2,
              "color": "Marron",
              "breed": "Beagle",
              "images": [
                  "1706277486406_0497_goldPet4.png",
                  "1706277486407_0699_JujubaPet3.jpg",
                  "1706277486409_0002_caraPet2..jpg",
                  "1706277486411_0161_ninaPet1.jpg"
              ],
              "available": true,
              "user": {
                  "_id": "65afb683866f0d9aa9a7deb1",
                  "name": "Arthur",
                  "phone": "+2-222-222-2222"
              },
              "createdAt": "2024-01-26T13:58:07.202Z",
              "updatedAt": "2024-01-26T13:58:07.202Z",
              "__v": 0,
              "adopter": {
                  "_id": "65b568bc8a7d4df56a580730"
              }
          },
          {
              "_id": "65b3e666344112a49d5aa784",
              "name": "Rolls",
              "age": 3,
              "weight": 3,
              "color": "Preto",
              "breed": "Gato",
              "images": [
                  "1706288742117_0668_JoaoPic.jpg"
              ],
              "available": true,
              "user": {
                  "_id": "65a7c2a0e4cdfbeee4ce53f6",
                  "name": "Maria",
                  "phone": "+1-587-487-4488"
              },
              "createdAt": "2024-01-26T17:05:42.886Z",
              "updatedAt": "2024-01-26T17:05:42.886Z",
              "__v": 0
          }
      ]
  }
  ```
