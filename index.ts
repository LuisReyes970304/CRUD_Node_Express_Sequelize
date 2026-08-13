import express, { type Response, type Request } from "express";
import type { User } from "./src/models/user.model.ts";
import 'dotenv/config';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./src/swagger/swagger.js";


const openapiSpecification = swaggerJsdoc(options);

const port: Number = parseInt(process.env.PORT as string, 10);
const host: String = "http://localhost";

const database: Array<User> = [{id: 1, name: "Juan"}];

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());


/**
 * @openapi
 * /get_users:
 *   get:
 *     summary: Get all users!
 *     description: Get all users in the database in a json file
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: database returned successfully.
 */
app.get("/", (_req: Request, res: Response) => {
  res.json(database);
});

/**
 * @openapi
 * /create_user:
 *   post:
 *     summary: Create new user!
 *     description: Create a new user using a body request.
 *     tags:
 *       - Create user
 *     responses:
 *       200:
 *         description: New user created.
 */
app.post("/post", (req: Request, res: Response) => {
  const newArr = []
  for(const char of database){
    newArr.push(char.id);
  }
  const num = (Math.max(...newArr) + 1)
  const {name} = req.body
  const user: User = {id: num, name: name}
  database.push(user);
  res.status(200).send("new user added")
});


app.delete("/delete", (req: Request, res: Response) => {
  const { value } = req.body;
  database.splice(value, 1);
  res.status(200).send("Numero Eliminado correctamente");
});

// app.patch("/update", (_req: Request, res: Response) => {
//   const num: number = Math.max(...database) + 1;
//   database[0] = num;
//   res.status(200).send("first number modified, new value: " + num);
// });

app.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
  console.log(`Docs available at ${host}:${port}/docs`);
});
