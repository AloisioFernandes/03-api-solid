import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { AuthenticateUseCase } from "../authenticate.js";

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
