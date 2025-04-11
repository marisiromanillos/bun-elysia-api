import { Elysia, t } from "elysia";

export class Note {
  constructor(public data: string[] = ["This is my note"]) {}

  /**
   * Adds a new note string to the end of the data array.
   * @param note The string note to add.
   * @returns The entire updated data array.
   */
  add(note: string): string[] {
    this.data.push(note);
    return this.data;
  }

  /**
   * Removes one note at the specified index.
   * @param index The index of the note to remove.
   * @returns An array containing the removed note string (or empty if index is invalid).
   */
  remove(index: number): string[] {
    return this.data.splice(index, 1);
  }

  /**
   * Updates the note string at the specified index.
   * @param index The index of the note to update.
   * @param note The new string note.
   * @returns The new note string that was assigned.
   */
  update(index: number, note: string): string {
    return (this.data[index] = note);
  }
}

export const note = new Elysia({ prefix: "/note" })
  .decorate("note", new Note())
  .onTransform(function log({ body, params, path, request: { method } }) {
    console.log(`${method} ${path}`, {
      body,
      params,
    });
  })
  .get("/", ({ note }) => note.data)
  .put("/", ({ note, body: { data } }) => note.add(data), {
    body: t.Object({
      data: t.String(),
    }),
  })
  .guard({
    params: t.Object({
      index: t.Number(),
    }),
  })
  .get("/:index", ({ note, params: { index }, error }) => {
    return note.data[index] ?? error(404, "Not Found :(");
  })
  .delete("/:index", ({ note, params: { index }, error }) => {
    if (index in note.data) return note.remove(index);

    return error(422);
  })
  .patch(
    "/:index",
    ({ note, params: { index }, body: { data }, error }) => {
      if (index in note.data) return note.update(index, data);

      return error(422);
    },
    {
      body: t.Object({
        data: t.String(),
      }),
    }
  );
