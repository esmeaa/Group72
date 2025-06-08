import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomeMarket from "./HomeMarket";

// Mock CSS module
jest.mock("./HomeMarket.module.css", () => ({}));

describe("HomeMarket", () => {
  it("renders the housing listings header", () => {
    render(<HomeMarket />);
    expect(screen.getByText(/Housing Listings/i)).toBeInTheDocument();
    expect(screen.getByText(/Find quality, affordable housing/i)).toBeInTheDocument();
  });

  it("shows the default property listing", () => {
    render(<HomeMarket />);
    expect(screen.getByText(/Modern Apartment/i)).toBeInTheDocument();
    expect(screen.getByText(/R: 18700\/ Month/i)).toBeInTheDocument();
    expect(screen.getByText(/Downtown/i)).toBeInTheDocument();
    expect(screen.getByText(/Newly renovated/i)).toBeInTheDocument();
    expect(screen.getByText(/2 bed/i)).toBeInTheDocument();
    expect(screen.getByText(/Air Conditioning/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Contact/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Apply/i })).toBeInTheDocument();
  });

  it("filters listings by search", () => {
    render(<HomeMarket />);
    const searchInput = screen.getByRole("textbox", { name: "" });
    fireEvent.change(searchInput, { target: { value: "notfound" } });
    expect(screen.getByText(/No listings/i)).toBeInTheDocument();
  });

  it("filters listings by location", () => {
    render(<HomeMarket />);
    const locationInput = screen.getByRole("textbox", { name: /Location/i });
    fireEvent.change(locationInput, { target: { value: "nowhere" } });
    expect(screen.getByText(/No listings/i)).toBeInTheDocument();
  });

  it("filters listings by max price", () => {
    render(<HomeMarket />);
    const priceInput = screen.getByRole("textbox", { name: /Max Price/i });
    fireEvent.change(priceInput, { target: { value: "100" } });
    expect(screen.getByText(/No listings/i)).toBeInTheDocument();
  });

  it("filters listings by bedrooms", () => {
    render(<HomeMarket />);
    const bedsInput = screen.getByRole("textbox", { name: /Bedrooms/i });
    fireEvent.change(bedsInput, { target: { value: "3" } });
    expect(screen.getByText(/No listings/i)).toBeInTheDocument();
  });
});