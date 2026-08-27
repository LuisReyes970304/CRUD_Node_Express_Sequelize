import { Router } from "express";
import { createUser } from "../controllers/user.controller.ts";

const router = Router();


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
router.post("/create_user", createUser);

export default router;
