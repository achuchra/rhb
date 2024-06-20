import { Hono } from "hono";

export const expenses = new Hono()
  .get("/", (c) => {
    return c.json({ exprenses: [{ value: 4.8 }] });
  })
  .post("/", (c) => {
    return c.json({});
  })
  .delete("/", (c) => {
    return c.json({});
  });
