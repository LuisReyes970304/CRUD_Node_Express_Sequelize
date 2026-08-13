import { Router } from "express";
import { database} from "../models/user.model.ts";
import { type Request, type Response } from "express";

const router = Router();

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
    res.send(database)
})

export default router 