import { Router } from "express";
import { type Request, type Response } from "express";
import { type User, database } from "../models/user.model.ts";

const router = Router();

/**
 * @openapi
 * /update:
 *   patch:
 *     summary: Update User by ID!
 *     description: Delete a user using a body request.
 *     tags:
 *       - Update
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
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
router.patch("/update", (req: Request, res: Response) => {
  const { id } = req.body;
  const user = database.find((user) => user.id === id);
  res.status(200).send(user);
});

export default router;