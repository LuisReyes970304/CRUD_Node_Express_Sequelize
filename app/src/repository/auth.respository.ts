import User from "../models/user.model.ts";
import type { authRepositoryInterface } from "./interface/auth.repository.interface.ts";

export class authRepository implements authRepositoryInterface{
    async findOne(email: string): Promise<User | null>  {
        return await User.findOne({where: {email}});
    }
}