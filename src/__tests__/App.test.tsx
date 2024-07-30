import { render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

describe('App', async () => {
  it('should render the App component', () => {
    render(<App />);
    const h1 = screen.queryByText('pokedex react');
    expect(h1).not.toBeNull();
  });
});
