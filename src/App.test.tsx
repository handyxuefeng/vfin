import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("测试项目入口App", () => {
  render(<App />);
  const linkElement = screen.getByText("点击");
  expect(linkElement).toBeInTheDocument();
});
