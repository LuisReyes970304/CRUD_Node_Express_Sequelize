import User from "../../models/user.model.ts";
import type { UserCreationDto, UserUpdateDto } from "../../dto/user.dto.ts"; 

export interface UserRepoInterfase {
    
    /**
     * returns a new User object type.
     * @param {UserCreationDto} data - User data. 
     */
    create(data: UserCreationDto): Promise<User>;

    /**
     * This method find all the users in the database.
     */
    findAll(): Promise<User[]>;

    /**
     * This method allows to update a new user, based on the id 
     * to find the ight one and the name to modify the current one.
     * 
     * @param {number} id 
     * @param {UserUpdateDto} data
     * @returns {User} 
     */
    update(id: number, data: UserUpdateDto): Promise<User | undefined> ;

    /**
     * This method delete the users from the database.
     * 
     * @param {number} id 
     * @returns void
     */
    delete(id: number): Promise<boolean>;

    /**
     * This is the method to restore an user delited throw soft delete.
     * 
     * @param {number} id 
     */
    restore(id: number): Promise<void>;
}
