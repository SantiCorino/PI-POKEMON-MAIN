import { Link } from "react-router-dom";

export default function Nav(){
    return <div>
        <Link to="/home">
            Home
        </Link>
        <Link to="/add">
            Create Pokémon
        </Link>
    </div>
  
}