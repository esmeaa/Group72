import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminDashboard from "./adminDashboard";

// src/pages/adminDashboard.test.jsx

// Mock CSS and icon imports
jest.mock("./adminDashboard.module.css", () => {
  const proxy = new Proxy({}, { get: (target, prop) => prop });
  return proxy;
});
jest.mock("lucide-react", () => {
  // Return simple span for each icon
  const icons = [
    "Hammer", "Home", "Check", "User", "Settings", "Edit", "MapPin"
  ];
  const mocks = {};
  icons.forEach(name => {
    mocks[name] = (props) => <span data-testid={name} {...props} />;
  });
  return mocks;
});

describe("AdminDashboard", () => {
  beforeEach(() => {
    render(<AdminDashboard />);
  });

  test("renders profile section with user info", () => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("johndoe@doe.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit details/i })).toBeInTheDocument();
  });

  test("renders stats section with initial counts", () => {
    expect(screen.getByText("Jobs Posted")).toBeInTheDocument();
    expect(screen.getByText("Housing Posted")).toBeInTheDocument();
    expect(screen.getByText("Total Listings")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 }).map(h => h.textContent)).toEqual(["0", "0", "0"]);
  });

  test("shows Post Project tab and job form by default", () => {
    expect(screen.getByText(/post job/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/job title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/company/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/pay/i)).toBeInTheDocument();
  });

  test("switches to List Housing form when tab is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /list housing/i }));
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/beds/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/baths/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/size/i)).toBeInTheDocument();
  });

  test("switches to Manage Apps view and shows placeholder", () => {
    fireEvent.click(screen.getByRole("button", { name: /manage apps/i }));
    expect(screen.getByText(/manage applications coming soon/i)).toBeInTheDocument();
  });

  test("submitting job form adds a job and updates stats", () => {
    // Fill job form
    fireEvent.change(screen.getByPlaceholderText(/job title/i), { target: { value: "Test Job" } });
    fireEvent.change(screen.getByPlaceholderText(/company/i), { target: { value: "TestCo" } });
    fireEvent.change(screen.getByPlaceholderText(/location/i), { target: { value: "Testville" } });
    fireEvent.change(screen.getByPlaceholderText(/pay/i), { target: { value: "12345" } });
    fireEvent.click(screen.getByRole("button", { name: /post job/i }));

    // Stats should update
    expect(screen.getAllByRole("heading", { level: 3 }).map(h => h.textContent)).toEqual(["1", "0", "1"]);
  });

  test("submitting housing form adds a house and updates stats", () => {
    fireEvent.click(screen.getByRole("button", { name: /list housing/i }));
    fireEvent.change(screen.getByPlaceholderText(/^title$/i), { target: { value: "Test House" } });
    fireEvent.change(screen.getByPlaceholderText(/^location$/i), { target: { value: "Test City" } });
    fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: "5000" } });
    fireEvent.change(screen.getByPlaceholderText(/beds/i), { target: { value: "2" } });
    fireEvent.change(screen.getByPlaceholderText(/baths/i), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText(/size/i), { target: { value: "900" } });
    fireEvent.click(screen.getByRole("button", { name: /list housing/i }));

    // Stats should update
    expect(screen.getAllByRole("heading", { level: 3 }).map(h => h.textContent)).toEqual(["0", "1", "1"]);
  });
});