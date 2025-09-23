import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms.js";

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
