import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import type { FastifyInstance } from "fastify";
import { create } from "./create.js";
import { history } from "./history.js";
import { metrics } from "./metrics.js";
import { validate } from "./validate.js";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-ins", create);
  app.patch("/check-ins/:checkInId/validate", validate);
}
