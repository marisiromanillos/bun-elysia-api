import { describe, it, expect, beforeEach } from "bun:test";
import { note, Note } from "../routes/note";

describe("Note class", () => {
  let note: Note;

  beforeEach(() => {
    note = new Note();
  });

  it("should add a note the data", () => {
    expect(note);
  });
});

// add(note: string) {
//     this.data.push(note);
//     return this.data;
//   }
