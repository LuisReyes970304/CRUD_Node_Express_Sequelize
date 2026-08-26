import User from "../models/user.model.ts";
import { UserRepository } from "../repository/user.repository.ts";

export class UserService {
  async create(name: string, password: string): Promise<User> {
    if(!name || !password) {
      throw new Error("name and password are required");
    }
    return await UserRepository.create(name, password);
  }

  async findALL(): Promise<User[]> {
    return UserRepository.findAll();
  }
}
