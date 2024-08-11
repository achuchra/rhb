import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenses } from "./routes/expenses";
import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/auth";

export const honoApp = new Hono();

honoApp.use("*", logger());

const apiRoutes = honoApp
  .basePath("/api/v1")
  .route("/expenses", expenses)
  .route("/auth", authRoute);

honoApp.get("*", serveStatic({ root: "./frontend/dist" }));
honoApp.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export type ApiRoutes = typeof apiRoutes;
