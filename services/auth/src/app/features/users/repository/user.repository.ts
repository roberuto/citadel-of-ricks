import { AuthInput } from "../../../../graphql/types";
import { User, UserRepository } from "./user.types";

export class UserInMemoryRepository implements UserRepository {
  users: User[];

  constructor() {
    this.users = [];
  }

  async findAll() {
    return this.users;
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async createUser(input: AuthInput) {
    const user = { ...input, id: String(this.users.length + 1) };
    this.users.push(user);
    return user;
  }
}
