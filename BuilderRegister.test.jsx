import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import BuilderRegister from "./BuilderRegister";

// javascript

// Mock react-router-dom useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock CSS and image imports
jest.mock("./BuilderRegister.module.css", () => ({}));
jest.mock("../images/logo_1.png", () => "logo.png");
jest.mock("lucide-react", () => ({
  Hammer: () => <span>HammerIcon</span>,
  Home: () => <span>HomeIcon</span>,
  Eye: () => <span>EyeIcon</span>,
  EyeOff: () => <span>EyeOffIcon</span>,
}));

describe("BuilderRegister", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form fields and buttons", () => {
    render(<BuilderRegister />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Account/i })).toBeInTheDocument();
  });

  test("shows validation errors for invalid input", () => {
    render(<BuilderRegister />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "123" } });
    expect(screen.getByText(/Only letters and spaces are allowed/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "ab" } });
    expect(screen.getByText(/Username must be 3-16 characters/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "abc" } });
    expect(screen.getByText(/Password must be 8-16 characters/i)).toBeInTheDocument();
  });

  test("removes validation errors for valid input", () => {
    render(<BuilderRegister />);
    const firstName = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstName, { target: { value: "123" } });
    expect(screen.getByText(/Only letters and spaces are allowed/i)).toBeInTheDocument();
    fireEvent.change(firstName, { target: { value: "Lucas" } });
    expect(screen.queryByText(/Only letters and spaces are allowed/i)).not.toBeInTheDocument();
  });

  test("shows password strength indicator", () => {
    render(<BuilderRegister />);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(passwordInput, { target: { value: "abc" } });
    expect(screen.getByText(/Strength: Weak/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: "Abcdef12" } });
    expect(screen.getByText(/Strength: Moderate/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: "Abcdef12!" } });
    expect(screen.getByText(/Strength: Strong/i)).toBeInTheDocument();
  });

  test("toggles password visibility", () => {
    render(<BuilderRegister />);
    const passwordInput = screen.getByLabelText(/Password/i);
    const toggleBtn = screen.getByRole("button", { name: "" }); // Icon button has no accessible name

    // Default type is password
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "text");
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});