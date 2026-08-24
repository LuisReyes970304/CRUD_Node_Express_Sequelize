import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./src/doc/swagger.ts";
import { host, port } from "./src/config/database.ts";

import getRouter from "./src/routes/get.routes.ts";
import createRouter from "./src/routes/create_users.routes.ts";
import deleteRouter from "./src/routes/delete_user.routes.ts";
import findUserRouter from "./src/routes/find_user.routes.ts";
import updateUserRouter from "./src/routes/update_user.routes.ts"
import  connectDB  from "./src/config/database.ts";

const openapiSpecification = swaggerJsdoc(options);


const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());

app.get("/get_users", getRouter);

app.post("/create_user", createRouter);

app.delete("/delete", deleteRouter);

app.post("/find_user", findUserRouter);

app.patch("/update_user", updateUserRouter);

app.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
  console.log(`Docs available at ${host}:${port}/docs`);
});
