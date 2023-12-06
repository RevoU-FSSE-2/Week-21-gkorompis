import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage'; // Make sure to import the correct path

test('renders Profile Page component', () => {
  render(<ProfilePage />);

  const titleElement = screen.getByText(/Profile Page/i);
  expect(titleElement).toBeInTheDocument();

  const tableElement = screen.getByRole('table');
  expect(tableElement).toBeInTheDocument();
});
