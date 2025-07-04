import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Chinese Chess title', () => {
  render(<App />);
  const titleElement = screen.getByText(/中国象棋/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders chess board', () => {
  render(<App />);
  const boardElement = screen.getByText(/楚河/i);
  expect(boardElement).toBeInTheDocument();
});