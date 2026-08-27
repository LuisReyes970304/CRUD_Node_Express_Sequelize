import { Router } from "express";
import { type Request, type Response } from "express";
import { UserRepository } from "../repository/user.repository.ts";

const router = Router();

const userCrud = new UserRepository();

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
router.get("/get_users", async (_req: Request, res: Response) => {
    try {
        const users = await userCrud.findAll();
        res.status(200).json(users);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error fetching users";
        res.status(500).json({ message });
    }
}); 

export default router;
