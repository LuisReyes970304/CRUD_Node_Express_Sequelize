import { Router } from "express";
import { type Request, type Response } from "express";
import { type User } from "../models/user.model.ts";
import { database } from "../seeder/user.seeder.ts"

const router = Router();

/**
 * @openapi
 * /find_user:
 *   post:
 *     summary: find User by ID!
 *     description: Find a user using a body request.
 *     tags:
 *       - Find
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: User found successfully.
 *       404:
 *         description: User not found.
 */
router.post("/find_user", (req: Request, res: Response) => {
  const { id } = req.body;
  const user = database.find((user: User) => user.id === id);
  res.status(200).send(user);
});

export default router;