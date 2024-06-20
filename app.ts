import { Hono } from "hono";
import { logger } from "hono/logger";

export const app = new Hono();

app.use("*", logger());
app.get("/hello", (c) => {
  return c.json({ message: "Hello, World!" });
});
