import { Router } from "express";
import { database } from "../models/user.model.ts";
import { type Request, type Response } from "express";

const router = Router();

/**
 * @openapi
 * /delete:
 *   delete:
 *     summary: Delete User by ID!
 *     description: Delete a user using a body request.
 *     tags:
 *       - Delete
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
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete("/delete", (req: Request, res: Response) => {
  const { id } = req.body;
  const index = database.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).send("User not found");
  }
  database.splice(index, 1);
  return res.status(200).send("User deleted successfully");
});

export default router;