import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders login form', () => {
    render(<LoginPage />);
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
});

test('submits form', () => {
    render(<LoginPage />);
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
});