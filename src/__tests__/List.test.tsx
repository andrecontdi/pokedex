import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import List from '../components/List/List';
import { pokemonListResponse } from './mocks/pokemonListResponse';

describe('List', () => {
  afterEach(() => {
    vi.resetAllMocks();

    cleanup();
  });

  it('should render the List component', () => {
    render(<List onShowDetail={() => {}} />);
    const h2 = screen.queryByText('Pokemons');
    expect(h2).not.toBeNull();
  });

  it('should render not found message', () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve({ results: [] })
      } as Response);
    });

    render(<List onShowDetail={() => {}} />);
    const p = screen.getByText('Pokemons not found');
    expect(p).not.toBeNull();
  });

  it('should render the pokemon list', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonListResponse)
      } as Response);
    });

    render(<List onShowDetail={() => {}} />);
    await waitFor(() => {
      const li = screen.getByText('bulbasaur');
      expect(li).not.toBeNull();
    });
  });

  it('should set the pokemon to show detail', async () => {
    const onShowDetail = vi.fn();
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonListResponse)
      } as Response);
    });

    render(<List onShowDetail={onShowDetail} />);
    await waitFor(() => {
      const li = screen.getByRole('listitem', { name: 'bulbasaur' });
      fireEvent.click(li);
      expect(onShowDetail).toBeCalled();
      expect(onShowDetail).toBeCalledWith('bulbasaur');
    });
  });
});
