import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Detail from '../components/Detail/Detail';
import { pokemonResponse } from './mocks/pokemonResponse';

describe('List', () => {
  afterEach(() => {
    vi.resetAllMocks();

    cleanup();
  });

  it('should render the Detail component', () => {
    render(<Detail pokemonName="bulbasaur" />);
    const h2 = screen.queryByText('Pokemon Details');
    expect(h2).not.toBeNull();
  });

  it('should render message if no pokemon selected', async () => {
    render(<Detail pokemonName="" />);
    await waitFor(() => {
      const p = screen.queryByText('Select any Pokemon to show its details');
      expect(p).not.toBeNull();
    });
  });

  it('should render the name of the selected pokemon', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonResponse)
      } as Response);
    });

    render(<Detail pokemonName="bulbasaur" />);
    await waitFor(() => {
      const p = screen.queryByText('bulbasaur');
      expect(p).not.toBeNull();
      expect(p?.textContent).toBe('bulbasaur');
    });
  });

  it('should render the height of the selected pokemon', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonResponse)
      } as Response);
    });

    render(<Detail pokemonName="bulbasaur" />);
    await waitFor(() => {
      const p = screen.queryByText('0.7 mts');
      expect(p).not.toBeNull();
      expect(p?.textContent).toBe('0.7 mts');
    });
  });

  it('should render the weight of the selected pokemon', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonResponse)
      } as Response);
    });

    render(<Detail pokemonName="bulbasaur" />);
    await waitFor(() => {
      const p = screen.queryByText('6.9 kg');
      expect(p).not.toBeNull();
      expect(p?.textContent).toBe('6.9 kg');
    });
  });

  it('should render the image of the selected pokemon', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonResponse)
      } as Response);
    });

    render(<Detail pokemonName="bulbasaur" />);
    await waitFor(() => {
      const img = screen.queryByAltText('bulbasaur');
      expect(img).not.toBeNull();
    });
  });
});
