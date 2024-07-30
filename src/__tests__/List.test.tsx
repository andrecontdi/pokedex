import { QueryClient } from '@tanstack/react-query';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import List from '../components/List/List';
import { pokemonListResponse } from '../__mocks__/pokemonListResponse';
import { renderWithClient } from './utils';

describe('List', () => {
  const queryClient = new QueryClient();

  afterEach(() => {
    vi.restoreAllMocks();

    cleanup();
  });

  it('should render the List component', () => {
    renderWithClient(queryClient, <List onShowDetail={() => {}} />);
    const h2 = screen.queryByText('Pokemons');
    expect(h2).not.toBeNull();
  });

  it('should render not found message', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.reject('Something went wrong');
    });

    // vi.mock('react-query', () => ({
    //   useQuery: vi.fn().mockReturnValue(() => ({
    //     isFetching: null,
    //     error: () => {},
    //     data: null
    //   }))
    // }));

    renderWithClient(queryClient, <List onShowDetail={() => {}} />);
    await waitFor(() => {
      const p = screen.getByText('Pokemons not found');
      expect(p).not.toBeNull();
      expect(p?.textContent).toBe('Pokemons not found');
    });
  });

  it('should render the pokemon list', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonListResponse)
      } as Response);
    });

    renderWithClient(queryClient, <List onShowDetail={() => {}} />);
    await waitFor(() => {
      const li = screen.getByText('bulbasaur');
      expect(li).not.toBeNull();
      expect(li?.textContent).toBe('bulbasaur');
    });
  });

  it('should set the pokemon to show detail', async () => {
    const onShowDetail = vi.fn();
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(pokemonListResponse)
      } as Response);
    });

    renderWithClient(queryClient, <List onShowDetail={onShowDetail} />);
    await waitFor(() => {
      const li = screen.getByRole('listitem', { name: 'bulbasaur' });
      fireEvent.click(li);
      expect(onShowDetail).toBeCalled();
      expect(onShowDetail).toBeCalledWith('bulbasaur');
    });
  });
});
