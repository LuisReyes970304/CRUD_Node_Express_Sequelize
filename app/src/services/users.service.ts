import User, {type UserCreationDto} from "../models/user.model.ts";
import {UserRepository } from "../repository/user.repository.ts";

const userRepository = new UserRepository()

export class UserService {
  async create(data: UserCreationDto): Promise<User> {
    if(!data) {
      throw new Error("name and password are required");
    }
    return await userRepository.create(data);
  }

  async findALL(): Promise<User[]> {
    return await userRepository.findAll();
  }
}
