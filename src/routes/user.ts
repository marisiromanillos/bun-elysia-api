import { Elysia, t } from "elysia";

class User {
  constructor(public data: string[] = ["Marisi"]) {}

  // PUT
  add(user: string) {
    this.data.push(user);
    return this.data;
  }

  // DELETE
  remove(id: number) {
    return this.data.splice(id, 1);
  }

  // PATCH
  update(id: number, user: string) {
    return (this.data[id] = user);
  }
}

export const user = new Elysia({ prefix: "users" })
  .decorate("user", new User())
  .get("/", ({ user }) => user.data)
  .put("/", ({ user, body: { data } }) => user.add(data), {
    body: t.Object({
      data: t.String(),
    }),
  })
  .get(
    "//:id",
    ({ user, params: { id }, error }) => {
      return user.data[id] ?? error(404, "User nout found");
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  )
  .delete(
    "/:id",
    ({ user, params: { id }, error }) => {
      if (id in user.data) return user.remove(id);
      return error(402);
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  )
  .patch(
    "/:id",
    ({ user, params: { id }, body: { data }, error }) => {
      if (id in user.data) return user.update(id, data);
      return error(402);
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      body: t.Object({
        data: t.String(),
      }),
    }
  );
