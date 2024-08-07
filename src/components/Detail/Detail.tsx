import { useEffect, useState } from 'react';
import { PokemonModel } from '../../models/pokemon.model';
import './Detail.css';
import DetailItem from './DetailItem/DetailItem';

interface DetailProps {
  pokemonName: string | undefined;
}

export default function Detail({ pokemonName }: DetailProps) {
  const [pokemon, setPokemon] = useState<PokemonModel>();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data: PokemonModel) => {
        setPokemon(data);
      });
  }, [pokemonName]);

  const getWeight = (): string => {
    if (!pokemon?.weight) return '';

    return `${+pokemon?.weight / 10} kg`;
  };

  const getHeight = (): string => {
    if (!pokemon?.height) return '';

    return `${+pokemon?.height / 10} mts`;
  };

  return (
    <section>
      <h2>Pokemon Details</h2>
      {!pokemonName && <p>Select any Pokemon to show its details</p>}
      {pokemonName && (
        <div className="detail">
          <img src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name} />
          <div className="detail__content">
            <DetailItem item="Name" value={pokemon?.name} />
            <DetailItem item="Weight" value={getWeight()} />
            <DetailItem item="Height" value={getHeight()} />
          </div>
        </div>
      )}
    </section>
  );
}
