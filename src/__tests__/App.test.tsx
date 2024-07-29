import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App', async () => {
  it('should render the App component', () => {
    render(<App />);
    const h1 = screen.queryByText('pokedex react');
    expect(h1).not.toBeNull();
  });
});
