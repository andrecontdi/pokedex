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

  const pokemonItems = pokemonList.map((pokemon, index) => (
    <li className={'list__item'} key={index} onClick={() => onShowDetail(pokemon.name)}>
      {pokemon.name}
    </li>
  ));

  return <ul className="list">{pokemonItems}</ul>;
}
