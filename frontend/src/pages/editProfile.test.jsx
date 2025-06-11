import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditProfile from "./editProfile";

// Mock CSS
jest.mock("./editProfile.module.css", () => new Proxy({}, { get: (t, p) => p }));

// Mock fetch
global.fetch = jest.fn();

const mockProfile = {
  age: "30",
  sex: "Male",
  marital_status: "Single",
  kids: "1",
  pets: true,
  religion: "Christian",
  job_title: "Engineer",
  skills: ["Plumbing", "Carpentry"],
  disability: false,
  disability_details: ""
};

describe("EditProfile", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders loading and then profile form", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    render(<EditProfile userId="123" onProfileUpdate={jest.fn()} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for form to load
    expect(await screen.findByDisplayValue("30")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Engineer")).toBeInTheDocument();
    expect(screen.getByText("Plumbing ✕")).toBeInTheDocument();
    expect(screen.getByText("Carpentry ✕")).toBeInTheDocument();
  });

  it("can add and remove a skill", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    render(<EditProfile userId="123" onProfileUpdate={jest.fn()} />);
    await screen.findByDisplayValue("Engineer");

    const skillInput = screen.getByPlaceholderText("Add skill");
    fireEvent.change(skillInput, { target: { value: "Welding" } });
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Welding ✕")).toBeInTheDocument();

    // Remove skill
    fireEvent.click(screen.getByText("Welding ✕"));
    expect(screen.queryByText("Welding ✕")).not.toBeInTheDocument();
  });

  it("shows and hides disability textarea", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    render(<EditProfile userId="123" onProfileUpdate={jest.fn()} />);
    await screen.findByDisplayValue("Engineer");

    const disabilityCheckbox = screen.getByLabelText(/disability\?/i);
    fireEvent.click(disabilityCheckbox);
    expect(screen.getByPlaceholderText(/describe disability/i)).toBeInTheDocument();

    fireEvent.click(disabilityCheckbox);
    expect(screen.queryByPlaceholderText(/describe disability/i)).not.toBeInTheDocument();
  });

  it("submits the form and calls onProfileUpdate", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProfile,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ profile: mockProfile }),
      });

    const onProfileUpdate = jest.fn();
    render(<EditProfile userId="123" onProfileUpdate={onProfileUpdate} />);
    await screen.findByDisplayValue("Engineer");

    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: "31" } });
    fireEvent.click(screen.getByText(/save changes/i));

    await waitFor(() => {
      expect(onProfileUpdate).toHaveBeenCalledWith(mockProfile);
    });
  });
});