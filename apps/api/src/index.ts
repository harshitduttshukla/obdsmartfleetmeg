import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const server = Fastify({
  logger: true,
});

// Register plugins
await server.register(cors, {
  origin: true, // Customize as needed
});

await server.register(jwt, {
  secret: process.env.JWT_SECRET || "super-secret-key-change-me-in-production",
});

// Health check route
server.get("/health", async (request, reply) => {
  return { status: "OK", timestamp: new Date().toISOString() };
});

// Start the server
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    const host = process.env.HOST || "0.0.0.0";
    await server.listen({ port, host });
    console.log(`Server listening at http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
