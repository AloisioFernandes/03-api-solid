import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { RegisterUseCase } from "../register.js";

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
