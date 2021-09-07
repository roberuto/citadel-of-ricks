import { AuthInput } from "../../../../graphql/types";

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface UserRepository {
  findAll: () => Promise<User[]>;
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  createUser(input: AuthInput): Promise<User>;
}
