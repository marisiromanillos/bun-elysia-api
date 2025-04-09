import { Elysia, t } from "elysia";

class User {
  constructor(public data: string[] = ["Marisi"]) {}
}

export const user = new Elysia()
  .decorate("user", new User())
  .get("/users", ({ user }) => user.data)
  .get(
    "/users/:id",
    ({ user, params: { id }, error }) => {
      return user.data[id] ?? error(404, "User nout found");
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  );
