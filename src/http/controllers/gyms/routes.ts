import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import type { FastifyInstance } from "fastify";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);  
}
