import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DetailItem from '../components/Detail/DetailItem/DetailItem';
import { pokemonResponse } from './mocks/pokemonResponse';

describe('List', () => {
  afterEach(() => {
    vi.resetAllMocks();

    cleanup();
  });

  it('should render the DetailItem component with pokemon´s name', async () => {
    render(<DetailItem item="Name" value="bulbasaur" />);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonResponse)
      } as Response);
    });

    await waitFor(() => {
      const item = screen.queryByText('Name:');
      expect(item).not.toBeNull();
      expect(item?.textContent).toBe('Name: ');
    });
  });

  it('should render the DetailItem component with pokemon´s height', async () => {
    render(<DetailItem item="Height" value="0.7 mts" />);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonResponse)
      } as Response);
    });

    await waitFor(() => {
      const item = screen.queryByText('Height:');
      expect(item).not.toBeNull();
      expect(item?.textContent).toBe('Height: ');
      const value = screen.queryByText('0.7 mts');
      expect(value).not.toBeNull();
      expect(value?.textContent).toBe('0.7 mts');
    });
  });

  it('should render the DetailItem component with pokemon´s weight', async () => {
    render(<DetailItem item="Weight" value="6.9 kg" />);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonResponse)
      } as Response);
    });

    await waitFor(() => {
      const item = screen.queryByText('Weight:');
      expect(item).not.toBeNull();
      expect(item?.textContent).toBe('Weight: ');
      const value = screen.queryByText('6.9 kg');
      expect(value).not.toBeNull();
      expect(value?.textContent).toBe('6.9 kg');
    });
  });
});
