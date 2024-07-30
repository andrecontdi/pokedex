import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import './App.css';
import Detail from './components/Detail/Detail';
import List from './components/List/List';

const queryClient = new QueryClient();

function App() {
  const [pokemonName, setPokemonName] = useState<string>();

  const handleShowDetail = (pokemonName: string) => {
    setPokemonName(pokemonName);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <h1>pokedex react</h1>
      </header>
      <main>
        <List onShowDetail={handleShowDetail} />
        <Detail pokemonName={pokemonName} />
      </main>
    </QueryClientProvider>
  );
}

export default App;
