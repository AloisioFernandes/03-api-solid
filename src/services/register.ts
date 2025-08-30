import { prisma } from "@/db/prisma.js";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("E-mail already exists");
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });
}
