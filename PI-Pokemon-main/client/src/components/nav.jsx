import { Link } from "react-router-dom";
import AddPokemon from "./PokemonCard/addPokemon";
import SearchBar from "./searchBar";

export default function Nav(){
    return <div>
        <Link to="/">
            Home
        </Link>
        <Link to="/add">
            Create Pokémon
        </Link>
    </div>
  
}