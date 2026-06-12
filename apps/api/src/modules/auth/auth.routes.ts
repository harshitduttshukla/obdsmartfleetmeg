// auth.routes.ts

import { FastifyInstance } from "fastify";
import { signup } from "./auth.service.js";

export async function authRoutes(
  fastify: FastifyInstance
) {
  fastify.post("/signup", async (req) => {
    const body = req.body as {
      email: string;
      password: string;
    };

    return signup(
      body.email,
      body.password
    );
  });
}
