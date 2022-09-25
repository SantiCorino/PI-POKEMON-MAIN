import "./nav.css";

import { Link } from "react-router-dom";

export default function Nav(){
    return <div className="nav">
        <Link to="/home">
            <h2>Home</h2>
        </Link>
        <Link to="/add">
            <h2>Create Pokémon</h2>
        </Link>
    </div>
  
}