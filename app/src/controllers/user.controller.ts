import { UserService } from "../services/users.service.ts";
import type { Response, Request } from "express";
import type { UserCreationDto } from "../dto/user.dto.ts";

const userService = new UserService

export const createUser = async (req: Request, res: Response) => {
    try {
        const userData: UserCreationDto = req.body;
        const user = await userService.create(userData);
        return res.status(201).json(user);
    } catch(error) {
        const message = error instanceof Error ? error.message : "Unexpected error creating user";
        return res.status(400).json({ message });
    }
}