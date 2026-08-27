import User from "../models/user.model.ts";
import {UserRepository } from "../repository/user.repository.ts";

const userRepository = new UserRepository()

export class UserService {
  async create(name: string, password: string): Promise<User> {
    if(!name || !password) {
      throw new Error("name and password are required");
    }
    return await userRepository.create(name, password);
  }

  async findALL(): Promise<User[]> {
    return await userRepository.findAll();
  }
}
