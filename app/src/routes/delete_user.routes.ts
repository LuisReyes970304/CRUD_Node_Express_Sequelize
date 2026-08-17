import { Router } from "express";
import { type Request, type Response } from "express";
import { UserRepository } from "../repository/user.repository.ts";

const router = Router();

const userCrud = new UserRepository();
/**
 * @openapi
 * /delete:
 *   delete:
 *     summary: Delete User by ID!
 *     description: Delete a user using a body request.
 *     tags:
 *       - Users
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
  const data = userCrud.deleteUser(parseInt(id));
  if (data === false) {
    res.status(401).send("User not found");
  }
  res.status(200).send(`User with id: ${id} was deleted successfully!`);
});

export default router;
