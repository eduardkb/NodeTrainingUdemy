const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
require("dotenv").config();
const writeLog = require("./write-log");

const swaggerIni = async (expApp) => {
  const srvURL = process.env.SWAGGER_URL || `http://localhost:5000`;
  const doc = {
    info: {
      version: "1.0.0",
      title: "Pet Application API",
      description: "API to manage users and pets for 'Get a Pet' application",
    },
    servers: [
      {
        url: srvURL,
      },
    ],
    components: {
      "@schemas": {
        userRegister: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "User Name",
              example: "John Doe",
            },
            email: {
              type: "string",
              description: "User email",
              example: "johndoe@edu.com",
            },
            phone: {
              type: "string",
              description: "User Name",
              example: "+555-444-3333",
            },
            password: {
              type: "string",
              description: "User Name",
              example: "johndoe1234",
            },
            confirmpassword: {
              type: "string",
              confirmpassword: "User Name",
              example: "johndoe1234",
            },
          },
        },
        userModify: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "User Name",
              example: "John Doe",
            },
            email: {
              type: "string",
              description: "User email",
              example: "johndoe@edu.com",
            },
            phone: {
              type: "string",
              description: "User Phone",
              example: "+555-444-3333",
            },
            password: {
              type: "string",
              description: "User Password",
              example: "johndoe1234",
            },
            confirmpassword: {
              type: "string",
              confirmpassword: "User Confirm Password",
              example: "johndoe1234",
            },
            image: {
              type: "string",
              format: "binary",
            },
          },
        },
        userLogin: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "User Name",
              example: "johndoe@edu.com",
            },
            password: {
              type: "string",
              description: "User email",
              example: "johndoe1234",
            },
          },
        },
        petBody: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Pet Name",
              example: "Max",
            },
            age: {
              type: "integer",
              description: "Pet Age",
              example: 4,
            },
            weight: {
              type: "integer",
              description: "Pet Weight",
              example: 12,
            },
            color: {
              type: "string",
              description: "Pet Color",
              example: "Black",
            },
            breed: {
              type: "string",
              description: "Pet Breed",
              example: "German Sheppard",
            },
            images: {
              type: "array",
              description: "Images Upload",
              items: {
                type: "string",
                format: "binary",
              },
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  };

  try {
    const outputFile = "./helper/swagger-output.json";
    const endpointsFiles = [
      "./routes/petRoutes.js",
      "./routes/userRoutes.js",
      "./routes/adminRoutes.js",
    ];
    await swaggerAutogen(outputFile, endpointsFiles, doc);

    expApp.use(bodyParser.json());
    const swaggerFile = require("./swagger-output.json");
    expApp.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
    writeLog(
      "DEB",
      "Swagger",
      "Swagger file generated and initialized successfully."
    );
  } catch (error) {
    writeLog("DEB", "SwaggerErr", `Error while initializing swagger: ${error}`);
  }
};
module.exports = { swaggerIni };
