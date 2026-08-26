import { Router } from "express";
import { type Request, type Response } from "express";
import { UserRepository } from "../repository/user.repository.ts";

const router = Router();

const userCrud = new UserRepository();

/**
 * @openapi
 * /create_user:
 *   post:
 *     summary: Create new user!
 *     description: Create a new user using a body request.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Luis Reyes
 *               password:
 *                 type: string
 *                 example: new_password_123
 *     responses:
 *       201:
 *         description: New user created.
 */
router.post("/create_user", async (req: Request, res: Response) => {
  const { name, password } = req.body;
  try {
    const user = await userService.createUser(name, password);
    res.status(201).json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error creating user";
    res.status(400).json({ message });
  }
});

export default router;
