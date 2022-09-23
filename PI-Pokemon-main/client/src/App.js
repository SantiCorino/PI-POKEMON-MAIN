import { Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/Landing';
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
        <Route exact path="/">
          <LandingPage/>
        </Route>
        <Route path="/home">
          <SearchBar />
          <Order />
          <Pokemons />
        </Route>
        <Route path="/add">
          <AddPokemon />
        </Route>
        <Route path="/pokemons/:id">
          <PokemonDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
