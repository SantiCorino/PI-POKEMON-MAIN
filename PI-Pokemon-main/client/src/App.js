import { Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/Landing/landing';
import Nav from './components/NavBar/navBar';
import Order from './components/Order/order';
import AddPokemon from './components/AddPokemon/addPokemon';
import PokemonDetail from './components/PokemonDetail/pokemonDetail';
import Pokemons from './components/Pokemons/pokemons';
import SearchBar from './components/SearchBar/searchBar';

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
