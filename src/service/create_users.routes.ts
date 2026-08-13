import { Router } from "express";
import { type Request, type Response } from "express";
import { type User, database } from "../models/user.model.ts";

const router = Router();

/**
 * @openapi
 * /create_user:
 *   post:
 *     summary: Create new user!
 *     description: Create a new user using a body request.
 *     tags:
 *       - Create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Luis Reyes
 *     responses:
 *       201:
 *         description: New user created.
 */
router.post("/create_user", (req: Request, res: Response) => {
  const newArr = [];
  for (const char of database) {
    newArr.push(char.id);
  }
  const nextId: number = newArr.length === 0 ? 1 : Math.max(...newArr) + 1;
  const { name } = req.body;
  const user: User = { id: nextId, name: name };
  database.push(user);
  res.status(200).send("new user added");
});

export default router;
