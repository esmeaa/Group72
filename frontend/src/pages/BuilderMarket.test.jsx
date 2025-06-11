import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JobListing from "./BuilderMarket";

// Mock CSS and icon imports
jest.mock("./BuilderMarket.module.css", () => new Proxy({}, { get: (t, p) => p }));
jest.mock("lucide-react", () => {
  const icons = ["MapPin", "Home", "User", "MessageCircle", "Settings"];
  const mocks = {};
  icons.forEach(name => {
    mocks[name] = (props) => <span data-testid={name} {...props} />;
  });
  return mocks;
});
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("BuilderMarket (JobListing)", () => {
  beforeEach(() => {
    render(<JobListing />);
  });

  it("renders job listings and filter controls", () => {
    expect(screen.getByText("Job Listings")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search by title or company...")).toBeInTheDocument();
    expect(screen.getByText("Find construction and community development jobs in Makers Valley")).toBeInTheDocument();
    // At least one job title
    expect(screen.getByText(/Residential Renovation - Kitchen Remodel/i)).toBeInTheDocument();
  });

  it("filters jobs by search", () => {
    const searchInput = screen.getByPlaceholderText("Search by title or company...");
    fireEvent.change(searchInput, { target: { value: "Painting" } });
    expect(screen.getByText("House Painting")).toBeInTheDocument();
    // Should not find a job that doesn't match
    expect(screen.queryByText("Residential Renovation - Kitchen Remodel")).not.toBeInTheDocument();
  });

  it("filters jobs by location", () => {
    const select = screen.getAllByRole("combobox")[0];
    fireEvent.change(select, { target: { value: "East Valley" } });
    expect(screen.getByText("Bathroom Refit")).toBeInTheDocument();
    expect(screen.queryByText("Deck Installation")).not.toBeInTheDocument();
  });

  it("filters jobs by pay", () => {
    const select = screen.getAllByRole("combobox")[1];
    fireEvent.change(select, { target: { value: "7000" } });
    expect(screen.getByText("Garden Landscaping")).toBeInTheDocument();
    // Should not find jobs with pay > 7000
    expect(screen.queryByText("Bathroom Refit")).not.toBeInTheDocument();
  });

  it("clears filters", () => {
    const searchInput = screen.getByPlaceholderText("Search by title or company...");
    fireEvent.change(searchInput, { target: { value: "Painting" } });
    expect(screen.getByText("House Painting")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Clear Filters"));
    // All jobs should be visible again
    expect(screen.getByText("Residential Renovation - Kitchen Remodel")).toBeInTheDocument();
    expect(screen.getByText("House Painting")).toBeInTheDocument();
  });

  it("renders bottom navigation icons", () => {
    expect(screen.getAllByTestId("Home")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("User")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("MessageCircle")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("Settings")[0]).toBeInTheDocument();
  });
});