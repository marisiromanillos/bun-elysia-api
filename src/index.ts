import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";

class User {
  constructor(public data: string[] = ["Marisi", "Gonzalez"]) {}
}

const app = new Elysia()
  .use(swagger())
  .decorate("user", new User())
  .get("/users", ({ user }) => user.data)
  .get(
    "/users/:id",
    ({ user, params: { id } }) => {
      return user.data[id];
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  )
  .post("/users", () => "create user")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
