import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders login form and button', () => {
  render(<LoginPage />);

  const usernameInput = screen.getByLabelText('Username:') as HTMLInputElement;
  const passwordInput = screen.getByLabelText('Password:') as HTMLInputElement;

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeInTheDocument();
});

test('submits form with entered values', () => {
  render(<LoginPage />);

  const usernameInput = screen.getByLabelText('Username:') as HTMLInputElement;
  const passwordInput = screen.getByLabelText('Password:') as HTMLInputElement;
  const loginButton = screen.getByRole('button', { name: 'Login' });


  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('testpassword');

  fireEvent.click(loginButton);

});
