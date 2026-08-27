import { type UserRepoInterfase } from "./interfaces/user.repository.interfase.ts";
import User from "../models/user.model.ts";
import type { UserCreationDto, UserUpdateDto } from "../dto/user.dto.ts";

export class UserRepository implements UserRepoInterfase {

    async create(data: UserCreationDto): Promise<User> {
        const user = await User.create(data)
        return user;
    }

    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async update(id: number, data: UserUpdateDto): Promise<User | undefined>{
        const user = await User.findOne({where: {id}});
        if(!user) {
            return undefined
        }
        return user.update(data);
    }

    async delete(id: number): Promise<boolean> {
    const user = await User.destroy({where: {id}})
        if (user === -1) {
            return false;
            }
        return true;
    }

    async restore(id: number): Promise<void> {
        const user = await User.restore({where: {id}});
        return user
    }
}
