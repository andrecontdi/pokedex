import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { PokemonModel } from '../../models/pokemon.model';
import './List.css';

interface ListProps {
  onShowDetail: CallableFunction;
}

export default function List({ onShowDetail }: ListProps) {
  const { isFetching, error, data } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`).then((response) => response.json())
  });

  const pokemonItems =
    data && data.results.length > 0
      ? data.results.map((pokemon: PokemonModel, index: number) => (
          <li aria-label={pokemon.name} className={'list__item'} key={index} onClick={() => onShowDetail(pokemon.name)}>
            {pokemon.name}
          </li>
        ))
      : [];

  const setSatus = (): ReactNode => {
    if (isFetching) return <p>Loading...</p>;
    if (error) return <p>Pokemons not found</p>;

    return '';
  };

  return (
    <section>
      <h2>Pokemons</h2>
      {setSatus()}
      {!error && data && data.results.length > 0 && <ul className="list">{pokemonItems}</ul>}
    </section>
  );
}
