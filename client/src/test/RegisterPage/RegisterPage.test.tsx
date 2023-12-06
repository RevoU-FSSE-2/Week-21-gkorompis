// RegistrationForm.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RegistrationForm from './RegisterForm';

describe('RegistrationForm', () => {
  test('renders form inputs and register button', () => {
    render(<RegistrationForm onSubmit={() => {}} />);

    const nameInput = screen.getByLabelText('Name:') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email:') as HTMLInputElement;
    const usernameInput = screen.getByLabelText('Username:') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password:') as HTMLInputElement;

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const registerButton = screen.getByRole('button', { name: 'Register' });
    expect(registerButton).toBeInTheDocument();
  });

  test('form submission', () => {
    const handleSubmit = jest.fn();
    render(<RegistrationForm onSubmit={handleSubmit} />);

    const nameInput = screen.getByLabelText('Name:') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email:') as HTMLInputElement;
    const usernameInput = screen.getByLabelText('Username:') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password:') as HTMLInputElement;
    const registerButton = screen.getByRole('button', { name: 'Register' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe123' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });


    fireEvent.click(registerButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      username: 'johndoe123',
      password: 'password123',
    });
  });
});
