import { app } from "@/app.js";
import { prisma } from "@/db/prisma.js";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Check-in Metrics (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get the total count of check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        { user_id: user.id, gym_id: gym.id },
        { user_id: user.id, gym_id: gym.id },
      ],
    });

    const response = await request(app.server)
      .get(`/check-ins/metrics`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkInsCount).toEqual(2);
  });
});
