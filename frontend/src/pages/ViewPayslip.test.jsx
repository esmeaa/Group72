import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ViewPayslip from "./ViewPayslip";

// Mock CSS and icons
jest.mock("./viewPayslip.module.css", () => new Proxy({}, { get: (t, p) => p }));
jest.mock("lucide-react", () => ({
  User: (props) => <span data-testid="User" {...props} />,
  X: (props) => <span data-testid="X" {...props} />,
}));

describe("ViewPayslip", () => {
  it("renders user info and total payout", () => {
    render(<ViewPayslip onClose={() => {}} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/Total Payout:/)).toBeInTheDocument();
    expect(screen.getByText(/Rent Credit:/)).toBeInTheDocument();
    expect(screen.getByText("74500")).toBeInTheDocument(); // 24500+18000+32000
  });

  it("renders all payments", () => {
    render(<ViewPayslip onClose={() => {}} />);
    expect(screen.getByText("My Due Payments (3)")).toBeInTheDocument();
    expect(screen.getByText("Kitchen Remodel")).toBeInTheDocument();
    expect(screen.getByText("Bathroom Reno")).toBeInTheDocument();
    expect(screen.getByText("Garden Patio")).toBeInTheDocument();
    expect(screen.getAllByText("Cash Out").length).toBe(3);
    expect(screen.getAllByText("Add to Rent Credit").length).toBe(3);
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<ViewPayslip onClose={onClose} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalled();
  });
});