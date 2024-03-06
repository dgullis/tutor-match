import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import LandingPage from '../../../src/pages/LandingPage';

describe("Landing Page", () => {
  test("renders LandingPage component", async () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Online tutoring that releases potential/i)).toBeTruthy();
  });
});
  