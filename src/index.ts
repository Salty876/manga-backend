import { Hono } from "hono";
import home from "./routes/homePage";

const app = new Hono();

app.route("/homePage", home);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
