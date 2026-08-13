import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./src/swagger/swagger.js";
import getRouter from "./src/service/get.routes.ts";
import createRouter from "./src/service/create_users.routes.ts";
import deleteRouter from "./src/service/delete_user.routes.ts";
import updateRouter from "./src/service/update_user.routes.ts";

const openapiSpecification = swaggerJsdoc(options);

const port: Number = parseInt(process.env.PORT as string, 10);
const host: String = "http://localhost";

const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());

app.get("/get_users", getRouter);

app.post("/create_user", createRouter);

app.delete("/delete", deleteRouter);

app.patch("/update", updateRouter);

app.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
  console.log(`Docs available at ${host}:${port}/docs`);
});
