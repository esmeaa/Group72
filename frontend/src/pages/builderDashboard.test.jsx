import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BuilderDashboard from "./builderDashboard";

import { Link, useNavigate } from 'react-router-dom';
// src/pages/builderDashboard.test.jsx

// Mock CSS and icon imports
jest.mock("./builderDashboard.module.css", () => {
  const proxy = new Proxy({}, { get: (target, prop) => prop });
  return proxy;
});
jest.mock("lucide-react", () => {
  const icons = [
    "Hammer", "Check", "Wallet", "Home", "Bookmark", "User", "Settings", "Edit"
  ];
  const mocks = {};
  icons.forEach(name => {
    mocks[name] = (props) => <span data-testid={name} {...props} />;
  });
  return mocks;
});
/*
jest.mock("react-router-dom", () => ({
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  useNavigate: () => jest.fn(),
}));*/

describe("BuilderDashboard", () => {
  beforeEach(() => {
    render(<BuilderDashboard />);
  });

  test("renders profile section with user info", () => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Builder")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit details/i })).toBeInTheDocument();
  });

  test("renders stats section with correct values", () => {
    expect(screen.getByText("Active Projects")).toBeInTheDocument();
    expect(screen.getByText("Jobs Completed")).toBeInTheDocument();
    expect(screen.getByText("Total Earnings")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // active
    expect(screen.getByText("1")).toBeInTheDocument(); // completed
    expect(screen.getByText("R42000")).toBeInTheDocument(); // earnings
  });

  test("shows applications tab by default", () => {
    expect(screen.getByText("Applications")).toBeInTheDocument();
    expect(screen.getByText("Kitchen Remodel")).toBeInTheDocument();
    expect(screen.getByText("Roof Fix")).toBeInTheDocument();
    expect(screen.getByText("Wall Paint")).toBeInTheDocument();
  });

  test("switches to payslips tab and shows payments", () => {
    fireEvent.click(screen.getByRole("button", { name: /payslips/i }));
    expect(screen.getByText("Payslips")).toBeInTheDocument();
    expect(screen.getByText("Kitchen Remodel")).toBeInTheDocument();
    expect(screen.getByText("Roof Fix")).toBeInTheDocument();
    expect(screen.getAllByText(/cash out/i).length).toBeGreaterThan(0);
  });

  test("cash out button removes payment and updates earnings", () => {
    fireEvent.click(screen.getByRole("button", { name: /payslips/i }));
    const cashOutButtons = screen.getAllByRole("button", { name: /cash out/i });
    expect(screen.getByText("R42000")).toBeInTheDocument();
    fireEvent.click(cashOutButtons[0]);
    // After cash out, earnings should decrease
    expect(screen.getByText("R18000")).toBeInTheDocument();
  });

  test("bottom navigation buttons are present", () => {
    expect(screen.getAllByTestId("Home")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("Bookmark")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("User")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("Settings")[0]).toBeInTheDocument();
  });
});