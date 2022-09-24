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
      <Switch>
        <Route exact path="/">
          <LandingPage/>
        </Route>
        <Route path="/home">
          <Nav />
          <SearchBar />
          <Order />
          <Pokemons />
        </Route>
        <Route path="/add">
          <Nav />
          <AddPokemon />
        </Route>
        <Route path="/pokemons/:id">
          <Nav />
          <PokemonDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
