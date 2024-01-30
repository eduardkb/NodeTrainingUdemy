const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Get a Pet API",
      version: "1.0.0",
      description: "API for the Get a Pet Website",
    },
  },
  apis: ["./routes/*.js"], // Path to the API docs
});
module.exports = { swaggerUi, specs };
