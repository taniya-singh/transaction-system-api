/*
 * @file: swagger-config.js
 * @description: It Contain swagger configrations.
 * @author: Taniya
 */
import swaggerJsDocs from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Transaction Project Apis",
      version: "1.0",
      description: "All api end points",
      contact: {
        name: "Taniya"
      },
      servers: ["http://localhost:3000"]
    },
    produces: ["application/json"],
    host: !process.env.NODE_ENV ? `172.24.4.68:3000` : "54.71.18.74:4619"
  },
  apis: !process.env.NODE_ENV ? ["./api/v1/*/*.js"] : ["*/*/*/*/*.js"],
  layout: "AugmentingLayout"
};
export default swaggerJsDocs(swaggerOptions);
