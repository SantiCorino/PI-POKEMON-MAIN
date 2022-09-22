import { Link } from "react-router-dom";
import AddPokemon from "./PokemonCard/addPokemon";
import SearchBar from "./searchBar";

export default function Nav(){
    return <nav class="menu">
    {/* <Home /> */}
    <SearchBar />
    <Link to={AddPokemon}>Crear Pokémon</Link>
  </nav>
  
}