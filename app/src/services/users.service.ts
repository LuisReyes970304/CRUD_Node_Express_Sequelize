import User from "../models/user.model.ts";
import type {UserCreationDto} from "../dto/user.dto.ts"
import {UserRepository } from "../repository/user.repository.ts";

const userRepository = new UserRepository()

export class UserService {
  async create(data: UserCreationDto): Promise<User> {
    if(!data) {
      throw new Error("name and password are required");
    }
    return await userRepository.create(data);
  }

  async findAll(): Promise<User[]> {
    return await userRepository.findAll();
  }

  async update(): Promise<void> {
    return 
  }
}
