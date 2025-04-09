import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";
import { user } from "./routes/user";
class User {
  constructor(public data: string[] = ["Marisi", "Gonzalez"]) {}
}

const app = new Elysia().use(swagger()).use(user).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
