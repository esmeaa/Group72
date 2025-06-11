import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeSeekerRegister from "./HomeSeekerRegister";

// Mock logo and lucide-react icons to avoid import errors
jest.mock("../images/logo_1.png", () => "");
jest.mock("lucide-react", () => ({
  Hammer: () => <span data-testid="icon-hammer" />,
  Home: () => <span data-testid="icon-home" />,
  Eye: () => <span data-testid="icon-eye" />,
  EyeOff: () => <span data-testid="icon-eyeoff" />,
}));

describe("HomeSeekerRegister", () => {
  it("renders form fields", () => {
    render(
      <MemoryRouter>
        <HomeSeekerRegister />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Account/i })).toBeInTheDocument();
  });

  it("shows error for invalid first name", () => {
    render(
      <MemoryRouter>
        <HomeSeekerRegister />
      </MemoryRouter>
    );
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: "123" } });
    expect(screen.getByText(/Only letters and spaces are allowed/i)).toBeInTheDocument();
  });

  it("shows error for invalid username", () => {
    render(
      <MemoryRouter>
        <HomeSeekerRegister />
      </MemoryRouter>
    );
    const usernameInput = screen.getByLabelText(/Username/i);
    fireEvent.change(usernameInput, { target: { value: "ab" } });
    expect(screen.getByText(/Username must be 3-16 characters/i)).toBeInTheDocument();
  });

  it("shows password strength", () => {
    render(
      <MemoryRouter>
        <HomeSeekerRegister />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    expect(screen.getByText(/Strength: Strong/i)).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(
      <MemoryRouter>
        <HomeSeekerRegister />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText(/Password/i);
    const toggleBtn = screen.getByRole("button", { name: "" }); // Icon button has no text
    expect(passwordInput.type).toBe("password");
    fireEvent.click(toggleBtn);
    // After click, input type should be "text"
    expect(passwordInput.type).toBe("text");
  });
});