import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CategoryPage from './CategoryPage';

describe('CategoryPage component', () => {
  test('renders form, table, and input button', () => {
    render(<CategoryPage />);
    
    // Form elements
    expect(screen.getByLabelText('Job Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Created By:')).toBeInTheDocument();
    expect(screen.getByLabelText('Status:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Job' })).toBeInTheDocument();
    
    // Table
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    // Input button
    expect(screen.getByRole('button', { name: 'Add Job' })).toBeInTheDocument();
  });

  test('allows adding a job and displaying it in the table', () => {
    render(<CategoryPage />);
    
    // Input values
    const jobNameInput = screen.getByLabelText('Job Name:') as HTMLInputElement;
    const createdByInput = screen.getByLabelText('Created By:') as HTMLInputElement;
    const statusInput = screen.getByLabelText('Status:') as HTMLInputElement;
    
    // Add job
    fireEvent.change(jobNameInput, { target: { value: 'Engineer' } });
    fireEvent.change(createdByInput, { target: { value: 'John Doe' } });
    fireEvent.change(statusInput, { target: { value: 'In Progress' } });
    
    const addButton = screen.getByRole('button', { name: 'Add Job' });
    fireEvent.click(addButton);

    // Check if job is added to the table
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });
});
