import './App.css';
import Pokemons from './components/PokemonCard/pokemons';
import SearchBar from './components/SearchBar/searchBar';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Pokemons />
    </div>
  );
}

export default App;
