import { type UserRepoInterfase } from "./interfaces/user.repository.interfase.ts";
import { type User } from "../models/user.model.ts";
import { database } from "../models/user.model.ts";

export class UserRepository implements UserRepoInterfase {
    create(name: string): User {
        const nextId: number =
        database.length === 0
            ? 1
            : Math.max(...database.map((user) => user.id)) + 1;
        const user: User = { id: nextId, name: name };
        return user;
    }

    findAll() {
        return database;
    }

    deleteUser(id: number) {
    const index = database.findIndex((user) => user.id === id);
    if (index === -1) {
        return false;
    }
    database.splice(index, 1);
    return true;
    }

    updateUser(id: number, name: string){
        const currentUser = database.find((user) => user.id === id)
        if(!currentUser){
            return undefined
        }
        currentUser.name = name
        return currentUser
    }
}
