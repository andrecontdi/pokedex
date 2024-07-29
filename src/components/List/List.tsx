import { useEffect, useState } from 'react';
import { PokemonListModel, PokemonModel } from '../../models/pokemon.model';
import './List.css';

interface ListProps {
  onShowDetail: CallableFunction;
}

export default function List({ onShowDetail }: ListProps) {
  const [pokemonList, setPokemonList] = useState<PokemonModel[]>([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((response) => response.json())
      .then((data: PokemonListModel) => {
        setPokemonList(data.results);
      });
  }, []);

  const pokemonItems =
    pokemonList && pokemonList.length > 0
      ? pokemonList.map((pokemon, index) => (
          <li aria-label={pokemon.name} className={'list__item'} key={index} onClick={() => onShowDetail(pokemon.name)}>
            {pokemon.name}
          </li>
        ))
      : [];

  return (
    <section>
      <h2>Pokemons</h2>
      {pokemonList && pokemonList.length === 0 && <p>Pokemons not found</p>}
      {pokemonList && pokemonList.length > 0 && <ul className="list">{pokemonItems}</ul>}
    </section>
  );
}
