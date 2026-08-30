import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import sequelize from "./src/config/database.ts";
import { options } from "./src/doc/swagger.ts";
import { host, port } from "./src/config/database.ts";
import authRouter from "./src/routes/auth.routes.ts";
import userRouter from "./src/routes/user.routes.ts";

const openapiSpecification = swaggerJsdoc(options);

await sequelize.authenticate();
await sequelize.sync();

const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
  console.log(`Docs available at ${host}:${port}/docs`);
});
