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
      <header>
        <h1>pokedex react</h1>
      </header>
      <main>
        <List onShowDetail={handleShowDetail} />
        <Detail pokemonName={pokemonName} />
      </main>
    </>
  );
}

export default App;
