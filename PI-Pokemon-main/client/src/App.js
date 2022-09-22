import { Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import Order from './components/order';
import AddPokemon from './components/PokemonCard/addPokemon';
import PokemonDetail from './components/PokemonCard/pokemonDetail';
import Pokemons from './components/PokemonCard/pokemons';
import SearchBar from './components/searchBar';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/add">
          <AddPokemon />
        </Route>
        <Route path="/:id">
          <PokemonDetail />
        </Route>
        <Route path="/">
          <SearchBar />
          <Order />
          <Pokemons />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
