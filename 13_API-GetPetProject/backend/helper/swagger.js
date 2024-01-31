const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
require("dotenv").config();
const writeLog = require("./write-log");

const swaggerIni = async (expApp) => {
  const srvURL = process.env.SWAGGER_SERVER || `http://localhost:5000`;
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
      schemas: {
        userBody: {
          $name: "Jhon Doe",
          $email: "johndoe@edu.com",
          $phone: "+111-222-3333",
          $password: "johndoe1234",
          $confirmpassword: "johndoe1234",
        },
        userResponse: {
          name: "Jhon Doe",
          email: "johndoe@edu.com",
          phone: "+111-222-3333",
        },
        userLogin: {
          $email: "johndoe@edu.com",
          $password: "johndoe1234",
        },
        petBody: {
          $name: "Buddy",
          $age: "7",
          $weight: "6",
          $breed: "Beagle",
          $color: "Black/Caramel",
          $images: "johndoe1234",
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
    const endpointsFiles = ["./routes/*.js"];
    await swaggerAutogen(outputFile, endpointsFiles, doc);

    expApp.use(bodyParser.json());
    const swaggerFile = require("./swagger-output.json");
    expApp.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));
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
