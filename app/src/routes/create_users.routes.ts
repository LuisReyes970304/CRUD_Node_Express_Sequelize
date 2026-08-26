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
router.post("/create_user", (req: Request, res: Response) => {
  const { name, password } = req.body;
  const user = userCrud.create(name, password);
  res.status(200).json(user);
});

export default router;
