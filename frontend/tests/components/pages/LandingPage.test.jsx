import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

test('renders LandingPage component', () => {
  render(<LandingPage />);
  // Check that the component renders without crashing
  expect(screen.getByText(/Online tutoring that releases potential/i)).toBeInTheDocument();
});

test('opens About Us modal on button click', () => {
  render(<LandingPage />);
  // Find the "About Us" button and click it
  fireEvent.click(screen.getByText(/About Us/i));
  // Check that the modal opens
  expect(screen.getByText(/About s/)).toBeInTheDocument();
});

test('navigates to signup page on button click', () => {
  render(<LandingPage />);
  // Find the "Create a free account" button and click it
  fireEvent.click(screen.getByText(/Create a free account/i));
  // Check that the navigation occurs
  expect(screen.getByText(/Sign up/i)).toBeInTheDocument(); // Adjust this to match your signup page content
});