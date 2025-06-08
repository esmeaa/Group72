import { render, screen } from '@testing-library/react';
import App from './App';

import TempNav from './tempNav';
import LoginPage from './pages/LoginPage';
import Launch from './pages/launch';
import Admin from './pages/adminDashboard';
import BuilderDash from './pages/builderDashboard';
import HomeSeekerDashboard from './pages/HomeSeekerDashboard'
import BuilderMarket from './pages/BuilderMarket';
import HomeMarket from './pages/HomeMarket';
import HomeSeekerRegister from './pages/HomeSeekerRegister';
import BuilderRegister from './pages/BuilderRegister';
import AdminRegister from './pages/AdminRegister';

test('renders all images on the launch page', () => {
  render(<Launch />);
  expect(screen.getByAltText(/title/i)).toBeInTheDocument();
  expect(screen.getByAltText(/house/i)).toBeInTheDocument();
  expect(screen.getByAltText(/hands/i)).toBeInTheDocument();
});

test('renders LoginPage', () => {
  render(<LoginPage />);
  expect(screen.getByText(/sign in/i)).toBeInTheDocument();
});

test('renders Admin Dashboard', () => {
  render(<Admin />);
  expect(screen.getByText(/manage all applications/i)).toBeInTheDocument();
});

test('renders Builder Dashboard', () => {
  render(<BuilderDash />);
  expect(screen.getByText(/active projects/i)).toBeInTheDocument();
});

test('renders Home Seeker Dashboard', () => {
  render(<HomeSeekerDashboard />);
  expect(screen.getByText(/home seeker/i)).toBeInTheDocument();
});

test('renders Builder Market', () => {
  render(<BuilderMarket />);
  expect(screen.getByText(/job listings/i)).toBeInTheDocument();
});

test('renders Home Market', () => {
  render(<HomeMarket />);
  expect(screen.getByText(/housing listings/i)).toBeInTheDocument();
});

test('renders Home Seeker Register', () => {
  render(<HomeSeekerRegister />);
  expect(screen.getByText(/join/i)).toBeInTheDocument();
});

test('renders Builder Register', () => {
  render(<BuilderRegister />);
  expect(screen.getByText(/builder/i)).toBeInTheDocument();
});

test('renders Admin Register', () => {
  render(<AdminRegister />);
  expect(screen.getByText(/admin/i)).toBeInTheDocument();
});

