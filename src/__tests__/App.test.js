import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders form on ini page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("Search City Restaurants");
  expect(linkElement).toBeInTheDocument();
});
