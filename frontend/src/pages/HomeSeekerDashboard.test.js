import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomeSeekerDashboard from "./HomeSeekerDashboard";

// Mock CSS and image imports
jest.mock('./HomeSeekerDashboard.module.css', () => ({}));
jest.mock('../images/makers_valley_house.jpg', () => 'mocked-house.jpg');

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Edit: () => <span data-testid="icon-edit" />,
  Home: () => <span data-testid="icon-home" />,
  Bookmark: () => <span data-testid="icon-bookmark" />,
  User: () => <span data-testid="icon-user" />,
  Settings: () => <span data-testid="icon-settings" />,
}));

describe("HomeSeekerDashboard", () => {
  it("renders user info and stats", () => {
    render(<HomeSeekerDashboard />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Home Seeker")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Applications")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Saved Listings")).toBeInTheDocument();
    expect(screen.getByText("R5,000")).toBeInTheDocument();
    expect(screen.getByText("Budget")).toBeInTheDocument();
  });

  it("renders listing card with correct info", () => {
    render(<HomeSeekerDashboard />);
    expect(screen.getByAltText("Makers Valley House")).toBeInTheDocument();
    expect(screen.getByText("1 Bedroom Unit")).toBeInTheDocument();
    expect(screen.getByText("R3,500/month")).toBeInTheDocument();
    expect(screen.getByText(/Located in the heart of Makers Valley/i)).toBeInTheDocument();
    expect(screen.getByText("Accepted")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pay" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contact Admin" })).toBeInTheDocument();
  });

  it("toggles between Applications and Saved Listings tabs", () => {
    render(<HomeSeekerDashboard />);
    const applicationsTab = screen.getByRole("button", { name: /My House Applications/i });
    const savedTab = screen.getByRole("button", { name: /Saved Listings/i });

    // Applications tab should be active by default
    expect(screen.getByText("Applications")).toBeInTheDocument();

    // Switch to Saved Listings
    fireEvent.click(savedTab);
    expect(screen.getByText("Saved Listings")).toBeInTheDocument();

    // Switch back to Applications
    fireEvent.click(applicationsTab);
    expect(screen.getByText("Applications")).toBeInTheDocument();
  });
});