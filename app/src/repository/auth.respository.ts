import User from "../models/user.model.ts";

export class authRepository{
    async findOne(email: string): Promise<User | null>  {
        return await User.findOne({where: {email}});
    }
}