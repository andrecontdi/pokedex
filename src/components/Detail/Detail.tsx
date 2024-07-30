import { useQuery } from '@tanstack/react-query';
import './Detail.css';
import DetailItem from './DetailItem/DetailItem';
import { ReactNode } from 'react';

interface DetailProps {
  pokemonName: string | undefined;
}

export default function Detail({ pokemonName }: DetailProps) {
  const { isFetching, error, data } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => response.json()),
    enabled: !!pokemonName
  });

  const getWeight = (): string => {
    if (!data?.weight) return '';

    return `${+data?.weight / 10} kg`;
  };

  const getHeight = (): string => {
    if (!data?.height) return '';

    return `${+data?.height / 10} mts`;
  };

  const setSatus = (): ReactNode => {
    if (!data && !error && !isFetching) return <p>Select any Pokemon to show its details</p>;
    if (isFetching) return <p>Loading...</p>;
    if (error) return <p>Pokemon not found</p>;

    return '';
  };

  return (
    <section>
      <h2>Pokemon Details</h2>
      {setSatus()}
      {data && (
        <div className="detail">
          <img src={data?.sprites.other['official-artwork'].front_default} alt={data?.name} />
          <div className="detail__content">
            <DetailItem item="Name" value={data?.name} />
            <DetailItem item="Weight" value={getWeight()} />
            <DetailItem item="Height" value={getHeight()} />
          </div>
        </div>
      )}
    </section>
  );
}
