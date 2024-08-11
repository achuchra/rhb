import { honoApp } from "./app";

const server = Bun.serve({
  port: process.env.PORT || 3000,
  fetch: honoApp.fetch,
});

console.log("Server started on port", server.port);
