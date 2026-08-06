import express, { type Response, type Request } from "express";
import { Sequelize } from "sequelize";
import type { User } from "./src/models/user.model.ts";
// import multer from "multer";
// import axios from "axios";
// import cors from "cors";

const port: Number = 3001;
const host: String = "http://localhost";

const database: Array<User> = [{id: 1, name: "Juan"}];

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json(database);
});

app.post("/post", (req: Request, res: Response) => {
  const newArr = []
  for(const char of database){
    newArr.push(char.id);
  }
  const num = (Math.max(...newArr) + 1)
  const {name} = req.body
  database.push({id: num, name: name});
  res.status(200).send("new user added")
});

// app.delete("/delete", (req: Request, res: Response) => {
//   const { value } = req.body;
//   database.splice(value, 1);
//   res.status(200).send("NUmero Eliminado correctamente");
// });

// app.patch("/update", (_req: Request, res: Response) => {
//   const num: number = Math.max(...database) + 1;
//   database[0] = num;
//   res.status(200).send("first number modified, new value: " + num);
// });

app.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
});
