import { type UserRepoInterfase } from "./interfaces/user.repository.interfase.ts";
import User, {type UserCreationDto} from "../models/user.model.ts";
import { database } from "../seeder/user.seeder.ts"

export class UserRepository implements UserRepoInterfase {

    async create(data: UserCreationDto): Promise<User> {
        const user = await User.create(data)
        return user;
    }

    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async updateUser(id: number, name: string, password: string): Promise<User | undefined>{
        const user = await User.findOne({where: {id}});
        if(!user) {
            return undefined
        }
        return user
    }

    async deleteUser(id: number): Promise<boolean> {
    const user = await User.destroy({where: {id}})
        if (user === -1) {
            return false;
            }
        database.splice(user, 1);
        return true;
    }
}
