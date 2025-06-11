import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";

// Mock CSS and image imports
jest.mock("./LoginPage.module.css", () => new Proxy({}, { get: (t, p) => p }));
jest.mock("../images/house_1.png", () => "logo.png");

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("LoginPage", () => {
  it("renders login form", () => {
    render(<LoginPage />);
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/register here/i)).toBeInTheDocument();
  });

  it("shows validation errors if fields are empty", async () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("submits form and navigates on successful login", async () => {
    // Mock fetch response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        user: { id: 1, username: "test", role: "builder" }
      }),
    });

    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "test" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "pass1234" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/builderDashboard");
    });
  });

  it("shows alert on invalid login", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Invalid username or password" }),
    });
    window.alert = jest.fn();

    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "baduser" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "badpass" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Invalid username or password");
    });
  });
});