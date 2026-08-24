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
router.get("/get_users", (_req: Request, res: Response) => {
    res.status(200).json(userCrud.findAll());
}); 

export default router;
