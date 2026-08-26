import { type UserRepoInterfase } from "./interfaces/user.repository.interfase.ts";
import User from "../models/user.model.ts";
import { database } from "../seeder/user.seeder.ts"

export class UserRepository implements UserRepoInterfase {
    async create(name: string, password: string): Promise<User> {
        const user = await User.create({name: name, password: password})
        return user;
    }

    findAll(): Promise<User[]> {
        return User.findAll();
    }

    updateUser(id: number, name: string, password: string): Promise<User>{
        const currentUser = database.find((user) => user.id === id)
        if(!currentUser){
            return undefined
            }
        currentUser.name = name
        currentUser.password = password
        return currentUser
    }

    deleteUser(id: number): Promise<boolean> {
    const index = database.findIndex((user) => user.id === id);
        if (index === -1) {
            return false;
            }
        database.splice(index, 1);
        return true;
    }
}
