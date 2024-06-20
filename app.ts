import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenses } from "./routes/expenses";

export const app = new Hono();

app.use("*", logger());
app.get("/hello", (c) => {
  return c.json({ message: "Hello, World!" });
});
app.route("/api/v1/expenses", expenses);
