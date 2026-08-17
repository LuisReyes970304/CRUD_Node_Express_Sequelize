import { type User } from "../../models/user.model.ts"

export interface UserRepoInterfase {
    
    /**
     * This method takes a name and with an autoincremental id 
     * returns a new User object type.
     * @param {string} name
     * @returns {User}  
     */
    create(name: string): User;

    /**
     * This method find all the users in the database.
     */
    findAll(): User[];

    /**
     * This method delete the users from the database.
     * @param {number} id 
     * @returns void
     */
    deleteUser(id: number): boolean;

    /**
     * This method allows to update a new user, based on the id 
     * to find the ight one and the name to modify the current one.
     * @param {number} id 
     * @param {string} name
     * @returns {User} 
     */
    updateUser(id: number, name: string): User | undefined;
}