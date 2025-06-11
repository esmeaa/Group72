import React from "react";
import { render, screen } from "@testing-library/react";
import Launch from "./launch";

// src/pages/launch.test.jsx

// Mock image and CSS imports
jest.mock("../images/logo/hands.png", () => "hands.png");
jest.mock("../images/logo/house.png", () => "house.png");
jest.mock("../images/logo/ubuntuTitle.png", () => "ubuntuTitle.png");
jest.mock("./launch.module.css", () => ({
  title: "title",
  house: "house",
  hands: "hands",
}));

describe("Launch", () => {
  test("renders all three images with correct alt text", () => {
    render(<Launch />);
    expect(screen.getByAltText("title")).toBeInTheDocument();
    expect(screen.getByAltText("house")).toBeInTheDocument();
    expect(screen.getByAltText("hands")).toBeInTheDocument();
  });

  test("images have correct id attributes", () => {
    render(<Launch />);
    expect(screen.getByAltText("title").id).toBe("title");
    expect(screen.getByAltText("house").id).toBe("house");
    expect(screen.getByAltText("hands").id).toBe("hands");
  });

  test("images have correct src attributes", () => {
    render(<Launch />);
    expect(screen.getByAltText("title").src).toContain("ubuntuTitle.png");
    expect(screen.getByAltText("house").src).toContain("house.png");
    expect(screen.getByAltText("hands").src).toContain("hands.png");
  });
});