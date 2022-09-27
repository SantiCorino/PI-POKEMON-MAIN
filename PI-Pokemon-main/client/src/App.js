import { Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/Landing/landing';
import Nav from './components/NavBar/navBar';
import AddPokemon from './components/AddPokemon/addPokemon';
import PokemonDetail from './components/PokemonDetail/pokemonDetail';
import Home from './components/Home/home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage/>
        </Route>
        <Route path="/home">
          <Nav />
          <Home />
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
