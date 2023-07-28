import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders content", async () => {
  const blog = {
    author: "Kobe Bryant",
    title: "Mamba Mentality",
    url: "https://en.wikipedia.org/wiki/Kobe_Bryant",
    likes: 12,
  };

  render(<Blog blog={blog} />);
  const title = screen.getByText("Mamba Mentality", { exact: false });
  const author = screen.getByText("Kobe Bryant", {
    exact: false,
  });
  const url = screen.queryByText("https://en.wikipedia.org/wiki/Kobe_Bryant", {
    exact: false,
  });
  const likes = screen.queryByText(12, {
    exact: false,
  });

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test("renders all content after button is clicked", async () => {
  const user = userEvent.setup();
  const blog = {
    author: "Kobe Bryant",
    title: "Mamba Mentality",
    url: "https://en.wikipedia.org/wiki/Kobe_Bryant",
    likes: 12,
  };

  render(<Blog blog={blog} />);

  const openViewButton = screen.getByRole("button");
  console.log(openViewButton);
  await user.click(openViewButton);

  const title = screen.getByText("Mamba Mentality", { exact: false });
  const author = screen.getByText("Kobe Bryant", {
    exact: false,
  });
  const url = screen.queryByText("https://en.wikipedia.org/wiki/Kobe_Bryant", {
    exact: false,
  });
  const likes = screen.queryByText(12, {
    exact: false,
  });

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).not.toBeNull();
  expect(likes).not.toBeNull();
});

test("If the liked button is clicked twice the the handler should receive it as props twice", async () => {
  const user = userEvent.setup();
  const blog = {
    author: "Kobe Bryant",
    title: "Mamba Mentality",
    url: "https://en.wikipedia.org/wiki/Kobe_Bryant",
    likes: 12,
  };
  const mockHandler = jest.fn();
  render(<Blog blog={blog} handleLike={mockHandler}/>);

  const openViewButton = screen.getByText("View");
  await user.click(openViewButton);

  const likeButton = screen.getByText("Like");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
