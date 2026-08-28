import { Router } from "express";
import { userController } from "../controllers/user.controller.ts";

const router = Router();

/**
 * @openapi
 * /user/create_user:
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
router.post("/user/create_user", userController.createUser);

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
router.get("/user/get_users", userController.findAllUsers);

export default router;
