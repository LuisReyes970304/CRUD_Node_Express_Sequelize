import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

/**
 * OpenAPI specification for the hybrid cryptography demo API.
 */
export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "CRUD Login",
        version: '1.0.0',
        },
    },
    apis: ['./*.ts', './**/*.ts'], 
};