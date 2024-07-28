import { useState } from 'react';
import './App.css';
import Detail from './components/Detail/Detail';
import List from './components/List/List';

function App() {
  const [pokemonName, setPokemonName] = useState<string>();

  const handleShowDetail = (pokemonName: string) => {
    setPokemonName(pokemonName);
  };

  return (
    <>
      <List onShowDetail={handleShowDetail} />
      {!pokemonName && <p>Select any Pokemon to show its details</p>}
      {pokemonName && <Detail pokemonName={pokemonName} />}
    </>
  );
}

export default App;
