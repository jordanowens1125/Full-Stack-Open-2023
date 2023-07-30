import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewNoteForm from "./NewNoteForm";
import userEvent from "@testing-library/user-event";

test("<NewNoteForm /> updates parent state and calls onSubmit", async () => {
  const createNote = jest.fn();
  const user = userEvent.setup();

  render(<NewNoteForm createNote={createNote} />);
  //In order to access the input field we have to open the new note form due
  //toggleable component
  const openNewNoteButton = screen.getByRole("button");
  await user.click(openNewNoteButton);
  const input = screen.getByRole("textbox");
  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
