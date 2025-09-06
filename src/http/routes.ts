import type { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate.js";
import { register } from "./controllers/register.js";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
}
