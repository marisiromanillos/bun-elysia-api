import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .get("/users", () => "list users handler")
  .get("/users/:id", () => "single  user")
  .post("/users", () => "create user")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
