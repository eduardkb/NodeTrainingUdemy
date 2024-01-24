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
- if Keys will be stored on KeyVault

  - configure a keyvault with secrets:
  - ```Node.js
    jwtSignature=<random 128Bit password for encryption>
    dbConnectionString=<MongoDb Connection String>
    ```
  - configure a App Registration with web authenticatin type
  - on Certificates & Secrets create a new "Client Secret" and take notes of the secret
  - on KeyVault give secrets read access to the app registration (as principal)

- Create .env file inside the root directory.
- Save it with content below changing the variable GET_SECRETS_FROM_AZURE to "true" or "false"
- ```Node.js
  # "true" or "false" accepted.
  GET_SECRETS_FROM_AZURE="true"
  # Variables in use if Keys will be retreived from Azure KeyVault
  KEYVAULT_URI="key vault URL from keyVault essentials"
  AZURE_TENANT_ID="value From App registration essentials, the Directory (tenant) ID"
  AZURE_CLIENT_ID="value From App registration essentials, the Application (client) ID"
  AZURE_CLIENT_SECRET<"Value from AppRegistration --> Cert & Secrets --> Client Secret --> Secret Value"
  # Variables in use if keys will be stored locally on .env file
  LOCAL_JWT_SIGNATURE="<aStrongEncryptionPassword>"
  LOCAL_DB_CONNECTION_STRING="mongodb://<userName>:<userPass>@<server>:<port>/<dbName>?<parameters>
  ```

````
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

```Node.js
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
            "__v": 0
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
        }
    ]
}
```
````
