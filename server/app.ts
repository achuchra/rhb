import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenses } from "./routes/expenses";
import { serveStatic } from "hono/bun";

export const app = new Hono();

app.use("*", logger());

app.route("/api/v1/expenses", expenses);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));
