import { Router } from "express";
import { type Request, type Response } from "express";
import { UserRepository } from "../repository/user.repository.ts";

const router = Router();

const userCrud = new UserRepository();

/**
 * @openapi
 * /update_user:
 *   patch:
 *     summary: Update user
 *     description: Update an existing user's details using the request body.
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
 *               - name
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Luis Reyes updated
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
router.patch("/update_user", (req: Request, res: Response) => {
    const { id, name } = req.body;
    const user = userCrud.updateUser(id, name);
    
    if (user === undefined) {
        return res.status(404).send("User not found"); 
    }
    
    return res.status(200).json({
        message:[
            "user updated",
            {userUpdated: user}
        ]
        
    });
});


export default router;
